import ProvidersPage from '@/src/views/ProvidersPage';

export default async function Page({ params }: { params: Promise<{ groupId: string }> }) {
    const { groupId } = await params;
    // Treat the string 'ungrouped' as null, otherwise pass the actual ID string
    const resolvedGroupId = groupId === 'ungrouped' ? null : groupId;
    
    return <ProvidersPage groupId={resolvedGroupId} />;
}
