'use client';

import { TextInput, Button, Group, Box, Stack, ActionIcon, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUpdateGroup } from '../api';
import { SubscriptionGroup } from '@/src/entities/group';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { Drawer } from '@/src/shared/ui';

export function EditGroupButton({ group }: { group: SubscriptionGroup }) {
    const [opened, { open, close }] = useDisclosure(false);
    const { mutate, isPending } = useUpdateGroup();

    const form = useForm({
        initialValues: { name: group.name },
        validate: {
            name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        mutate({ id: group.id, data: values }, { onSuccess: close });
    };

    return (
        <>
            <Tooltip label="Edit" withArrow position="top">
                <ActionIcon color="gray" variant="subtle" size="sm" radius="md" onClick={open}>
                    <IconEdit size={14} stroke={1.5} />
                </ActionIcon>
            </Tooltip>

            <Drawer opened={opened} onClose={close} title="Edit group">
                <Box>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack gap="md">
                            <TextInput
                                withAsterisk
                                label="Group name"
                                {...form.getInputProps('name')}
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
