'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useRefreshProvider } from './api';

export function RefreshProviderButton({ subId }: { subId: string }) {
    const { mutate, isPending } = useRefreshProvider();

    return (
        <Tooltip label="Refresh nodes" withArrow position="top">
            <ActionIcon
                onClick={() => mutate(subId)}
                loading={isPending}
            >
                <IconRefresh size={18} stroke={1.5} />
            </ActionIcon>
        </Tooltip>
    );
}
