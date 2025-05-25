import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home,
  Explore,
  Notifications,
  AccountCircle,
  TrendingUp,
  Search,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: 'Лента', path: '/', icon: <Home /> },
    { label: 'Обзор', path: '/explore', icon: <Explore /> },
    { label: 'Поиск', path: '/search', icon: <Search /> },
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0, sm: 2 } }}>
          {/* Logo */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              mr: 4 
            }}
            onClick={() => navigate('/')}
          >
            <TrendingUp sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #6366f1, #ec4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              StartupInvest
            </Typography>
          </Box>

          {/* Navigation Items */}
          <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                startIcon={!isMobile ? item.icon : undefined}
                onClick={() => navigate(item.path)}
                sx={{
                  color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                  fontWeight: isActive(item.path) ? 600 : 400,
                  backgroundColor: isActive(item.path) ? 'primary.50' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'primary.50',
                  },
                  minWidth: isMobile ? 'auto' : undefined,
                  px: isMobile ? 1 : 2,
                }}
              >
                {isMobile ? item.icon : item.label}
              </Button>
            ))}
          </Box>

          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <IconButton
              size="large"
              sx={{ color: 'text.secondary' }}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* Profile Menu */}
            <IconButton
              size="large"
              edge="end"
              onClick={handleProfileMenuOpen}
              sx={{ ml: 1 }}
            >
              <Avatar 
                sx={{ width: 32, height: 32 }}
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  '& .MuiMenuItem-root': {
                    px: 2,
                    py: 1,
                  },
                },
              }}
            >
              <MenuItem onClick={() => navigate('/profile/current')}>
                <AccountCircle sx={{ mr: 2 }} />
                Мой профиль
              </MenuItem>
              <MenuItem onClick={() => navigate('/settings')}>
                Настройки
              </MenuItem>
              <MenuItem onClick={() => navigate('/help')}>
                Помощь
              </MenuItem>
              <MenuItem onClick={() => {}}>
                Выйти
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;