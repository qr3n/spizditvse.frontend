'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useDeleteProvider } from '../api';

export function DeleteProviderButton({ id }: { id: string }) {
    const { mutate, isPending } = useDeleteProvider();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this provider?')) {
            mutate(id);
        }
    };

    return (
        <Tooltip label="Delete Provider" withArrow position="top">
            <ActionIcon color="red" variant="light" onClick={handleDelete} loading={isPending}>
                <IconTrash size={16} />
            </ActionIcon>
        </Tooltip>
    );
}
