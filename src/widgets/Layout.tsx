'use client';

import { AppShell, Burger, Group, NavLink, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoutButton } from '@/src/features/auth';
import { PageTransition } from '@/src/shared/ui';
import { 
    IconLayoutDashboard, 
    IconServer, 
    IconUsers, 
    IconFolder, 
    IconFilter 
} from '@tabler/icons-react';

export function Layout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();
    const pathname = usePathname();

    const links = [
        { label: 'Dashboard', href: '/', icon: <IconLayoutDashboard size={20} stroke={1.5} /> },
        { label: 'Providers', href: '/providers', icon: <IconServer size={20} stroke={1.5} /> },
        { label: 'Users', href: '/users', icon: <IconUsers size={20} stroke={1.5} /> },
        { label: 'Groups', href: '/groups', icon: <IconFolder size={20} stroke={1.5} /> },
        { label: 'Rules', href: '/rules', icon: <IconFilter size={20} stroke={1.5} /> },
    ];

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 250,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="xl"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <Text 
                            size="lg" 
                            fw={700} 
                            variant="gradient" 
                            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                        >
                            VPN Admin
                        </Text>
                    </Group>
                    <LogoutButton />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                {links.map((link) => (
                    <NavLink
                        key={link.href}
                        component={Link}
                        href={link.href}
                        label={link.label}
                        leftSection={link.icon}
                        active={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))}
                    />
                ))}
            </AppShell.Navbar>

            <AppShell.Main>
                <PageTransition>
                    {children}
                </PageTransition>
            </AppShell.Main>
        </AppShell>
    );
}
