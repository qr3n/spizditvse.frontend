'use client';

import { AppShell, Burger, Group, NavLink, Text, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoutButton } from '@/src/features/auth';
import {
    IconLayoutDashboard,
    IconServer,
    IconUsers,
    IconFolder,
    IconFilter,
    IconShield
} from '@tabler/icons-react';

const links = [
    { label: 'Dashboard', href: '/', icon: IconLayoutDashboard },
    { label: 'Providers', href: '/providers', icon: IconServer },
    { label: 'Users', href: '/users', icon: IconUsers },
    { label: 'Groups', href: '/groups', icon: IconFolder },
    { label: 'Rules', href: '/rules', icon: IconFilter },
];

export function Layout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();
    const pathname = usePathname();

    return (
        <AppShell
            header={{ height: 64 }}
            navbar={{
                width: 260,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="xl"
            styles={{
                header: {
                    backgroundColor: 'var(--mantine-color-dark-7)',
                    borderBottom: 'none',
                },
                navbar: {
                    backgroundColor: 'var(--mantine-color-dark-7)',
                    borderRight: 'none',
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                },
                main: {
                    backgroundColor: 'var(--mantine-color-dark-7)',
                    minHeight: '100vh',
                },
            }}
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group gap="sm">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="var(--mantine-color-dark-0)" />
                        <Group gap={12} align="center">
                            <Box
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 10,
                                    background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)',
                                }}
                            >
                                <IconShield size={18} color="#fff" stroke={2.5} />
                            </Box>
                            <Text
                                size="lg"
                                fw={700}
                                color="var(--mantine-color-white)"
                                style={{ letterSpacing: '-0.02em' }}
                            >
                                Спиздить.всё
                            </Text>
                        </Group>
                    </Group>
                    <LogoutButton />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar>
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = link.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(link.href);
                    return (
                        <NavLink
                            key={link.href}
                            component={Link}
                            href={link.href}
                            label={link.label}
                            leftSection={<Icon size={20} stroke={isActive ? 2 : 1.5} />}
                            active={isActive}
                            onClick={() => opened && toggle()}
                        />
                    );
                })}
            </AppShell.Navbar>

            <AppShell.Main>
                <Box maw={1200} mx="auto">
                    {children}
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}
