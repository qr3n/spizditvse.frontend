import { Table, Badge, ActionIcon, Group, Tooltip, CopyButton, Text } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import { User } from '../types';

interface UserRowProps {
    user: User;
    actions?: React.ReactNode;
}

export function UserRow({ user, actions }: UserRowProps) {
    return (
        <Table.Tr>
            <Table.Td>
                <Text fw={500}>{user.name}</Text>
            </Table.Td>
            <Table.Td>
                <Badge color={user.is_active ? 'green' : 'gray'}>
                    {user.is_active ? 'Active' : 'Inactive'}
                </Badge>
            </Table.Td>
            <Table.Td>
                {user.subscription_expires_at ? (
                    <Badge color={new Date(user.subscription_expires_at) < new Date() ? 'red' : 'blue'}>
                        {new Date(user.subscription_expires_at).toLocaleDateString()}
                    </Badge>
                ) : (
                    <Badge color="gray" variant="outline">Never</Badge>
                )}
            </Table.Td>
            <Table.Td>
                <Group gap="xs">
                    <CopyButton value={user.sub_url} timeout={2000}>
                        {({ copied, copy }) => (
                            <Tooltip label={copied ? 'Copied' : 'Copy Sub Link'} withArrow position="right">
                                <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                    <IconCopy size={16} />
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </CopyButton>
                </Group>
            </Table.Td>
            <Table.Td>{actions}</Table.Td>
        </Table.Tr>
    );
}
