'use client';

import { Title, Table, Loader, Alert, Card, Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRules, RuleRow } from '@/src/entities/rule';
import { CreateRuleForm } from '@/src/features/create-rule';
import { EditRuleButton } from '@/src/features/update-rule';
import { DeleteRuleButton } from '@/src/features/delete-rule';
import { IconAlertCircle, IconPlus } from '@tabler/icons-react';
import { useStaggerAnimation } from '@/src/shared/lib';

export default function RulesPage() {
    const { data: rules, isLoading, error } = useRules();
    const [opened, { open, close }] = useDisclosure(false);
    const listRef = useStaggerAnimation('tr');

    return (
        <div>
            <Group justify="space-between" mb="lg">
                <Title order={2}>Filter Rules</Title>
                <Button leftSection={<IconPlus size={16} />} onClick={open}>Add Rule</Button>
            </Group>

            <Modal opened={opened} onClose={close} title="Create New Rule">
                <CreateRuleForm onSuccess={close} />
            </Modal>

            {isLoading && <Loader />}
            
            {error && (
                <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                    Failed to load filter rules. Ensure the backend is running.
                </Alert>
            )}

            {!isLoading && !error && (
                <Card p="0">
                    <Table highlightOnHover verticalSpacing="sm">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Pattern / Description</Table.Th>
                                <Table.Th>Action</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Created</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody ref={listRef as any}>
                            {rules?.length === 0 ? (
                                <Table.Tr>
                                    <Table.Td colSpan={5} style={{ textAlign: 'center' }}>
                                        No rules found.
                                    </Table.Td>
                                </Table.Tr>
                            ) : (
                                rules?.map((rule) => (
                                    <RuleRow 
                                        key={rule.id} 
                                        rule={rule} 
                                        actions={
                                            <>
                                                <EditRuleButton rule={rule} />
                                                <DeleteRuleButton id={rule.id} />
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

