import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { PROVIDER_QUERY_KEY, ProviderUpdate, Provider } from '@/src/entities/provider';

export const useUpdateProvider = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: ProviderUpdate }) => {
            const res = await apiClient.patch<Provider>(`/api/admin/provider-subs/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROVIDER_QUERY_KEY });
        },
    });
};
