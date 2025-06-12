import { createTheme } from '@mui/material/styles';

// Catppuccin Mocha color palette
const catppuccinColors = {
  rosewater: '#f5e0dc',
  flamingo: '#f2cdcd',
  pink: '#f5c2e7',
  mauve: '#cba6f7',
  red: '#f38ba8',
  maroon: '#eba0ac',
  peach: '#fab387',
  yellow: '#f9e2af',
  green: '#a6e3a1',
  teal: '#94e2d5',
  sky: '#89dceb',
  sapphire: '#74c7ec',
  blue: '#89b4fa',
  lavender: '#b4befe',
  text: '#cdd6f4',
  subtext1: '#bac2de',
  subtext0: '#a6adc8',
  overlay2: '#9399b2',
  overlay1: '#7f849c',
  overlay0: '#6c7086',
  surface2: '#585b70',
  surface1: '#45475a',
  surface0: '#313244',
  base: '#1e1e2e',
  mantle: '#181825',
  crust: '#11111b',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: catppuccinColors.lavender,
      light: catppuccinColors.pink,
      dark: catppuccinColors.mauve,
    },
    secondary: {
      main: catppuccinColors.pink,
      light: catppuccinColors.rosewater,
      dark: catppuccinColors.mauve,
    },
    background: {
      default: catppuccinColors.base,
      paper: catppuccinColors.mantle,
    },
    text: {
      primary: catppuccinColors.text,
      secondary: catppuccinColors.subtext1,
    },
    error: {
      main: catppuccinColors.red,
    },
    warning: {
      main: catppuccinColors.peach,
    },
    success: {
      main: catppuccinColors.teal,
    },
    info: {
      main: catppuccinColors.sky,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
      color: catppuccinColors.lavender,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: catppuccinColors.lavender,
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: catppuccinColors.lavender,
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: catppuccinColors.lavender,
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: catppuccinColors.lavender,
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: catppuccinColors.lavender,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(180, 190, 254, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(180, 190, 254, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
            '&.Mui-focused': {
              borderColor: catppuccinColors.lavender,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(180, 190, 254, 0.15)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${catppuccinColors.surface0}`,
        },
      },
    },
  },
}); 