'use client';

import { Card, Group, Text, Badge, ActionIcon, Tooltip, Stack, Box } from '@mantine/core';
import { IconCopy, IconCheck, IconCalendar, IconUser } from '@tabler/icons-react';
import { User } from '../types';
import { useClipboard } from '@mantine/hooks';

export function UserMobileCard({ user, actions }: { user: User; actions?: React.ReactNode }) {
    const clipboard = useClipboard({ timeout: 2000 });
    const isExpired = user.subscription_expires_at && new Date(user.subscription_expires_at) < new Date();

    return (
        <Card p="md" mb="sm">
            <Group justify="space-between" mb="xs" align="flex-start">
                <Group gap="sm">
                    <Box
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            backgroundColor: 'var(--mantine-color-dark-5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <IconUser size={18} color="var(--mantine-color-dark-2)" />
                    </Box>
                    <Box>
                        <Text fw={600} size="sm">{user.name}</Text>
                        <Badge 
                            color={user.is_active ? 'teal' : 'gray'} 
                            variant="light" 
                            size="xs"
                            mt={2}
                        >
                            {user.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                    </Box>
                </Group>
                <Group gap={4}>
                    {actions}
                </Group>
            </Group>

            <Stack gap={8} mt="md">
                <Group justify="space-between" align="center">
                    <Group gap={6}>
                        <IconCalendar size={14} color="var(--mantine-color-dark-3)" />
                        <Text size="xs" c="dimmed">Expires:</Text>
                    </Group>
                    {user.subscription_expires_at ? (
                        <Text size="xs" fw={500} c={isExpired ? 'red.5' : 'brand.4'}>
                            {new Date(user.subscription_expires_at).toLocaleDateString()}
                        </Text>
                    ) : (
                        <Text size="xs" c="dimmed">Never</Text>
                    )}
                </Group>

                <Group justify="space-between" align="center">
                    <Text size="xs" c="dimmed">Subscription Link:</Text>
                    <Tooltip label={clipboard.copied ? 'Copied' : 'Copy'} withArrow position="left">
                        <ActionIcon 
                            size="md"
                            variant="light"
                            color={clipboard.copied ? 'teal' : 'brand'} 
                            onClick={() => clipboard.copy(user.sub_url)}
                        >
                            {clipboard.copied ? <IconCheck size={14} /> : <IconCopy size={14} stroke={1.5} />}
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Stack>
        </Card>
    );
}
