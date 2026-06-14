import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { RULE_QUERY_KEY, FilterRuleCreate, FilterRule } from '@/src/entities/rule';
import toast from 'react-hot-toast';

export const useCreateRule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newRule: FilterRuleCreate) => {
            const { data } = await apiClient.post<FilterRule>('/api/admin/filter-rules', newRule);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: RULE_QUERY_KEY });
            toast.success('Rule created successfully');
        },
        onError: () => {
            toast.error('Failed to create rule');
        },
    });
};
