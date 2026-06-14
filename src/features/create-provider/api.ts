import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { PROVIDER_QUERY_KEY, ProviderCreate, Provider } from '@/src/entities/provider';
import toast from 'react-hot-toast';

export const useCreateProvider = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newProvider: ProviderCreate) => {
            const { data } = await apiClient.post<Provider>('/api/admin/provider-subs', newProvider);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROVIDER_QUERY_KEY });
            toast.success('Provider created successfully');
        },
        onError: () => {
            toast.error('Failed to create provider');
        },
    });
};
