'use client';

import { Title, Table, Loader, Alert, Card, Button, Group, Text, Box, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUsers, UserRow, UserMobileCard } from '@/src/entities/user';
import { CreateUserForm } from '@/src/features/create-user';
import { ResetTokenButton } from '@/src/features/reset-user-token';
import { IconAlertCircle, IconPlus, IconUsers } from '@tabler/icons-react';
import { Drawer } from '@/src/shared/ui';

export default function UsersPage() {
    const { data: users, isLoading, error } = useUsers();
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Box maw={1100}>
            <Group justify="space-between" mb="xl" align="flex-end">
                <Box>
                    <Title order={2} size="20px" fw={600}>Users</Title>
                    <Text size="sm" c="dimmed" mt={4}>
                        {users ? `${users.filter(u => u.is_active).length} of ${users.length} active` : 'Manage subscription users'}
                    </Text>
                </Box>
                <Button
                    leftSection={<IconPlus size={15} stroke={2} />}
                    onClick={open}
                    size="sm"
                >
                    Add user
                </Button>
            </Group>

            <Drawer opened={opened} onClose={close} title="Create user">
                <CreateUserForm onSuccess={close} />
            </Drawer>

            {isLoading && (
                <Center h={200}>
                    <Loader size="sm" color="blue" />
                </Center>
            )}

            {error && (
                <Alert icon={<IconAlertCircle size={16} />} color="red" radius="md" variant="light">
                    Failed to load users. Ensure the backend is running.
                </Alert>
            )}

            {!isLoading && !error && (
                <>
                    {/* Desktop View */}
                    <Box visibleFrom="sm">
                        <Card p={0}>
                            <Table highlightOnHover verticalSpacing="sm">
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Name</Table.Th>
                                        <Table.Th>Status</Table.Th>
                                        <Table.Th>Expires</Table.Th>
                                        <Table.Th>Sub link</Table.Th>
                                        <Table.Th>Actions</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {users?.length === 0 ? (
                                        <Table.Tr>
                                            <Table.Td colSpan={5}>
                                                <Center py={40}>
                                                    <Box ta="center">
                                                        <IconUsers size={36} color="var(--mantine-color-dark-4)" stroke={1} />
                                                        <Text size="sm" c="dimmed" mt={8}>No users yet</Text>
                                                    </Box>
                                                </Center>
                                            </Table.Td>
                                        </Table.Tr>
                                    ) : (
                                        users?.map((user) => (
                                            <UserRow
                                                key={user.id}
                                                user={user}
                                                actions={
                                                    <Group gap={4}>
                                                        <ResetTokenButton userId={user.id} />
                                                    </Group>
                                                }
                                            />
                                        ))
                                    )}
                                </Table.Tbody>
                            </Table>
                        </Card>
                    </Box>

                    {/* Mobile View */}
                    <Box hiddenFrom="sm">
                        {users?.length === 0 ? (
                            <Center py={40}>
                                <Box ta="center">
                                    <IconUsers size={36} color="var(--mantine-color-dark-4)" stroke={1} />
                                    <Text size="sm" c="dimmed" mt={8}>No users yet</Text>
                                </Box>
                            </Center>
                        ) : (
                            users?.map((user) => (
                                <UserMobileCard
                                    key={user.id}
                                    user={user}
                                    actions={
                                        <Group gap={4}>
                                            <ResetTokenButton userId={user.id} />
                                        </Group>
                                    }
                                />
                            ))
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
}
