import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { GROUP_QUERY_KEY, SubscriptionGroupCreate, SubscriptionGroup } from '@/src/entities/group';
import toast from 'react-hot-toast';

export const useCreateGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newGroup: SubscriptionGroupCreate) => {
            const { data } = await apiClient.post<SubscriptionGroup>('/api/admin/subscription-groups', newGroup);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY });
            toast.success('Group created successfully');
        },
        onError: () => {
            toast.error('Failed to create group');
        },
    });
};
