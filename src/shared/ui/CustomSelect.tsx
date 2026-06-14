'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Text, UnstyledButton, Collapse, Paper, ScrollArea, Group } from '@mantine/core';
import { IconChevronDown, IconCheck } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SelectOption {
    value: string;
    label: string;
}

interface CustomSelectProps {
    label?: string;
    placeholder?: string;
    data: SelectOption[];
    value?: string | null;
    onChange: (value: string | null) => void;
    error?: React.ReactNode;
    clearable?: boolean;
}

export function CustomSelect({ label, placeholder, data, value, onChange, error, clearable }: CustomSelectProps) {
    const [opened, setOpened] = useState(false);
    const [isMobile, setIsDesktop] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkIsDesktop = () => setIsDesktop(window.innerWidth < 768);
        checkIsDesktop();
        window.addEventListener('resize', checkIsDesktop);
        return () => window.removeEventListener('resize', checkIsDesktop);
    }, []);

    const selectedOption = data.find(opt => opt.value === value);

    const handleSelect = (val: string) => {
        if (clearable && val === value) {
            onChange(null);
        } else {
            onChange(val);
        }
        setOpened(false);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpened(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Box ref={containerRef} style={{ position: 'relative', width: '100%' }}>
            {label && (
                <Text size="13px" fw={500} c="var(--mantine-color-dark-1)" mb={8}>
                    {label}
                </Text>
            )}

            <UnstyledButton
                onClick={() => setOpened(!opened)}
                style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 16px',
                    borderRadius: '8px',
                    backgroundColor: error ? 'rgba(255, 107, 107, 0.1)' : 'var(--mantine-color-dark-5)',
                    border: error ? '1px solid #ff6b6b' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                    if (!error) e.currentTarget.style.backgroundColor = 'var(--mantine-color-dark-4)';
                }}
                onMouseLeave={(e) => {
                    if (!error) e.currentTarget.style.backgroundColor = 'var(--mantine-color-dark-5)';
                }}
            >
                <Text size="sm" c={selectedOption ? 'white' : 'dark.3'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <motion.div animate={{ rotate: opened ? 180 : 0 }}>
                    <IconChevronDown size={16} color="var(--mantine-color-dark-2)" />
                </motion.div>
            </UnstyledButton>

            <AnimatePresence>
                {opened && (
                    <motion.div
                        initial={{ opacity: 0, y: isMobile ? 10 : -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: isMobile ? 10 : -10, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: isMobile ? 'calc(100% + 8px)' : 'auto',
                            top: isMobile ? 'auto' : 'calc(100% + 8px)',
                            zIndex: 2000,
                            backgroundColor: 'var(--mantine-color-dark-6)',
                            borderRadius: '12px',
                            boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
                            overflow: 'hidden',
                            border: '1px solid var(--mantine-color-dark-4)',
                        }}
                    >
                        <ScrollArea.Autosize mah={200} type="auto">
                            <Box p={4}>
                                {data.length === 0 ? (
                                    <Text p="sm" size="xs" ta="center" c="dimmed">No options</Text>
                                ) : (
                                    data.map((opt) => (
                                        <UnstyledButton
                                            key={opt.value}
                                            onClick={() => handleSelect(opt.value)}
                                            style={{
                                                width: '100%',
                                                padding: '10px 12px',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                backgroundColor: value === opt.value ? 'var(--mantine-color-dark-4)' : 'transparent',
                                                transition: 'background-color 0.1s ease',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (value !== opt.value) e.currentTarget.style.backgroundColor = 'var(--mantine-color-dark-5)';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (value !== opt.value) e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            <Text size="sm" color="white">{opt.label}</Text>
                                            {value === opt.value && (
                                                <IconCheck size={14} color="var(--mantine-color-brand-5)" stroke={3} />
                                            )}
                                        </UnstyledButton>
                                    ))
                                )}
                            </Box>
                        </ScrollArea.Autosize>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <Text size="12px" fw={500} c="#ff8787" mt={6}>
                    {error}
                </Text>
            )}
        </Box>
    );
}
