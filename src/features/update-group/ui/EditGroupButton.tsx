'use client';

import { TextInput, Button, Group, Box, Stack, Modal, ActionIcon, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUpdateGroup } from '../api';
import { SubscriptionGroup } from '@/src/entities/group';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';

export function EditGroupButton({ group }: { group: SubscriptionGroup }) {
    const [opened, { open, close }] = useDisclosure(false);
    const { mutate, isPending } = useUpdateGroup();

    const form = useForm({
        initialValues: {
            name: group.name,
        },
        validate: {
            name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        mutate({ id: group.id, data: values }, {
            onSuccess: () => {
                close();
            },
        });
    };

    return (
        <>
            <Tooltip label="Edit Group" withArrow position="top">
                <ActionIcon color="blue" variant="light" onClick={open}>
                    <IconEdit size={16} />
                </ActionIcon>
            </Tooltip>

            <Modal opened={opened} onClose={close} title="Edit Group">
                <Box mx="auto">
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack>
                            <TextInput
                                withAsterisk
                                label="Group Name"
                                {...form.getInputProps('name')}
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
