'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useDeleteRule } from '../api';
import { ConfirmDialog } from '@/src/shared/ui';

export function DeleteRuleButton({ id }: { id: string }) {
    const [opened, { open, close }] = useDisclosure(false);
    const { mutate, isPending } = useDeleteRule();

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
                title="Delete Filter Rule"
                message="Are you sure you want to delete this filter rule? This will immediately affect traffic routing."
            />
        </>
    );
}
