'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useRefreshProvider } from './api';

export function RefreshProviderButton({ subId }: { subId: string }) {
    const { mutate, isPending } = useRefreshProvider();

    return (
        <Tooltip label="Manual Refresh" withArrow position="top">
            <ActionIcon 
                color="blue" 
                variant="light" 
                onClick={() => mutate(subId)}
                loading={isPending}
            >
                <IconRefresh size={16} />
            </ActionIcon>
        </Tooltip>
    );
}
