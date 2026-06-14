import { Table, Group as MantineGroup } from '@mantine/core';
import { SubscriptionGroup } from '../types';

interface GroupRowProps {
    group: SubscriptionGroup;
    actions?: React.ReactNode;
}

export function GroupRow({ group, actions }: GroupRowProps) {
    return (
        <Table.Tr>
            <Table.Td>{group.name}</Table.Td>
            <Table.Td>{new Date(group.created_at).toLocaleDateString()}</Table.Td>
            <Table.Td>
                <MantineGroup gap="xs">
                    {actions}
                </MantineGroup>
            </Table.Td>
        </Table.Tr>
    );
}
