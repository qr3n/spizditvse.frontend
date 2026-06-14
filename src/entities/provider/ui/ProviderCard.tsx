import { Card, Text, Badge, Group, Progress } from '@mantine/core';
import { Provider } from '../types';

interface ProviderCardProps {
    provider: Provider;
    actions?: React.ReactNode;
}

export function ProviderCard({ provider, actions }: ProviderCardProps) {
    const percentUsed = provider.traffic_total_gb > 0
        ? (provider.traffic_used_gb / provider.traffic_total_gb) * 100
        : 0;

    const progressColor = percentUsed > 90 ? 'red' : percentUsed > 75 ? 'yellow' : 'blue';

    return (
        <Card p="xl">
            <Group justify="space-between" mb="xs">
                <Text fw={600} size="lg">{provider.alias}</Text>
                <Group gap="xs">
                    <Badge color={provider.is_active ? 'green' : 'gray'}>
                        {provider.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    {actions}
                </Group>
            </Group>

            <Text size="sm" c="dimmed" mb="md" lineClamp={1}>
                {provider.url}
            </Text>

            <Group justify="space-between" mb="xs">
                <Text size="xs" c="dimmed" fw={500}>Traffic Usage</Text>
                <Text size="xs" fw={600} c={progressColor}>
                    {provider.traffic_used_gb.toFixed(2)} / {provider.traffic_total_gb.toFixed(2)} GB
                </Text>
            </Group>
            <Progress value={percentUsed} color={progressColor} radius="xl" size="md" mb="md" />

            <Group justify="space-between">
                <Text size="xs" c="dimmed" fw={500}>Nodes Active</Text>
                <Badge variant="outline" color="gray">{provider.outbound_count}</Badge>
            </Group>
        </Card>
    );
}
