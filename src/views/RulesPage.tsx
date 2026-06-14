'use client';

import { Title, Table, Loader, Alert, Card, Button, Group, Text, Box, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRules, RuleRow, RuleMobileCard } from '@/src/entities/rule';
import { CreateRuleForm } from '@/src/features/create-rule';
import { EditRuleButton } from '@/src/features/update-rule';
import { DeleteRuleButton } from '@/src/features/delete-rule';
import { IconAlertCircle, IconPlus, IconFilter } from '@tabler/icons-react';
import { Drawer } from '@/src/shared/ui';

export default function RulesPage() {
    const { data: rules, isLoading, error } = useRules();
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Box maw={1100}>
            <Group justify="space-between" mb="xl" align="flex-end">
                <Box>
                    <Title order={2} size="20px" fw={600}>Filter Rules</Title>
                    <Text size="sm" c="dimmed" mt={4}>
                        {rules ? `${rules.filter(r => r.is_active).length} of ${rules.length} active` : 'Control traffic with glob, CIDR, or regex rules'}
                    </Text>
                </Box>
                <Button
                    leftSection={<IconPlus size={15} stroke={2} />}
                    onClick={open}
                    size="sm"
                >
                    Add rule
                </Button>
            </Group>

            <Drawer opened={opened} onClose={close} title="Create rule">
                <CreateRuleForm onSuccess={close} />
            </Drawer>

            {isLoading && (
                <Center h={200}>
                    <Loader size="sm" color="blue" />
                </Center>
            )}

            {error && (
                <Alert icon={<IconAlertCircle size={16} />} color="red" radius="md" variant="light">
                    Failed to load filter rules. Ensure the backend is running.
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
                                        <Table.Th>Pattern / Description</Table.Th>
                                        <Table.Th>Action</Table.Th>
                                        <Table.Th>Status</Table.Th>
                                        <Table.Th>Created</Table.Th>
                                        <Table.Th>Actions</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {rules?.length === 0 ? (
                                        <Table.Tr>
                                            <Table.Td colSpan={5}>
                                                <Center py={40}>
                                                    <Box ta="center">
                                                        <IconFilter size={36} color="var(--mantine-color-dark-4)" stroke={1} />
                                                        <Text size="sm" c="dimmed" mt={8}>No rules yet</Text>
                                                    </Box>
                                                </Center>
                                            </Table.Td>
                                        </Table.Tr>
                                    ) : (
                                        rules?.map((rule) => (
                                            <RuleRow
                                                key={rule.id}
                                                rule={rule}
                                                actions={
                                                    <Group gap={4}>
                                                        <EditRuleButton rule={rule} />
                                                        <DeleteRuleButton id={rule.id} />
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
                        {rules?.length === 0 ? (
                            <Center py={40}>
                                <Box ta="center">
                                    <IconFilter size={36} color="var(--mantine-color-dark-4)" stroke={1} />
                                    <Text size="sm" c="dimmed" mt={8}>No rules yet</Text>
                                </Box>
                            </Center>
                        ) : (
                            rules?.map((rule) => (
                                <RuleMobileCard
                                    key={rule.id}
                                    rule={rule}
                                    actions={
                                        <Group gap={4}>
                                            <EditRuleButton rule={rule} />
                                            <DeleteRuleButton id={rule.id} />
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
