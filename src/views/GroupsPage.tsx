'use client';

import { Title, Table, Loader, Alert, Card, Button, Group, Text, Box, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useGroups, GroupRow, GroupMobileCard } from '@/src/entities/group';
import { CreateGroupForm } from '@/src/features/create-group';
import { EditGroupButton } from '@/src/features/update-group';
import { DeleteGroupButton } from '@/src/features/delete-group';
import { IconAlertCircle, IconPlus, IconFolder } from '@tabler/icons-react';
import { Drawer } from '@/src/shared/ui';
import { useProviders } from '@/src/entities/provider';
import { useMemo } from 'react';

export default function GroupsPage() {
    const { data: groups, isLoading: groupsLoading, error } = useGroups();
    const { data: providers, isLoading: providersLoading } = useProviders();
    const [opened, { open, close }] = useDisclosure(false);

    const isLoading = groupsLoading || providersLoading;

    const groupStats = useMemo(() => {
        const stats: Record<string, number> = {};
        providers?.forEach(p => {
            if (p.group_id) stats[p.group_id] = (stats[p.group_id] || 0) + 1;
        });
        return stats;
    }, [providers]);

    return (
        <Box maw={900}>
            <Group justify="space-between" mb="xl" align="flex-end">
                <Box>
                    <Title order={2} size="20px" fw={600}>Subscription Groups</Title>
                    <Text size="sm" c="dimmed" mt={4}>
                        {groups ? `${groups.length} group${groups.length !== 1 ? 's' : ''}` : 'Organise providers into groups'}
                    </Text>
                </Box>
                <Button
                    leftSection={<IconPlus size={15} stroke={2} />}
                    onClick={open}
                    size="sm"
                >
                    Add group
                </Button>
            </Group>

            <Drawer opened={opened} onClose={close} title="Create group">
                <CreateGroupForm onSuccess={close} />
            </Drawer>

            {isLoading && (
                <Center h={200}>
                    <Loader size="sm" color="blue" />
                </Center>
            )}

            {error && (
                <Alert icon={<IconAlertCircle size={16} />} color="red" radius="md" variant="light">
                    Failed to load groups. Ensure the backend is running.
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
                                        <Table.Th>Created</Table.Th>
                                        <Table.Th>Actions</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {groups?.length === 0 ? (
                                        <Table.Tr>
                                            <Table.Td colSpan={3}>
                                                <Center py={40}>
                                                    <Box ta="center">
                                                        <IconFolder size={36} color="var(--mantine-color-dark-4)" stroke={1} />
                                                        <Text size="sm" c="dimmed" mt={8}>No groups yet</Text>
                                                    </Box>
                                                </Center>
                                            </Table.Td>
                                        </Table.Tr>
                                    ) : (
                                        groups?.map((group) => (
                                            <GroupRow
                                                key={group.id}
                                                group={group}
                                                actions={
                                                    <Group gap={4}>
                                                        <EditGroupButton group={group} />
                                                        <DeleteGroupButton id={group.id} />
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
                        {groups?.length === 0 ? (
                            <Center py={40}>
                                <Box ta="center">
                                    <IconFolder size={36} color="var(--mantine-color-dark-4)" stroke={1} />
                                    <Text size="sm" c="dimmed" mt={8}>No groups yet</Text>
                                </Box>
                            </Center>
                        ) : (
                            groups?.map((group) => (
                                <GroupMobileCard
                                    key={group.id}
                                    group={group}
                                    providerCount={groupStats[group.id] || 0}
                                    actions={
                                        <Group gap={4}>
                                            <EditGroupButton group={group} />
                                            <DeleteGroupButton id={group.id} />
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
