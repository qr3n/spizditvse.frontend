'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/src/shared/lib/token';

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        removeToken();
        router.push('/login');
    };

    return (
        <Tooltip label="Sign out" withArrow position="left">
            <ActionIcon
                onClick={handleLogout}
                variant="subtle"
                color="gray"
                radius="md"
                size="md"
            >
                <IconLogout size={18} stroke={1.5} />
            </ActionIcon>
        </Tooltip>
    );
}
