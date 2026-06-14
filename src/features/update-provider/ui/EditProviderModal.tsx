'use client';

import { TextInput, Button, Group, Box, Checkbox, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUpdateProvider } from '../api';
import { Provider } from '@/src/entities/provider';
import { useGroups } from '@/src/entities/group';
import { Drawer, CustomSelect } from '@/src/shared/ui';

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
        <Drawer opened={opened} onClose={onClose} title="Edit Provider">
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
                        <CustomSelect
                            label="Subscription Group"
                            placeholder="Select a group"
                            data={groupOptions}
                            clearable
                            value={form.values.group_id}
                            onChange={(val) => form.setFieldValue('group_id', val)}
                            error={form.errors.group_id}
                        />
                        <Checkbox
                            label="Active Status"
                            {...form.getInputProps('is_active', { type: 'checkbox' })}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button 
                                type="submit" 
                                loading={isPending}
                                fullWidth
                                style={{ maxWidth: 'fit-content' }}
                                styles={{
                                    root: {
                                        '@media (max-width: 48em)': {
                                            maxWidth: '100%',
                                        }
                                    }
                                } as any}
                            >
                                Save
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Box>
        </Drawer>
    );
}
