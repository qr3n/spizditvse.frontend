'use client';

import { TextInput, Button, Group, Box, Stack, ActionIcon, Tooltip, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUpdateRule } from '../api';
import { FilterRule } from '@/src/entities/rule';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { Drawer, CustomSelect } from '@/src/shared/ui';

export function EditRuleButton({ rule }: { rule: FilterRule }) {
    const [opened, { open, close }] = useDisclosure(false);
    const { mutate, isPending } = useUpdateRule();

    const form = useForm({
        initialValues: {
            description: rule.description,
            pattern: rule.pattern,
            action: rule.action,
            is_active: rule.is_active,
        },
        validate: {
            pattern: (value) => (value.trim().length > 0 ? null : 'Pattern is required'),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        mutate({ id: rule.id, data: values }, { onSuccess: close });
    };

    return (
        <>
            <Tooltip label="Edit" withArrow position="top">
                <ActionIcon color="gray" variant="subtle" size="xl" radius="md" onClick={open}>
                    <IconEdit size={24} stroke={1.5} />
                </ActionIcon>
            </Tooltip>

            <Drawer opened={opened} onClose={close} title="Edit rule">
                <Box>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack gap="md">
                            <TextInput
                                withAsterisk
                                label="Pattern"
                                {...form.getInputProps('pattern')}
                            />
                            <TextInput
                                label="Description"
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
                                label="Active"
                                {...form.getInputProps('is_active', { type: 'checkbox' })}
                            />
                            <Group justify="flex-end">
                                <Button 
                                    type="submit" 
                                    loading={isPending} 
                                    size="sm"
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
        </>
    );
}
