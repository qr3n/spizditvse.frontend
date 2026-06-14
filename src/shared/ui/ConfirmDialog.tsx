'use client';

import React from 'react';
import { Box, Text, Button, Stack, Group } from '@mantine/core';
import { Drawer } from './Drawer';

interface ConfirmDialogProps {
    opened: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    color?: string;
}

export function ConfirmDialog({
    opened,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Delete',
    cancelLabel = 'Cancel',
    loading = false,
    color = 'red.6'
}: ConfirmDialogProps) {
    return (
        <Drawer opened={opened} onClose={onClose} title={title}>
            <Box>
                <Text size="sm" c="dimmed" mb="xl">
                    {message}
                </Text>
                
                {/* Mobile: Stack buttons vertically. Desktop: Group them horizontally. */}
                <Stack gap="sm" hiddenFrom="sm">
                    <Button 
                        color={color} 
                        onClick={onConfirm} 
                        loading={loading}
                        fullWidth
                        style={color === 'red.6' ? { backgroundColor: 'var(--mantine-color-red-6) !important' } : {}}
                    >
                        {confirmLabel}
                    </Button>
                    <Button 
                        variant="subtle" 
                        color="gray" 
                        onClick={onClose} 
                        disabled={loading}
                        fullWidth
                    >
                        {cancelLabel}
                    </Button>
                </Stack>

                <Group justify="flex-end" gap="md" visibleFrom="sm">
                    <Button 
                        variant="subtle" 
                        color="gray" 
                        onClick={onClose} 
                        disabled={loading}
                    >
                        {cancelLabel}
                    </Button>
                    <Button 
                        color={color} 
                        onClick={onConfirm} 
                        loading={loading}
                        style={color === 'red.6' ? { backgroundColor: 'var(--mantine-color-red-6) !important' } : {}}
                    >
                        {confirmLabel}
                    </Button>
                </Group>
            </Box>
        </Drawer>
    );
}
