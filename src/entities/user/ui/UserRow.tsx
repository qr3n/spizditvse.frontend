'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { User } from '../types';
import { useClipboard } from '@mantine/hooks';

interface UserRowProps {
    user: User;
    actions?: React.ReactNode;
}

export function UserRow({ user, actions }: UserRowProps) {
    const clipboard = useClipboard({ timeout: 2000 });

    return (
        <tr className="mantine-Table-tr">
            <td className="mantine-Table-td">
                <div style={{ fontWeight: 500, color: 'var(--mantine-color-white)' }}>{user.name}</div>
            </td>
            <td className="mantine-Table-td">
                <span className={`mantine-Badge-root mantine-Badge-light`} style={{ 
                    backgroundColor: user.is_active ? 'rgba(45, 212, 191, 0.15)' : 'rgba(142, 145, 143, 0.15)',
                    color: user.is_active ? '#2dd4bf' : '#8e918f',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600
                }}>
                    {user.is_active ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td className="mantine-Table-td">
                {user.subscription_expires_at ? (
                    <span style={{ 
                        color: new Date(user.subscription_expires_at) < new Date() ? '#ff6b6b' : '#818cf8',
                        fontSize: '13px'
                    }}>
                        {new Date(user.subscription_expires_at).toLocaleDateString()}
                    </span>
                ) : (
                    <div style={{ color: 'var(--mantine-color-dark-3)', fontSize: '13px' }}>—</div>
                )}
            </td>
            <td className="mantine-Table-td">
                <Tooltip label={clipboard.copied ? 'Copied' : 'Copy Sub Link'} withArrow position="top">
                    <ActionIcon 
                        color={clipboard.copied ? 'teal' : 'gray'} 
                        onClick={() => clipboard.copy(user.sub_url)}
                    >
                        {clipboard.copied ? <IconCheck size={18} /> : <IconCopy size={18} stroke={1.5} />}
                    </ActionIcon>
                </Tooltip>
            </td>
            <td className="mantine-Table-td">{actions}</td>
        </tr>
    );
}
