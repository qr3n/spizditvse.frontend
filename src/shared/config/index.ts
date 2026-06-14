export const ENV = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://sub.hazeevpn.com',
    ADMIN_KEY: process.env.NEXT_PUBLIC_ADMIN_KEY || 'default-admin-key', // For testing purposes in browser. In real app, consider using cookies or BFF.
} as const;
