export interface Provider {
    id: string;
    alias: string;
    url: string;
    expires_at: string | null;
    traffic_total_gb: number;
    traffic_used_gb: number;
    last_fetched_at: string | null;
    group_id: string | null;
    is_active: boolean;
    created_at: string;
    outbound_count: number;
    auto_refresh: boolean;
}

export interface ProviderCreate {
    alias: string;
    url: string;
    group_id?: string | null;
    auto_refresh?: boolean;
}

export interface ProviderUpdate {
    alias?: string | null;
    url?: string | null;
    expires_at?: string | null;
    traffic_total_gb?: number | null;
    traffic_used_gb?: number | null;
    group_id?: string | null;
    is_active?: boolean | null;
}
