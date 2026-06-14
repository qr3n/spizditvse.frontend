'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useDeleteRule } from '../api';

export function DeleteRuleButton({ id }: { id: string }) {
    const { mutate, isPending } = useDeleteRule();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this rule?')) {
            mutate(id);
        }
    };

    return (
        <Tooltip label="Delete Rule" withArrow position="top">
            <ActionIcon color="red" variant="light" onClick={handleDelete} loading={isPending}>
                <IconTrash size={16} />
            </ActionIcon>
        </Tooltip>
    );
}
