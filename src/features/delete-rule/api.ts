import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { RULE_QUERY_KEY } from '@/src/entities/rule';
import toast from 'react-hot-toast';

export const useDeleteRule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await apiClient.delete(`/api/admin/filter-rules/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: RULE_QUERY_KEY });
            toast.success('Rule deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete rule');
        },
    });
};
