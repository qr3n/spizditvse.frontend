import { Table, Group as MantineGroup, Text } from '@mantine/core';
import { SubscriptionGroup } from '../types';

interface GroupRowProps {
    group: SubscriptionGroup;
    actions?: React.ReactNode;
}

export function GroupRow({ group, actions }: GroupRowProps) {
    return (
        <Table.Tr>
            <Table.Td>
                <Text size="sm" fw={500}>{group.name}</Text>
            </Table.Td>
            <Table.Td>
                <Text size="12px" c="dimmed">
                    {new Date(group.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                    })}
                </Text>
            </Table.Td>
            <Table.Td>
                <MantineGroup gap={4}>
                    {actions}
                </MantineGroup>
            </Table.Td>
        </Table.Tr>
    );
}
