import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { GROUP_QUERY_KEY, SubscriptionGroupCreate, SubscriptionGroup } from '@/src/entities/group';

export const useUpdateGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: SubscriptionGroupCreate }) => {
            const res = await apiClient.patch<SubscriptionGroup>(`/api/admin/subscription-groups/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY });
        },
    });
};
