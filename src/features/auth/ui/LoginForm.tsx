'use client';

import { TextInput, Button, Paper, Title, Container, Box, Text, Group, ActionIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { setToken } from '@/src/shared/lib/token';
import toast from 'react-hot-toast';
import { IconShieldLock } from '@tabler/icons-react';

export function LoginForm() {
    const router = useRouter();

    const form = useForm({
        initialValues: {
            token: '',
        },
        validate: {
            token: (value) => (value.trim().length > 0 ? null : 'Admin token is required'),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        setToken(values.token);
        toast.success('Successfully logged in');
        router.push('/');
    };

    return (
        <Box 
            style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'var(--mantine-color-dark-7)'
            }}
        >
            <Container size={400} px="md">
                <Box ta="center" mb={32}>
                    <Group justify="center" mb="md">
                        <Box
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 12,
                                background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 16px rgba(79, 70, 229, 0.25)',
                            }}
                        >
                            <IconShieldLock size={28} color="#fff" stroke={2} />
                        </Box>
                    </Group>
                    <Title order={2} size="24px" fw={600}>Спиздить<span style={{ color: '#818cf8' }}>.всё</span></Title>
                    <Text size="sm" c="dimmed" mt={4}>Enter your admin token to continue</Text>
                </Box>

                <Paper shadow="xl" p={32} radius="lg">
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <TextInput
                            label="Admin Token"
                            placeholder="Enter your bearer token"
                            required
                            type="password"
                            {...form.getInputProps('token')}
                        />
                        <Button fullWidth mt={24} type="submit" size="md">
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}
