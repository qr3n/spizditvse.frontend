'use client';

import { TextInput, Button, Group, Box, Stack, Modal, ActionIcon, Tooltip, Select, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUpdateRule } from '../api';
import { FilterRule } from '@/src/entities/rule';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';

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
        mutate({ id: rule.id, data: values }, {
            onSuccess: () => {
                close();
            },
        });
    };

    return (
        <>
            <Tooltip label="Edit Rule" withArrow position="top">
                <ActionIcon color="blue" variant="light" onClick={open}>
                    <IconEdit size={16} />
                </ActionIcon>
            </Tooltip>

            <Modal opened={opened} onClose={close} title="Edit Rule">
                <Box mx="auto">
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack>
                            <TextInput
                                withAsterisk
                                label="Pattern"
                                {...form.getInputProps('pattern')}
                            />
                            <TextInput
                                label="Description"
                                {...form.getInputProps('description')}
                            />
                            <Select
                                label="Action"
                                data={[
                                    { value: 'block', label: 'Block' },
                                    { value: 'allow', label: 'Allow' }
                                ]}
                                {...form.getInputProps('action')}
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
        </>
    );
}
