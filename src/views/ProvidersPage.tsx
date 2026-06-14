'use client';

import { useMemo } from 'react';
import { Title, SimpleGrid, Loader, Alert, Button, Group, Card, Text, ActionIcon, Box, Center, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useProviders, ProviderCard } from '@/src/entities/provider';
import { useGroups } from '@/src/entities/group';
import { CreateProviderForm } from '@/src/features/create-provider';
import { RefreshProviderButton } from '@/src/features/refresh-provider';
import { EditProviderButton } from '@/src/features/update-provider';
import { DeleteProviderButton } from '@/src/features/delete-provider';
import { IconAlertCircle, IconPlus, IconArrowLeft, IconFolder, IconServer, IconBox } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { Drawer } from '@/src/shared/ui';

interface ProvidersPageProps {
    groupId?: string | null;
}

export default function ProvidersPage({ groupId }: ProvidersPageProps) {
    const { data: providers, isLoading: providersLoading, error: providersError } = useProviders();
    const { data: groups, isLoading: groupsLoading, error: groupsError } = useGroups();
    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter();

    const isLoading = providersLoading || groupsLoading;
    const error = providersError || groupsError;

    const groupStats = useMemo(() => {
        if (!providers) return { ungrouped: 0, byGroup: {} as Record<string, number> };
        const stats = { ungrouped: 0, byGroup: {} as Record<string, number> };
        providers.forEach(p => {
            if (p.group_id) {
                stats.byGroup[p.group_id] = (stats.byGroup[p.group_id] || 0) + 1;
            } else {
                stats.ungrouped++;
            }
        });
        return stats;
    }, [providers]);

    const filteredProviders = useMemo(() => {
        if (!providers || groupId === undefined) return [];
        if (groupId === null) return providers.filter(p => !p.group_id);
        return providers.filter(p => p.group_id === groupId);
    }, [providers, groupId]);

    const currentGroupName = useMemo(() => {
        if (groupId === undefined) return '';
        if (groupId === null) return 'Ungrouped';
        return groups?.find(g => g.id === groupId)?.name || 'Unknown Group';
    }, [groups, groupId]);

    if (isLoading) return (
        <Center h={200}>
            <Loader size="sm" color="blue" />
        </Center>
    );

    if (error) return (
        <Alert icon={<IconAlertCircle size={16} />} color="red" radius="md" variant="light">
            Failed to load data. Ensure the backend is running.
        </Alert>
    );

    return (
        <Box maw={1100}>
            <Group justify="space-between" mb="xl" align="flex-end">
                <Group gap="xs" align="center">
                    {groupId !== undefined && (
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={() => router.push('/providers')}
                            radius="md"
                            size="lg"
                        >
                            <IconArrowLeft size={20} stroke={1.5} />
                        </ActionIcon>
                    )}
                    <Box>
                        <Title order={2} size="20px" fw={600}>
                            {groupId === undefined ? 'Providers' : currentGroupName}
                        </Title>
                        <Text size="sm" c="dimmed" mt={4}>
                            {groupId === undefined
                                ? `${groups?.length || 0} groups · ${providers?.length || 0} providers total`
                                : `${filteredProviders.length} provider${filteredProviders.length !== 1 ? 's' : ''}`
                            }
                        </Text>
                    </Box>
                </Group>
                <Button
                    leftSection={<IconPlus size={15} stroke={2} />}
                    onClick={open}
                    size="sm"
                >
                    Add provider
                </Button>
            </Group>

            <Drawer opened={opened} onClose={close} title="Add provider">
                <CreateProviderForm onSuccess={close} />
            </Drawer>

            {groupId === undefined ? (
                // Groups view
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
                    {groups?.map(group => (
                        <Card
                            key={group.id}
                            p="lg"
                            onClick={() => router.push(`/providers/${group.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Group justify="space-between" align="center">
                                <Group gap="sm">
                                    <Box
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 8,
                                            backgroundColor: 'rgba(99, 102, 241, 0.15)', // Light indigo bg
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <IconFolder size={18} color="#818cf8" stroke={1.5} />
                                    </Box>
                                    <Box>
                                        <Text fw={600} size="sm">{group.name}</Text>
                                        <Text size="12px" c="dimmed">
                                            {groupStats.byGroup[group.id] || 0} providers
                                        </Text>
                                    </Box>
                                </Group>
                                <Badge variant="light" color="gray" size="sm">
                                    {groupStats.byGroup[group.id] || 0}
                                </Badge>
                            </Group>
                        </Card>
                    ))}

                    {/* Ungrouped */}
                    <Card
                        p="lg"
                        style={{
                            cursor: 'pointer',
                            border: '1px dashed var(--mantine-color-dark-4)',
                            backgroundColor: 'transparent',
                        }}
                        onClick={() => router.push('/providers/ungrouped')}
                    >
                        <Group justify="space-between" align="center">
                            <Group gap="sm">
                                <Box
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 8,
                                        backgroundColor: 'rgba(45, 212, 191, 0.15)', // Light teal bg
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                    <IconBox size={18} color="#2dd4bf" stroke={1.5} />
                                </Box>
                                <Box>
                                    <Text fw={600} size="sm">Ungrouped</Text>
                                    <Text size="12px" c="dimmed">{groupStats.ungrouped} providers</Text>
                                </Box>
                            </Group>
                            <Badge variant="light" color="gray" size="sm">
                                {groupStats.ungrouped}
                            </Badge>
                        </Group>
                    </Card>
                </SimpleGrid>
            ) : (
                // Providers list
                filteredProviders.length === 0 ? (
                    <Center h={200}>
                        <Box ta="center">
                            <IconServer size={36} color="var(--mantine-color-dark-4)" stroke={1} />
                            <Text size="sm" c="dimmed" mt={8}>No providers in this group</Text>
                        </Box>
                    </Center>
                ) : (
                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
                        {filteredProviders.map((provider) => (
                            <ProviderCard
                                key={provider.id}
                                provider={provider}
                                actions={
                                    <>
                                        <RefreshProviderButton subId={provider.id} />
                                        <EditProviderButton provider={provider} />
                                        <DeleteProviderButton id={provider.id} />
                                    </>
                                }
                            />
                        ))}
                    </SimpleGrid>
                )
            )}
        </Box>
    );
}
