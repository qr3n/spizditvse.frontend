'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useDeleteProvider } from '../api';
import { ConfirmDialog } from '@/src/shared/ui';

export function DeleteProviderButton({ id }: { id: string }) {
    const [opened, { open, close }] = useDisclosure(false);
    const { mutate, isPending } = useDeleteProvider();

    const handleConfirm = () => {
        mutate(id, {
            onSuccess: () => close(),
        });
    };

    return (
        <>
            <Tooltip label="Delete" withArrow position="top">
                <ActionIcon
                    color="gray"
                    variant="subtle"
                    size="xl"
                    radius="md"
                    onClick={open}
                >
                    <IconTrash size={24} stroke={1.5} />
                </ActionIcon>
            </Tooltip>

            <ConfirmDialog
                opened={opened}
                onClose={close}
                onConfirm={handleConfirm}
                loading={isPending}
                title="Delete Provider"
                message="Are you sure you want to delete this provider subscription? This action cannot be undone."
            />
        </>
    );
}
