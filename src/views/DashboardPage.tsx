'use client';

import { Title, SimpleGrid, Card, Text, Group, Skeleton, Box, Progress, Stack } from '@mantine/core';
import { useProviders } from '@/src/entities/provider';
import { useUsers } from '@/src/entities/user';
import { IconUsers, IconServer, IconDatabase, IconActivity } from '@tabler/icons-react';

interface StatCardProps {
    label: string;
    value: React.ReactNode;
    sub?: React.ReactNode;
    icon: React.ElementType;
    iconColor: string;
    iconBg: string;
}

function StatCard({ label, value, sub, icon: Icon, iconColor, iconBg }: StatCardProps) {
    return (
        <Card p="lg">
            <Group justify="space-between" align="flex-start">
                <Stack gap={2}>
                    <Text size="12px" fw={500} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.6px' }}>
                        {label}
                    </Text>
                    <Box mt={6}>{value}</Box>
                    {sub && <Box mt={2}>{sub}</Box>}
                </Stack>
                <Box
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: iconBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    <Icon size={20} color={iconColor} stroke={1.5} />
                </Box>
            </Group>
        </Card>
    );
}

export default function DashboardPage() {
    const { data: providers, isLoading: providersLoading } = useProviders();
    const { data: users, isLoading: usersLoading } = useUsers();

    const activeUsersCount = users?.filter(u => u.is_active).length || 0;
    const totalUsers = users?.length || 0;
    const activeProvidersCount = providers?.filter(p => p.is_active).length || 0;
    const totalProviders = providers?.length || 0;

    const totalTrafficUsed = providers?.reduce((acc, p) => acc + p.traffic_used_gb, 0) || 0;
    const totalTrafficLimit = providers?.reduce((acc, p) => acc + p.traffic_total_gb, 0) || 0;
    const trafficPct = totalTrafficLimit > 0 ? (totalTrafficUsed / totalTrafficLimit) * 100 : 0;

    const loading = providersLoading || usersLoading;

    return (
        <Box maw={1100}>
            <Box mb="xl">
                <Title order={2} size="20px" fw={600}>Dashboard</Title>
                <Text size="sm" c="dimmed" mt={4}>Overview of your VPN infrastructure</Text>
            </Box>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
                <StatCard
                    label="Users"
                    icon={IconUsers}
                    iconColor="var(--mantine-color-blue-4)"
                    iconBg="rgba(26, 115, 232, 0.15)"
                    value={
                        loading ? <Skeleton height={24} width={60} /> : (
                            <Text size="xl" fw={600}>
                                {activeUsersCount}
                                <Text span size="sm" fw={400} c="dimmed"> / {totalUsers}</Text>
                            </Text>
                        )
                    }
                    sub={<Text size="xs" c="dimmed">active</Text>}
                />

                <StatCard
                    label="Providers"
                    icon={IconServer}
                    iconColor="#2DD4BF"
                    iconBg="rgba(45, 212, 191, 0.15)"
                    value={
                        loading ? <Skeleton height={24} width={60} /> : (
                            <Text size="xl" fw={600}>
                                {activeProvidersCount}
                                <Text span size="sm" fw={400} c="dimmed"> / {totalProviders}</Text>
                            </Text>
                        )
                    }
                    sub={<Text size="xs" c="dimmed">online</Text>}
                />

                <StatCard
                    label="Traffic Used"
                    icon={IconActivity}
                    iconColor="#FB923C"
                    iconBg="rgba(251, 146, 60, 0.15)"
                    value={
                        loading ? <Skeleton height={24} width={80} /> : (
                            <Text size="xl" fw={600}>{totalTrafficUsed.toFixed(1)} GB</Text>
                        )
                    }
                    sub={
                        loading ? null : (
                            <Box mt={6}>
                                <Progress
                                    value={trafficPct}
                                    color={trafficPct > 90 ? 'red' : trafficPct > 75 ? 'yellow' : 'blue'}
                                    size="xs"
                                    radius="xl"
                                    style={{ width: 120, backgroundColor: 'var(--mantine-color-dark-4)' }}
                                />
                            </Box>
                        )
                    }
                />

                <StatCard
                    label="Total Capacity"
                    icon={IconDatabase}
                    iconColor="#A78BFA"
                    iconBg="rgba(167, 139, 250, 0.15)"
                    value={
                        loading ? <Skeleton height={24} width={80} /> : (
                            <Text size="xl" fw={600}>{totalTrafficLimit.toFixed(0)} GB</Text>
                        )
                    }
                    sub={<Text size="xs" c="dimmed">across all providers</Text>}
                />
            </SimpleGrid>
        </Box>
    );
}
