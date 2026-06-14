'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { EditProviderModal } from './EditProviderModal';
import { Provider } from '@/src/entities/provider';

export function EditProviderButton({ provider }: { provider: Provider }) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Tooltip label="Edit settings" withArrow position="top">
                <ActionIcon onClick={open}>
                    <IconEdit size={18} stroke={1.5} />
                </ActionIcon>
            </Tooltip>
            <EditProviderModal provider={provider} opened={opened} onClose={close} />
        </>
    );
}
