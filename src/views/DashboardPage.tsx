'use client';

import { Title, SimpleGrid, Card, Text, Group, Skeleton, ThemeIcon } from '@mantine/core';
import { useProviders } from '@/src/entities/provider';
import { useUsers } from '@/src/entities/user';
import { useStaggerAnimation } from '@/src/shared/lib';
import { IconUsers, IconServer, IconChartPie, IconDatabase } from '@tabler/icons-react';

export default function DashboardPage() {
    const { data: providers, isLoading: providersLoading } = useProviders();
    const { data: users, isLoading: usersLoading } = useUsers();
    const listRef = useStaggerAnimation('> *');

    const activeUsersCount = users?.filter(u => u.is_active).length || 0;
    const activeProvidersCount = providers?.filter(p => p.is_active).length || 0;

    const totalTrafficUsed = providers?.reduce((acc, p) => acc + p.traffic_used_gb, 0) || 0;
    const totalTrafficLimit = providers?.reduce((acc, p) => acc + p.traffic_total_gb, 0) || 0;

    return (
        <div>
            <Title order={2} mb="xl">Dashboard</Title>
            
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} ref={listRef as any}>
                <Card p="xl">
                    <Group justify="space-between" align="flex-start" wrap="nowrap">
                        <div>
                            <Text size="xs" c="dimmed" fw={700} tt="uppercase" mb="xs">Active Users</Text>
                            {usersLoading ? <Skeleton height={30} width={80} /> : (
                                <Text size="xl" fw={700}>{activeUsersCount} / {users?.length || 0}</Text>
                            )}
                        </div>
                        <ThemeIcon color="blue" variant="light" size="xl" radius="md">
                            <IconUsers size={24} />
                        </ThemeIcon>
                    </Group>
                </Card>

                <Card p="xl">
                    <Group justify="space-between" align="flex-start" wrap="nowrap">
                        <div>
                            <Text size="xs" c="dimmed" fw={700} tt="uppercase" mb="xs">Active Providers</Text>
                            {providersLoading ? <Skeleton height={30} width={80} /> : (
                                <Text size="xl" fw={700}>{activeProvidersCount} / {providers?.length || 0}</Text>
                            )}
                        </div>
                        <ThemeIcon color="teal" variant="light" size="xl" radius="md">
                            <IconServer size={24} />
                        </ThemeIcon>
                    </Group>
                </Card>

                <Card p="xl">
                    <Group justify="space-between" align="flex-start" wrap="nowrap">
                        <div>
                            <Text size="xs" c="dimmed" fw={700} tt="uppercase" mb="xs">Traffic Used</Text>
                            {providersLoading ? <Skeleton height={30} width={80} /> : (
                                <Text size="xl" fw={700}>{totalTrafficUsed.toFixed(1)} GB</Text>
                            )}
                        </div>
                        <ThemeIcon color="orange" variant="light" size="xl" radius="md">
                            <IconChartPie size={24} />
                        </ThemeIcon>
                    </Group>
                </Card>

                <Card p="xl">
                    <Group justify="space-between" align="flex-start" wrap="nowrap">
                        <div>
                            <Text size="xs" c="dimmed" fw={700} tt="uppercase" mb="xs">Total Capacity</Text>
                            {providersLoading ? <Skeleton height={30} width={80} /> : (
                                <Text size="xl" fw={700}>{totalTrafficLimit.toFixed(0)} GB</Text>
                            )}
                        </div>
                        <ThemeIcon color="grape" variant="light" size="xl" radius="md">
                            <IconDatabase size={24} />
                        </ThemeIcon>
                    </Group>
                </Card>
            </SimpleGrid>
        </div>
    );
}

