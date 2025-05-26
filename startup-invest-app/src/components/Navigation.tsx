import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home,
  Search,
  Add,
  FavoriteBorder,
  Person,
  TrendingUp,
  AccountCircle,
  Chat,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [bottomNavValue, setBottomNavValue] = useState(0);
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

  const getBottomNavValue = () => {
    switch (location.pathname) {
      case '/': return 0;
      case '/explore': return 1;
      case '/profile': return 4;
      case '/chat': return 3;
      default: 
        if (location.pathname.startsWith('/chat/')) return 3;
        return 0;
    }
  };

  React.useEffect(() => {
    setBottomNavValue(getBottomNavValue());
  }, [location.pathname]);

  // Mobile TikTok-style navigation
  if (isMobile) {
    return (
      <>
        {/* Top bar for mobile */}
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{ 
            backgroundColor: '#000000',
            borderBottom: '1px solid #333333',
            zIndex: 1100,
          }}
        >
          <Toolbar sx={{ justifyContent: 'center', minHeight: '56px !important' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: '#ffffff',
                fontSize: '18px',
                letterSpacing: '0.5px'
              }}
            >
              StartupInvest
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Bottom navigation like TikTok */}
        <Paper 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            zIndex: 1100,
            backgroundColor: '#000000',
            borderTop: '1px solid #333333',
          }} 
          elevation={0}
        >
          <BottomNavigation
            value={bottomNavValue}
            onChange={(event, newValue) => {
              setBottomNavValue(newValue);
              switch (newValue) {
                case 0: navigate('/'); break;
                case 1: navigate('/explore'); break;
                case 2: 
                  // Create new pitch - можно добавить позже
                  break;
                case 3: navigate('/chat'); break;
                case 4: navigate('/profile'); break;
              }
            }}
            sx={{
              backgroundColor: 'transparent',
              '& .MuiBottomNavigationAction-root': {
                minWidth: 'auto',
                padding: '6px 12px',
              }
            }}
          >
            <BottomNavigationAction 
              label="Главная" 
              icon={<Home />} 
              sx={{ 
                color: bottomNavValue === 0 ? '#ffffff' : '#666666',
                '&.Mui-selected': { color: '#ffffff' }
              }}
            />
            <BottomNavigationAction 
              label="Поиск" 
              icon={<Search />} 
              sx={{ 
                color: bottomNavValue === 1 ? '#ffffff' : '#666666',
                '&.Mui-selected': { color: '#ffffff' }
              }}
            />
            <BottomNavigationAction 
              label="Создать" 
              icon={
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Add sx={{ color: '#000000', fontSize: 20 }} />
                </Box>
              }
              sx={{ 
                color: '#666666',
              }}
            />
            <BottomNavigationAction 
              label="Чаты" 
              icon={<Chat />} 
              sx={{ 
                color: bottomNavValue === 3 ? '#ffffff' : '#666666',
                '&.Mui-selected': { color: '#ffffff' }
              }}
            />
            <BottomNavigationAction 
              label="Профиль" 
              icon={<Person />} 
              sx={{ 
                color: bottomNavValue === 4 ? '#ffffff' : '#666666',
                '&.Mui-selected': { color: '#ffffff' }
              }}
            />
          </BottomNavigation>
        </Paper>
      </>
    );
  }

  // Desktop navigation
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: '#000000',
        borderBottom: '1px solid #333333',
      }}
    >
      <Toolbar sx={{ px: 4 }}>
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
          <TrendingUp sx={{ color: '#ffffff', mr: 1, fontSize: 28 }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            StartupInvest
          </Typography>
        </Box>

        {/* Center space */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right side actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/')}>
            <Home sx={{ color: location.pathname === '/' ? '#ffffff' : '#666666' }} />
          </IconButton>
          <IconButton onClick={() => navigate('/explore')}>
            <Search sx={{ color: location.pathname === '/explore' ? '#ffffff' : '#666666' }} />
          </IconButton>
          <IconButton onClick={() => navigate('/chat')}>
            <Chat sx={{ color: location.pathname.startsWith('/chat') ? '#ffffff' : '#666666' }} />
          </IconButton>

          {/* Profile Menu */}
          <IconButton
            onClick={handleProfileMenuOpen}
          >
            <Avatar 
              sx={{ width: 32, height: 32, border: '2px solid #333333' }}
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                mt: 1.5,
                minWidth: 200,
                backgroundColor: '#111111',
                border: '1px solid #333333',
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1.5,
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#222222',
                  },
                },
              },
            }}
          >
            <MenuItem onClick={() => navigate('/profile')}>
              <AccountCircle sx={{ mr: 2, color: '#ffffff' }} />
              Мой профиль
            </MenuItem>
            <MenuItem onClick={() => {}}>
              Настройки
            </MenuItem>
            <MenuItem onClick={() => {}}>
              Выйти
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;