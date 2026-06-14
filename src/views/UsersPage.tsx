'use client';

import { Title, Table, Loader, Alert, Card, Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUsers, UserRow } from '@/src/entities/user';
import { CreateUserForm } from '@/src/features/create-user';
import { ResetTokenButton } from '@/src/features/reset-user-token';
import { IconAlertCircle, IconPlus } from '@tabler/icons-react';
import { useStaggerAnimation } from '@/src/shared/lib';

export default function UsersPage() {
    const { data: users, isLoading, error } = useUsers();
    const [opened, { open, close }] = useDisclosure(false);
    const listRef = useStaggerAnimation('tr');

    return (
        <div>
            <Group justify="space-between" mb="lg">
                <Title order={2}>Users</Title>
                <Button leftSection={<IconPlus size={16} />} onClick={open}>Add User</Button>
            </Group>

            <Modal opened={opened} onClose={close} title="Create New User">
                <CreateUserForm onSuccess={close} />
            </Modal>

            {isLoading && <Loader />}
            
            {error && (
                <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                    Failed to load users. Ensure the backend is running.
                </Alert>
            )}

            {!isLoading && !error && (
                <Card p="0">
                    <Table highlightOnHover verticalSpacing="sm">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Expires</Table.Th>
                                <Table.Th>Subscription</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody ref={listRef as any}>
                            {users?.length === 0 ? (
                                <Table.Tr>
                                    <Table.Td colSpan={5} style={{ textAlign: 'center' }}>
                                        No users found.
                                    </Table.Td>
                                </Table.Tr>
                            ) : (
                                users?.map((user) => (
                                    <UserRow 
                                        key={user.id} 
                                        user={user} 
                                        actions={<ResetTokenButton userId={user.id} />} 
                                    />
                                ))
                            )}
                        </Table.Tbody>
                    </Table>
                </Card>
            )}
        </div>
    );
}

