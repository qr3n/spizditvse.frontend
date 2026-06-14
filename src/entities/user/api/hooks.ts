import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { User } from '../types';

export const USER_QUERY_KEY = ['users'];

export const getUsers = async (): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>('/api/admin/users');
    return data;
};

export const useUsers = () => {
    return useQuery({
        queryKey: USER_QUERY_KEY,
        queryFn: getUsers,
    });
};
