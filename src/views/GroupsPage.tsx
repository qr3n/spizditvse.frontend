'use client';

import { Title, Table, Loader, Alert, Card, Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useGroups, GroupRow } from '@/src/entities/group';
import { CreateGroupForm } from '@/src/features/create-group';
import { EditGroupButton } from '@/src/features/update-group';
import { DeleteGroupButton } from '@/src/features/delete-group';
import { IconAlertCircle, IconPlus } from '@tabler/icons-react';
import { useStaggerAnimation } from '@/src/shared/lib';

export default function GroupsPage() {
    const { data: groups, isLoading, error } = useGroups();
    const [opened, { open, close }] = useDisclosure(false);
    const listRef = useStaggerAnimation('tr');

    return (
        <div>
            <Group justify="space-between" mb="lg">
                <Title order={2}>Subscription Groups</Title>
                <Button leftSection={<IconPlus size={16} />} onClick={open}>Add Group</Button>
            </Group>

            <Modal opened={opened} onClose={close} title="Create New Group">
                <CreateGroupForm onSuccess={close} />
            </Modal>

            {isLoading && <Loader />}
            
            {error && (
                <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                    Failed to load groups. Ensure the backend is running.
                </Alert>
            )}

            {!isLoading && !error && (
                <Card p="0">
                    <Table highlightOnHover verticalSpacing="sm">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Created At</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody ref={listRef as any}>
                            {groups?.length === 0 ? (
                                <Table.Tr>
                                    <Table.Td colSpan={3} style={{ textAlign: 'center' }}>
                                        No groups found.
                                    </Table.Td>
                                </Table.Tr>
                            ) : (
                                groups?.map((group) => (
                                    <GroupRow 
                                        key={group.id} 
                                        group={group} 
                                        actions={
                                            <>
                                                <EditGroupButton group={group} />
                                                <DeleteGroupButton id={group.id} />
                                            </>
                                        } 
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

