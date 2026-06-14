import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { Provider } from '../types';

export const PROVIDER_QUERY_KEY = ['providers'];

export const getProviders = async (): Promise<Provider[]> => {
    const { data } = await apiClient.get<Provider[]>('/api/admin/provider-subs');
    return data;
};

export const useProviders = () => {
    return useQuery({
        queryKey: PROVIDER_QUERY_KEY,
        queryFn: getProviders,
    });
};
