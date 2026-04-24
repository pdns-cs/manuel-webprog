import { useState } from 'react';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

const drawerWidth = 280;

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: DashboardRoundedIcon },
  { label: 'Reports', to: '/dashboard/reports', icon: DescriptionRoundedIcon },
  { label: 'Users', to: '/dashboard/users', icon: GroupRoundedIcon },
];

function DashLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #0f172a 0%, #172554 100%)',
        color: '#e2e8f0',
      }}
    >
      <Box sx={{ px: 3, py: 3 }}>
        <Typography variant="overline" sx={{ letterSpacing: '0.18em', color: '#93c5fd' }}>
          Admin Panel
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Manuel Dashboard
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: '#cbd5e1' }}>
          Access your overview, reports, and users from one place.
        </Typography>
      </Box>

      <List sx={{ px: 2 }}>
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <ListItemButton
              key={item.to}
              component={NavLink}
              to={item.to}
              end={item.to === '/dashboard'}
              onClick={() => setMobileOpen(false)}
              sx={{
                mb: 1,
                borderRadius: 3,
                color: '#cbd5e1',
                '&.active': {
                  backgroundColor: 'rgba(148, 163, 184, 0.18)',
                  color: '#f8fafc',
                },
                '&.active .MuiListItemIcon-root': {
                  color: '#bfdbfe',
                },
                '&:hover': {
                  backgroundColor: 'rgba(148, 163, 184, 0.12)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: '#94a3b8' }}>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: 'auto', px: 3, py: 3 }}>
        <Box
          sx={{
            borderRadius: 4,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Quick Access
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: '#cbd5e1' }}>
            Use the sidebar to jump straight into your dashboard workspace.
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#eef2ff' }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
          backgroundColor: 'rgba(255, 255, 255, 0.78)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuRoundedIcon />
            </IconButton>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#4338ca', fontWeight: 700 }}>
                Dashboard
              </Typography>
              <Typography variant="h6" sx={{ color: '#0f172a', fontWeight: 700 }}>
                Workspace Navigation
              </Typography>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 0 },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 0 },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default DashLayout;
