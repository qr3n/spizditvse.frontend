'use client';

import { useMemo } from 'react';
import { Title, SimpleGrid, Loader, Alert, Button, Group, Modal, Card, Text, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useProviders, ProviderCard } from '@/src/entities/provider';
import { useGroups } from '@/src/entities/group';
import { CreateProviderForm } from '@/src/features/create-provider';
import { RefreshProviderButton } from '@/src/features/refresh-provider';
import { EditProviderButton } from '@/src/features/update-provider';
import { DeleteProviderButton } from '@/src/features/delete-provider';
import { IconAlertCircle, IconPlus, IconArrowLeft, IconFolder } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useStaggerAnimation } from '@/src/shared/lib';

interface ProvidersPageProps {
    groupId?: string | null; // undefined = groups list, null = ungrouped providers, string = specific group
}

export default function ProvidersPage({ groupId }: ProvidersPageProps) {
    const { data: providers, isLoading: providersLoading, error: providersError } = useProviders();
    const { data: groups, isLoading: groupsLoading, error: groupsError } = useGroups();
    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter();
    const groupsListRef = useStaggerAnimation('> *');
    const providersListRef = useStaggerAnimation('> *');

    const isLoading = providersLoading || groupsLoading;
    const error = providersError || groupsError;

    // Calculate provider counts per group
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
        return providers.filter(p => p.group_id === groupId);
    }, [providers, groupId]);

    const currentGroupName = useMemo(() => {
        if (groupId === undefined) return '';
        if (groupId === null) return 'Без группы (Ungrouped)';
        return groups?.find(g => g.id === groupId)?.name || 'Unknown Group';
    }, [groups, groupId]);

    if (isLoading) return <Loader />;
    if (error) return (
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
            Failed to load data. Ensure the backend is running.
        </Alert>
    );

    return (
        <div>
            <Group justify="space-between" mb="lg">
                <Group>
                    {groupId !== undefined && (
                        <ActionIcon variant="subtle" onClick={() => router.push('/providers')}>
                            <IconArrowLeft size={20} />
                        </ActionIcon>
                    )}
                    <Title order={2}>
                        {groupId === undefined ? 'Провайдеры (Группы)' : `Провайдеры: ${currentGroupName}`}
                    </Title>
                </Group>
                <Button leftSection={<IconPlus size={16} />} onClick={open}>Add Provider</Button>
            </Group>

            <Modal opened={opened} onClose={close} title="Add New Provider">
                <CreateProviderForm onSuccess={close} />
            </Modal>

            {groupId === undefined ? (
                // --- GROUPS VIEW ---
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} mt="md" ref={groupsListRef as any}>
                    {groups?.map(group => (
                        <Card 
                            key={group.id} 
                            p="xl" 
                            style={{ cursor: 'pointer' }}
                            onClick={() => router.push(`/providers/${group.id}`)}
                        >
                            <Group>
                                <IconFolder size={24} color="gray" />
                                <div>
                                    <Text fw={500}>{group.name}</Text>
                                    <Text size="sm" c="dimmed">{groupStats.byGroup[group.id] || 0} providers</Text>
                                </div>
                            </Group>
                        </Card>
                    ))}
                    <Card 
                        shadow="sm" 
                        padding="lg" 
                        radius="md" 
                        withBorder 
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push('/providers/ungrouped')}
                    >
                        <Group>
                            <IconFolder size={24} color="gray" />
                            <div>
                                <Text fw={500}>Без группы</Text>
                                <Text size="sm" c="dimmed">{groupStats.ungrouped} providers</Text>
                            </div>
                        </Group>
                    </Card>
                </SimpleGrid>
            ) : (
                // --- PROVIDERS LIST VIEW ---
                <>
                    {filteredProviders.length === 0 ? (
                        <Alert color="blue">В этой группе нет провайдеров.</Alert>
                    ) : (
                        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} mt="md" ref={providersListRef as any}>
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
                    )}
                </>
            )}
        </div>
    );
}

