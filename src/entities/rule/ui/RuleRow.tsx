import { Table, Group, Badge, Text } from '@mantine/core';
import { FilterRule } from '../types';

interface RuleRowProps {
    rule: FilterRule;
    actions?: React.ReactNode;
}

export function RuleRow({ rule, actions }: RuleRowProps) {
    return (
        <Table.Tr>
            <Table.Td>
                <Text fw={600} size="sm">{rule.pattern}</Text>
                <Text size="xs" c="dimmed">{rule.description || 'No description'}</Text>
            </Table.Td>
            <Table.Td>
                <Badge color={rule.action === 'block' ? 'red' : 'teal'}>
                    {rule.action.toUpperCase()}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Badge color={rule.is_active ? 'green' : 'gray'}>
                    {rule.is_active ? 'Active' : 'Inactive'}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Text size="sm" c="dimmed">
                    {new Date(rule.created_at).toLocaleDateString()}
                </Text>
            </Table.Td>
            <Table.Td>
                <Group gap="xs">
                    {actions}
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}
