'use client';

import { Drawer as Vaul } from 'vaul';
import { Box, Title, ActionIcon, ScrollArea } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DrawerProps {
    opened: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Drawer({ opened, onClose, title, children }: DrawerProps) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
        checkIsDesktop();
        window.addEventListener('resize', checkIsDesktop);
        return () => window.removeEventListener('resize', checkIsDesktop);
    }, []);

    // Desktop Modal Version
    if (isDesktop) {
        return (
            <AnimatePresence>
                {opened && (
                    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                        {/* Overlay - BLUR REMOVED */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            }}
                        />
                        
                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 350, duration: 0.2 }}
                            style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: '500px',
                                backgroundColor: 'var(--mantine-color-dark-6)',
                                borderRadius: '16px',
                                boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.5)',
                                outline: 'none',
                                overflow: 'hidden'
                            }}
                        >
                            <Box p="xl">
                                <Box mb="lg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Title order={3} size="20px" fw={600}>{title}</Title>
                                    <ActionIcon variant="subtle" color="gray" onClick={onClose} radius="xl" size="lg">
                                        <IconX size={20} />
                                    </ActionIcon>
                                </Box>

                                <ScrollArea.Autosize mah="80vh" type="auto">
                                    <Box pb="xs">
                                        {children}
                                    </Box>
                                </ScrollArea.Autosize>
                            </Box>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        );
    }

    // Mobile Drawer Version (Vaul)
    return (
        <Vaul.Root open={opened} onOpenChange={(open) => !open && onClose()}>
            <Vaul.Portal>
                {/* Overlay - BLUR REMOVED */}
                <Vaul.Overlay 
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        zIndex: 1000,
                    }}
                />
                <Vaul.Content
                    className="vaul-content"
                    style={{
                        backgroundColor: 'var(--mantine-color-dark-6)',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '24px 24px 0 0',
                        height: 'auto',
                        maxHeight: '94%',
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1001,
                        outline: 'none',
                    }}
                >
                    <Box p="md" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <Box
                            style={{
                                width: 40,
                                height: 4,
                                backgroundColor: 'var(--mantine-color-dark-4)',
                                borderRadius: 10,
                                margin: '0 auto 16px',
                                cursor: 'grab',
                            }}
                        />
                        
                        <Box mb="xl" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Vaul.Title asChild>
                                <Title order={3}>{title}</Title>
                            </Vaul.Title>
                            <ActionIcon variant="subtle" color="gray" onClick={onClose} radius="xl" size="xl">
                                <IconX size={24} />
                            </ActionIcon>
                        </Box>

                        <ScrollArea.Autosize mah="calc(90vh - 100px)" type="scroll">
                            <Box pb="xl">
                                {children}
                            </Box>
                        </ScrollArea.Autosize>
                    </Box>
                </Vaul.Content>
            </Vaul.Portal>
        </Vaul.Root>
    );
}
