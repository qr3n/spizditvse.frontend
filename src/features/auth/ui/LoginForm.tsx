'use client';

import { TextInput, Button, Paper, Title, Container, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { setToken } from '@/src/shared/lib/token';

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
        router.push('/');
    };

    return (
        <Container size={420} my={40}>
            <Title ta="center" order={2}>
                VPN Admin Panel
            </Title>
            <Paper shadow="sm" p={40} mt={30} radius="xl">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        label="Admin Token"
                        placeholder="Enter your bearer token"
                        required
                        size="md"
                        radius="md"
                        type="password"
                        {...form.getInputProps('token')}
                    />
                    <Button fullWidth mt="xl" type="submit" size="md">
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
