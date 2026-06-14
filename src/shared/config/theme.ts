import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'brand',
  fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '600',
  },
  defaultRadius: 'md',
  colors: {
    brand: [
      '#eef2ff',
      '#e0e7ff',
      '#c7d2fe',
      '#a5b4fc',
      '#818cf8',
      '#6366f1',
      '#4f46e5',
      '#4338ca',
      '#3730a3',
      '#312e81',
    ],
    red: [
      '#fff5f5',
      '#ffe3e3',
      '#ffc9c9',
      '#ffa8a8',
      '#ff8787',
      '#ff6b6b',
      '#fa5252',
      '#f03e3e',
      '#e03131',
      '#c92a2a',
    ],
    dark: [
      '#ffffff',
      '#e3e3e3',
      '#b4b7b5',
      '#8e918f',
      '#2d2f31',
      '#25262b',
      '#1a1b1e',
      '#0b0b0c',
      '#000000',
      '#000000',
    ],
  },
  shadows: {
    xs: '0 1px 3px rgba(0,0,0,0.3)',
    sm: '0 4px 12px rgba(0,0,0,0.4)',
    md: '0 12px 24px -4px rgba(0,0,0,0.5)',
    lg: '0 24px 48px -8px rgba(0,0,0,0.6)',
    xl: '0 32px 64px -12px rgba(0,0,0,0.7)',
  },
  components: {
    Title: {
      styles: {
        root: {
          color: 'var(--mantine-color-white)',
        }
      }
    },
    Text: {
      styles: {
        root: {
          color: 'var(--mantine-color-dark-1)',
          '&[data-dimmed]': {
             color: 'var(--mantine-color-dark-2)',
          }
        }
      }
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'lg',
        withBorder: false,
      },
      styles: {
        root: {
          backgroundColor: 'var(--mantine-color-dark-6)',
          border: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 'var(--mantine-shadow-md)',
          }
        }
      }
    },
    Button: {
      defaultProps: {
        radius: 'xl',
        fw: 700,
        color: 'brand.5',
      },
      styles: {
        root: {
          color: '#ffffff !important',
          border: 'none',
          backgroundColor: 'var(--mantine-color-brand-5) !important',
          textShadow: '0 1px 2px rgba(0,0,0,0.2)',
          transition: 'all 0.15s ease',
          '&:hover': {
             backgroundColor: 'var(--mantine-color-brand-4) !important',
             transform: 'translateY(-1px)',
             boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
          },
          '&:active': {
            transform: 'scale(0.96)',
          }
        }
      }
    },
    ActionIcon: {
      defaultProps: {
        radius: 'md', // Modern squared look
        size: 36, // Standard medium size
        variant: 'subtle',
        color: 'gray',
      },
      styles: {
        root: {
          transition: 'transform 0.1s ease, background-color 0.1s ease',
          '&:hover': {
             backgroundColor: 'var(--mantine-color-dark-5)',
          },
          '&:active': {
            transform: 'scale(0.92)',
          }
        }
      }
    },
    Table: {
      styles: {
        table: {
          borderCollapse: 'collapse',
          backgroundColor: 'transparent',
          color: 'var(--mantine-color-dark-1)',
        },
        th: {
          borderBottom: 'none',
          color: 'var(--mantine-color-dark-2)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontWeight: 700,
          padding: '16px',
        },
        td: {
          borderBottom: '1px solid var(--mantine-color-dark-4)',
          padding: '16px',
          color: 'inherit',
        },
        tr: {
          transition: 'background-color 0.15s ease',
          '&:hover': {
             backgroundColor: 'var(--mantine-color-dark-5)',
          }
        }
      }
    },
    NavLink: {
      styles: {
        root: {
          borderRadius: 'var(--mantine-radius-xl)',
          marginBottom: '4px',
          transition: 'all 0.15s ease',
          padding: '12px 16px',
          color: 'var(--mantine-color-dark-1)',
          '&:hover': {
             backgroundColor: 'var(--mantine-color-dark-5)',
          },
          '&[data-active]': {
             backgroundColor: 'var(--mantine-color-dark-5)',
             color: '#ffffff',
          },
          '&[data-active]:hover': {
             backgroundColor: 'var(--mantine-color-dark-4)',
          }
        },
        label: {
          fontWeight: 600,
          fontSize: '14px',
        },
        section: {
           color: 'inherit',
        }
      }
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
      styles: {
        input: {
          backgroundColor: 'var(--mantine-color-dark-5)',
          border: 'none',
          color: '#ffffff',
          '&:focus': {
            backgroundColor: 'var(--mantine-color-dark-4)',
          },
          '&[data-error]': {
             backgroundColor: 'rgba(255, 107, 107, 0.1) !important',
             border: '1px solid #ff6b6b !important',
          }
        },
        label: {
          marginBottom: '8px',
          fontWeight: 500,
          fontSize: '13px',
          color: 'var(--mantine-color-dark-1)',
        },
        error: {
           color: '#ff8787',
           fontSize: '12px',
           marginTop: '6px',
           fontWeight: 500,
        }
      }
    },
    Select: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
      styles: {
        input: {
          backgroundColor: 'var(--mantine-color-dark-5)',
          border: 'none',
          color: '#ffffff',
          '&:focus': {
            backgroundColor: 'var(--mantine-color-dark-4)',
          },
          '&[data-error]': {
             backgroundColor: 'rgba(255, 107, 107, 0.1) !important',
             border: '1px solid #ff6b6b !important',
          }
        },
        label: {
          marginBottom: '8px',
          fontWeight: 500,
          fontSize: '13px',
          color: 'var(--mantine-color-dark-1)',
        },
        error: {
           color: '#ff8787',
           fontSize: '12px',
           marginTop: '6px',
           fontWeight: 500,
        }
      }
    },
    Paper: {
       defaultProps: {
          radius: 'lg',
          bg: 'dark.6',
          withBorder: false,
       },
       styles: {
          root: {
             border: 'none !important',
          }
       }
    }
  },
});
