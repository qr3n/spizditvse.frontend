'use client';

import { Card, Group, Text, Badge, Box, Stack } from '@mantine/core';
import { IconFilter, IconClock, IconActivity } from '@tabler/icons-react';
import { FilterRule } from '../types';

export function RuleMobileCard({ rule, actions }: { rule: FilterRule; actions?: React.ReactNode }) {
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
                        <IconFilter size={18} color="var(--mantine-color-dark-2)" />
                    </Box>
                    <Box>
                        <Text fw={600} size="sm" ff="monospace">{rule.pattern}</Text>
                        <Group gap={4} mt={2}>
                            <Badge 
                                color={rule.action === 'block' ? 'red.6' : 'teal'} 
                                variant="light" 
                                size="xs"
                            >
                                {rule.action.toUpperCase()}
                            </Badge>
                            <Badge 
                                color={rule.is_active ? 'teal' : 'gray'} 
                                variant="light" 
                                size="xs"
                            >
                                {rule.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                        </Group>
                    </Box>
                </Group>
                <Group gap={4}>
                    {actions}
                </Group>
            </Group>

            {rule.description && (
                <Text size="xs" c="dimmed" mt="xs">
                    {rule.description}
                </Text>
            )}

            <Group justify="space-between" mt="md" align="center">
                <Group gap={6}>
                    <IconClock size={14} color="var(--mantine-color-dark-3)" />
                    <Text size="xs" c="dimmed">Rule added:</Text>
                </Group>
                <Text size="xs" c="dimmed">
                    {new Date(rule.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                    })}
                </Text>
            </Group>
        </Card>
    );
}
