export interface FilterRule {
    id: string;
    description: string;
    pattern: string;
    action: 'block' | 'allow';
    is_active: boolean;
    created_at: string;
}

export interface FilterRuleCreate {
    description?: string;
    pattern: string;
    action?: 'block' | 'allow';
    is_active?: boolean;
}

export interface FilterRuleUpdate {
    description?: string | null;
    pattern?: string | null;
    action?: 'block' | 'allow' | null;
    is_active?: boolean | null;
}
