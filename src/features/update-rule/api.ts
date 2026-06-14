import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { RULE_QUERY_KEY, FilterRuleUpdate, FilterRule } from '@/src/entities/rule';

export const useUpdateRule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: FilterRuleUpdate }) => {
            const res = await apiClient.patch<FilterRule>(`/api/admin/filter-rules/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: RULE_QUERY_KEY });
        },
    });
};
