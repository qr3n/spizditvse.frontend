export interface User {
    id: string;
    name: string;
    token: string;
    sub_url: string;
    check_url: string;
    is_active: boolean;
    subscription_expires_at: string | null;
    created_at: string;
}

export interface UserCreate {
    name: string;
    subscription_expires_at?: string | null;
    is_active?: boolean;
}
