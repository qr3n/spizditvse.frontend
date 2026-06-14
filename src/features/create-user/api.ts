import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { USER_QUERY_KEY, UserCreate, User } from '@/src/entities/user';

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: UserCreate) => {
            const { data } = await apiClient.post<User>('/api/admin/users', newUser);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
        },
    });
};
