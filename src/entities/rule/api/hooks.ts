import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { FilterRule } from '../types';

export const RULE_QUERY_KEY = ['filter-rules'];

export const getRules = async (): Promise<FilterRule[]> => {
    const { data } = await apiClient.get<FilterRule[]>('/api/admin/filter-rules');
    return data;
};

export const useRules = () => {
    return useQuery({
        queryKey: RULE_QUERY_KEY,
        queryFn: getRules,
    });
};
