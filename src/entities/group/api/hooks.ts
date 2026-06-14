import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { SubscriptionGroup } from '../types';

export const GROUP_QUERY_KEY = ['groups'];

export const getGroups = async (): Promise<SubscriptionGroup[]> => {
    const { data } = await apiClient.get<SubscriptionGroup[]>('/api/admin/subscription-groups');
    return data;
};

export const useGroups = () => {
    return useQuery({
        queryKey: GROUP_QUERY_KEY,
        queryFn: getGroups,
    });
};
