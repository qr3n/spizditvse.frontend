'use client';

import { TextInput, Button, Group, Box, Checkbox, Stack, Select, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUpdateProvider } from '../api';
import { Provider } from '@/src/entities/provider';
import { useGroups } from '@/src/entities/group';

export function EditProviderModal({ provider, opened, onClose }: { provider: Provider, opened: boolean, onClose: () => void }) {
    const { mutate, isPending } = useUpdateProvider();
    const { data: groups } = useGroups();

    const form = useForm({
        initialValues: {
            alias: provider.alias,
            url: provider.url,
            group_id: provider.group_id,
            is_active: provider.is_active,
        },
        validate: {
            alias: (value) => (value.trim().length > 0 ? null : 'Alias is required'),
            url: (value) => (/^(http|https):\/\/[^ "]+$/.test(value) ? null : 'Invalid URL format'),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        mutate({ id: provider.id, data: values }, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const groupOptions = groups?.map((g) => ({ value: g.id, label: g.name })) || [];

    return (
        <Modal opened={opened} onClose={onClose} title="Edit Provider">
            <Box mx="auto">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput
                            withAsterisk
                            label="Provider Alias"
                            {...form.getInputProps('alias')}
                        />
                        <TextInput
                            withAsterisk
                            label="Subscription URL"
                            {...form.getInputProps('url')}
                        />
                        <Select
                            label="Subscription Group"
                            placeholder="Select a group (optional)"
                            data={groupOptions}
                            clearable
                            {...form.getInputProps('group_id')}
                        />
                        <Checkbox
                            label="Active Status"
                            {...form.getInputProps('is_active', { type: 'checkbox' })}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button type="submit" loading={isPending}>Save</Button>
                        </Group>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}
