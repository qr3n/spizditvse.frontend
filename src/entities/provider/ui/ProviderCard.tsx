import { Card, Text, Badge, Group, Progress, Box, Stack } from '@mantine/core';
import { Provider } from '../types';

interface ProviderCardProps {
    provider: Provider;
    actions?: React.ReactNode;
}

export function ProviderCard({ provider, actions }: ProviderCardProps) {
    const trafficUsed = provider.traffic_used_gb ?? 0;
    const trafficTotal = provider.traffic_total_gb ?? 0;
    const percentUsed = trafficTotal > 0 ? (trafficUsed / trafficTotal) * 100 : 0;
    const progressColor = percentUsed > 90 ? 'red' : percentUsed > 75 ? 'yellow' : 'blue';

    return (
        <Card p="lg">
            <Group justify="space-between" mb="md" align="flex-start" wrap="nowrap">
                <Box style={{ minWidth: 0 }}>
                    <Text fw={500} size="sm" truncate>{provider.alias}</Text>
                    <Text size="12px" c="dimmed" mt={2} truncate style={{ maxWidth: 200 }}>
                        {provider.url}
                    </Text>
                </Box>
                <Group gap={4} style={{ flexShrink: 0 }}>
                    <Badge
                        color={provider.is_active ? 'teal' : 'gray'}
                        variant="light"
                        size="sm"
                    >
                        {provider.is_active ? 'Online' : 'Offline'}
                    </Badge>
                </Group>
            </Group>

            <Stack gap="xs">
                <Box>
                    <Group justify="space-between" mb={6}>
                        <Text size="11px" fw={500} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.5px' }}>Traffic</Text>
                        <Text size="12px" fw={500} c={percentUsed > 90 ? 'red' : undefined}>
                            {trafficUsed.toFixed(1)} / {trafficTotal.toFixed(0)} GB
                        </Text>
                    </Group>
                    <Progress value={percentUsed} color={progressColor} radius="xl" size="sm" />
                </Box>

                <Group justify="space-between" align="center" mt={4}>
                    <Text size="12px" c="dimmed">
                        <Text span fw={500}>{provider.outbound_count}</Text> nodes
                    </Text>
                    <Group gap={4}>
                        {actions}
                    </Group>
                </Group>
            </Stack>
        </Card>
    );
}
