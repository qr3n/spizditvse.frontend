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
            <Tooltip label="Edit Provider" withArrow position="top">
                <ActionIcon color="blue" variant="light" onClick={open}>
                    <IconEdit size={16} />
                </ActionIcon>
            </Tooltip>
            {opened && <EditProviderModal provider={provider} opened={opened} onClose={close} />}
        </>
    );
}
