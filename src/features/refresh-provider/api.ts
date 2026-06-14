import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { PROVIDER_QUERY_KEY } from '@/src/entities/provider';

export const useRefreshProvider = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (subId: string) => {
            const { data } = await apiClient.post(`/api/admin/provider-subs/${subId}/refresh`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROVIDER_QUERY_KEY });
        },
    });
};
