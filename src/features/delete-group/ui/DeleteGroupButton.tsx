'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useDeleteGroup } from '../api';

export function DeleteGroupButton({ id }: { id: string }) {
    const { mutate, isPending } = useDeleteGroup();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this group? Warning: Providers in this group will be detached.')) {
            mutate(id);
        }
    };

    return (
        <Tooltip label="Delete Group" withArrow position="top">
            <ActionIcon color="red" variant="light" onClick={handleDelete} loading={isPending}>
                <IconTrash size={16} />
            </ActionIcon>
        </Tooltip>
    );
}
