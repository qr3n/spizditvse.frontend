'use client';

import { TextInput, Button, Group, Box, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreateGroup } from '../api';

export function CreateGroupForm({ onSuccess }: { onSuccess?: () => void }) {
    const { mutate, isPending } = useCreateGroup();

    const form = useForm({
        initialValues: {
            name: '',
        },
        validate: {
            name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
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

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        withAsterisk
                        label="Group Name"
                        placeholder="e.g. High-Speed-Cluster"
                        {...form.getInputProps('name')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit" loading={isPending}>Create Group</Button>
                    </Group>
                </Stack>
            </form>
        </Box>
    );
}
