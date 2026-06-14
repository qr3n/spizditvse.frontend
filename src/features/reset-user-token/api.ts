import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/src/shared/api';
import { USER_QUERY_KEY } from '@/src/entities/user';

export const useResetUserToken = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userId: string) => {
            const { data } = await apiClient.post(`/api/admin/users/${userId}/reset-token`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
        },
    });
};
