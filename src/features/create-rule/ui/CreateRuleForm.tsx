'use client';

import { TextInput, Button, Group, Box, Checkbox, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreateRule } from '../api';
import { CustomSelect } from '@/src/shared/ui';

export function CreateRuleForm({ onSuccess }: { onSuccess?: () => void }) {
    const { mutate, isPending } = useCreateRule();

    const form = useForm({
        initialValues: {
            description: '',
            pattern: '',
            action: 'block' as 'block' | 'allow',
            is_active: true,
        },
        validate: {
            pattern: (value) => (value.trim().length > 0 ? null : 'Pattern is required'),
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
                        label="Pattern"
                        description="Glob (*.ru), CIDR (10.0.0.0/8), or Regex (/^cdn\d+\.example\.com$/)"
                        placeholder="*.example.com"
                        {...form.getInputProps('pattern')}
                    />

                    <TextInput
                        label="Description"
                        placeholder="Block example domain"
                        {...form.getInputProps('description')}
                    />

                    <CustomSelect
                        label="Action"
                        data={[
                            { value: 'block', label: 'Block' },
                            { value: 'allow', label: 'Allow' }
                        ]}
                        value={form.values.action}
                        onChange={(val) => form.setFieldValue('action', val as any)}
                        error={form.errors.action}
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
                            Create Rule
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Box>
    );
}
