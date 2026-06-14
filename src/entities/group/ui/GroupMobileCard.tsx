'use client';

import { Card, Group, Text, Badge, Box } from '@mantine/core';
import { IconFolder, IconClock } from '@tabler/icons-react';
import { SubscriptionGroup } from '../types';

export function GroupMobileCard({ group, actions, providerCount = 0 }: { group: SubscriptionGroup; actions?: React.ReactNode; providerCount?: number }) {
    return (
        <Card p="md" mb="sm">
            <Group justify="space-between" mb="xs" align="flex-start">
                <Group gap="sm">
                    <Box
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            backgroundColor: 'rgba(99, 102, 241, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <IconFolder size={18} color="#818cf8" />
                    </Box>
                    <Box>
                        <Text fw={600} size="sm">{group.name}</Text>
                        <Text size="11px" c="dimmed">{providerCount} providers</Text>
                    </Box>
                </Group>
                <Group gap={4}>
                    {actions}
                </Group>
            </Group>

            <Group justify="space-between" mt="md" align="center">
                <Group gap={6}>
                    <IconClock size={14} color="var(--mantine-color-dark-3)" />
                    <Text size="xs" c="dimmed">Created:</Text>
                </Group>
                <Text size="xs" c="dimmed">
                    {new Date(group.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                    })}
                </Text>
            </Group>
        </Card>
    );
}
