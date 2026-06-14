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
        <Tooltip label="Logout" withArrow position="left">
            <ActionIcon onClick={handleLogout} variant="subtle" color="red">
                <IconLogout size={20} />
            </ActionIcon>
        </Tooltip>
    );
}
