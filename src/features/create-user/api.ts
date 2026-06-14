import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { USER_QUERY_KEY, UserCreate, User } from '@/src/entities/user';
import toast from 'react-hot-toast';

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: UserCreate) => {
            const { data } = await apiClient.post<User>('/api/admin/users', newUser);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
            toast.success('User created successfully');
        },
        onError: () => {
            toast.error('Failed to create user');
        },
    });
};
