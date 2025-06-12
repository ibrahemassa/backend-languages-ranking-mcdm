// import { ReactNode } from 'react';
import type { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #1e1e2e 0%, #181825 100%)' }}>
      <AppBar position="static" elevation={0} sx={{
        background: 'linear-gradient(90deg, #89b4fa 0%, #cba6f7 100%)',
        boxShadow: '0 4px 32px 0 rgba(137, 180, 250, 0.10)',
        borderBottom: '2px solid #b4befe',
        backdropFilter: 'blur(8px)',
      }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: '-0.02em', color: '#1e1e2e', textShadow: '0 2px 8px #b4befe44' }}>
            Decision Making Tool
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1, borderRadius: 6, background: 'rgba(49,50,68,0.7)', boxShadow: '0 8px 32px 0 rgba(24,24,37,0.25)', backdropFilter: 'blur(12px)', p: { xs: 2, md: 4 } }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 
