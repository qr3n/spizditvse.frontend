'use client';

import { TextInput, Button, Group, Box, Checkbox, Stack, Select, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreateProvider } from './api';
import { useGroups } from '@/src/entities/group';

export function CreateProviderForm({ onSuccess }: { onSuccess?: () => void }) {
    const { mutate, isPending } = useCreateProvider();
    const { data: groups, isLoading: groupsLoading } = useGroups();

    const form = useForm({
        initialValues: {
            alias: '',
            url: '',
            group_id: null as string | null,
            auto_refresh: true,
        },
        validate: {
            alias: (value) => (value.trim().length > 0 ? null : 'Alias is required'),
            url: (value) => (/^(http|https):\/\/[^ "]+$/.test(value) ? null : 'Invalid URL format'),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        mutate(values, {
            onSuccess: () => {
                form.reset();
                onSuccess?.();
            },
        });
    };

    const groupOptions = groups?.map((g) => ({ value: g.id, label: g.name })) || [];

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        withAsterisk
                        label="Provider Alias"
                        placeholder="Main HK Node"
                        {...form.getInputProps('alias')}
                    />

                    <TextInput
                        withAsterisk
                        label="Subscription URL"
                        placeholder="https://example.com/sub"
                        {...form.getInputProps('url')}
                    />

                    {groupsLoading ? (
                        <Loader size="sm" />
                    ) : (
                        <Select
                            label="Subscription Group"
                            placeholder="Select a group (optional)"
                            data={groupOptions}
                            clearable
                            {...form.getInputProps('group_id')}
                        />
                    )}

                    <Checkbox
                        label="Auto Refresh"
                        {...form.getInputProps('auto_refresh', { type: 'checkbox' })}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit" loading={isPending}>Add Provider</Button>
                    </Group>
                </Stack>
            </form>
        </Box>
    );
}
