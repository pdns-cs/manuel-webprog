import { useState } from 'react';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  AppBar,
  Box,
  Button,
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
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 280;

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: DashboardRoundedIcon },
  { label: 'Reports', to: '/dashboard/reports', icon: DescriptionRoundedIcon },
  { label: 'Articles', to: '/dashboard/articles', icon: ArticleRoundedIcon },
  { label: 'Users', to: '/dashboard/users', icon: GroupRoundedIcon, roles: ['admin'] },
];

function DashLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const userType = sessionStorage.getItem('type');

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('type');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('type');
    setMobileOpen(false);
    navigate('/auth/signin', { replace: true });
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #1E5D3B 0%, #16452d 100%)',
        color: '#F7F8EF',
      }}
    >
      <Box sx={{ px: 3, py: 3 }}>
        <Typography variant="overline" sx={{ letterSpacing: '0.18em', color: '#FAEDCB' }}>
          Admin Panel
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Manuel Dashboard
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'rgba(247, 248, 239, 0.82)' }}>
          Access your overview, reports, and users from one place.
        </Typography>
      </Box>

      <List sx={{ px: 2 }}>
        {navItems
          .filter((item) => !item.roles || item.roles.includes(userType))
          .map((item) => {
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
                borderRadius: 2,
                color: 'rgba(247, 248, 239, 0.82)',
                '&.active': {
                  backgroundColor: 'rgba(250, 237, 203, 0.16)',
                  color: '#F7F8EF',
                },
                '&.active .MuiListItemIcon-root': {
                  color: '#FAEDCB',
                },
                '&:hover': {
                  backgroundColor: 'rgba(250, 237, 203, 0.10)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'rgba(250, 237, 203, 0.78)' }}>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: 'auto', px: 3, py: 3 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<LogoutRoundedIcon />}
          onClick={handleLogout}
          sx={{
            mb: 2,
            justifyContent: 'flex-start',
            borderRadius: 2,
            backgroundColor: '#FAEDCB',
            color: '#1E5D3B',
            fontWeight: 700,
            '&:hover': {
              backgroundColor: '#f3dfad',
            },
          }}
        >
          Logout
        </Button>

        <Box
          sx={{
            borderRadius: 2,
            backgroundColor: 'rgba(15, 23, 42, 0.18)',
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Quick Access
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: 'rgba(247, 248, 239, 0.78)' }}>
            Use the sidebar to jump straight into your dashboard workspace.
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F7F8EF' }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          borderBottom: '1px solid rgba(30, 93, 59, 0.12)',
          backgroundColor: 'rgba(247, 248, 239, 0.86)',
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
              <Typography variant="subtitle2" sx={{ color: '#1E5D3B', fontWeight: 700 }}>
                Dashboard
              </Typography>
              <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 700 }}>
                Workspace Navigation
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="outlined"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              borderColor: 'rgba(30, 93, 59, 0.35)',
              color: '#1E5D3B',
              fontWeight: 700,
              '&:hover': {
                borderColor: '#1E5D3B',
                backgroundColor: 'rgba(30, 93, 59, 0.08)',
              },
            }}
          >
            Logout
          </Button>
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
