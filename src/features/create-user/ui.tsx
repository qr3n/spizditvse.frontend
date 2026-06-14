'use client';

import { TextInput, Button, Group, Box, Checkbox, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreateUser } from './api';

export function CreateUserForm({ onSuccess }: { onSuccess?: () => void }) {
    const { mutate, isPending } = useCreateUser();

    const form = useForm({
        initialValues: {
            name: '',
            is_active: true,
            // subscription_expires_at can be added later as DatePicker
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
                        label="User Name"
                        placeholder="John Doe"
                        {...form.getInputProps('name')}
                    />

                    <Checkbox
                        label="Active Status"
                        {...form.getInputProps('is_active', { type: 'checkbox' })}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit" loading={isPending}>Create User</Button>
                    </Group>
                </Stack>
            </form>
        </Box>
    );
}
