import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { GROUP_QUERY_KEY } from '@/src/entities/group';
import toast from 'react-hot-toast';

export const useDeleteGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await apiClient.delete(`/api/admin/subscription-groups/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY });
            toast.success('Group deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete group');
        },
    });
};
