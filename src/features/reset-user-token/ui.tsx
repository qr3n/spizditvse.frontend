'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useResetUserToken } from './api';

export function ResetTokenButton({ userId }: { userId: string }) {
    const { mutate, isPending } = useResetUserToken();

    return (
        <Tooltip label="Reset Token" withArrow position="top">
            <ActionIcon 
                color="red" 
                variant="light" 
                onClick={() => mutate(userId)}
                loading={isPending}
            >
                <IconRefresh size={16} />
            </ActionIcon>
        </Tooltip>
    );
}
