import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'dark',
  fontFamily: '"Google Sans", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily: '"Google Sans", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '500',
  },
  defaultRadius: 'md',
  colors: {
    gray: [
      '#f0f4f9', // 0: Body background
      '#e8eaed', // 1: Card background
      '#dadce0', // 2: Borders
      '#bdc1c6', // 3: Disabled
      '#9aa0a6', // 4
      '#80868b', // 5: Muted text
      '#5f6368', // 6: Secondary text
      '#3c4043', // 7: Main text
      '#202124', // 8: Headings
      '#1f1f1f', // 9
    ],
    dark: [
      '#e3e3e3', // 0: Title text
      '#c4c7c5', // 1: Main text
      '#8e918f', // 2: Muted text
      '#444746', // 3: Disabled
      '#3c3e40', // 4: Active Sidebar Background (Medium Gray)
      '#2d2f31', // 5: Hover Background (Darker Gray)
      '#1e1e20', // 6: Card Background
      '#131314', // 7: Body background
      '#000000', // 8
      '#000000', // 9
    ],
  },
  shadows: {
    xs: '0 1px 3px rgba(0,0,0,0.05)',
    sm: '0 4px 12px rgba(0,0,0,0.05)',
    md: '0 12px 24px -4px rgba(0,0,0,0.05)',
    lg: '0 24px 48px -8px rgba(0,0,0,0.05)',
    xl: '0 32px 64px -12px rgba(0,0,0,0.05)',
  },
  components: {
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        withBorder: false,
      },
      styles: {
        root: {
          overflow: 'hidden',
          transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: 'var(--mantine-shadow-md)',
          }
        }
      }
    },
    Button: {
      defaultProps: {
        radius: 'xl',
        fw: 500,
      },
      styles: {
        root: {
          transition: 'transform 0.15s ease, background-color 0.15s ease',
          '&:active': {
            transform: 'scale(0.97)',
          }
        }
      }
    },
    Badge: {
      defaultProps: {
        variant: 'light',
        radius: 'md',
        fw: 600,
      },
      styles: {
        root: {
          textTransform: 'none',
          padding: '4px 10px',
        }
      }
    },
    Table: {
      styles: {
        table: {
          borderCollapse: 'collapse',
        },
        th: {
          borderBottom: '1px solid var(--mantine-color-default-border)',
          color: 'var(--mantine-color-gray-6)',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontWeight: 700,
          padding: '16px',
        },
        td: {
          borderBottom: '1px solid var(--mantine-color-default-border)',
          padding: '16px',
        },
        tr: {
          transition: 'background-color 0.15s ease',
        }
      }
    },
    NavLink: {
      styles: {
        root: {
          borderRadius: 'var(--mantine-radius-xl)',
          marginBottom: '4px',
          transition: 'all 0.15s ease',
          padding: '10px 16px',
          '&:hover': {
             backgroundColor: 'var(--mantine-color-dark-5)',
          },
          '&[data-active]': {
             backgroundColor: 'var(--mantine-color-dark-4)',
             color: 'var(--mantine-color-white)',
          }
        },
        label: {
          fontWeight: 500,
          fontSize: '14px',
        },
        icon: {
          marginRight: '12px',
        }
      }
    },
    Paper: {
       defaultProps: {
          radius: 'md',
       }
    }
  },
});
