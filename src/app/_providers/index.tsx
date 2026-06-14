'use client';

import { MantineProvider } from '@mantine/core';
import { ReactQueryProvider } from './ReactQueryProvider';
import { theme } from '@/src/shared/config/theme';
import { Toaster } from 'react-hot-toast';

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <MantineProvider theme={theme} forceColorScheme="dark">
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            borderRadius: '12px',
                            border: '1px solid var(--mantine-color-dark-4)',
                            backgroundColor: '#1a1b1e', // Deep charcoal/gray background
                            color: '#ffffff', // Pure white text
                            boxShadow: '0 12px 24px -4px rgba(0,0,0,0.5)',
                            fontFamily: '"Google Sans Text", sans-serif',
                            fontSize: '14px',
                            padding: '12px 20px',
                        },
                        success: {
                            iconTheme: { primary: '#6366f1', secondary: '#fff' },
                        },
                        error: {
                            iconTheme: { primary: '#ff6b6b', secondary: '#fff' },
                        }
                    }}
                />
                {children}
            </MantineProvider>
        </ReactQueryProvider>
    );
}
