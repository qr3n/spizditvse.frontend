'use client';

import { MantineProvider } from '@mantine/core';
import { ReactQueryProvider } from './ReactQueryProvider';
import { theme } from '@/src/shared/config/theme';

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <MantineProvider theme={theme} defaultColorScheme="auto">
                {children}
            </MantineProvider>
        </ReactQueryProvider>
    );
}
