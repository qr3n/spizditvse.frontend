'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useResetUserToken } from './api';

export function ResetTokenButton({ userId }: { userId: string }) {
    const { mutate, isPending } = useResetUserToken();

    return (
        <Tooltip label="Reset token" withArrow position="top">
            <ActionIcon
                color="gray"
                variant="subtle"
                size="sm"
                radius="md"
                onClick={() => mutate(userId)}
                loading={isPending}
            >
                <IconRefresh size={14} stroke={1.5} />
            </ActionIcon>
        </Tooltip>
    );
}
