import { Table, Group, Badge, Text, Box } from '@mantine/core';
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
                {rule.description && (
                    <Text size="xs" c="dimmed" mt={2}>{rule.description}</Text>
                )}
            </Table.Td>
            <Table.Td>
                <Badge color={rule.action === 'block' ? 'red' : 'teal'}>
                    {rule.action.toUpperCase()}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Badge color={rule.is_active ? 'teal' : 'gray'}>
                    {rule.is_active ? 'Active' : 'Inactive'}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Text size="12px" c="dimmed">
                    {new Date(rule.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                    })}
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
