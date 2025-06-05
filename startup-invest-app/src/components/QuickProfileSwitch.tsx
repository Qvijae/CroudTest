import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Chip,
} from '@mui/material';
import {
  Person,
  Business,
  SwapHoriz,
} from '@mui/icons-material';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const QuickProfileSwitch: React.FC = () => {
  const { userType, switchUserType } = useUser();
  const navigate = useNavigate();

  const currentProfile = userType === 'investor' ? {
    type: 'investor',
    title: 'Инвестор',
    name: 'Алексей Петров',
    description: 'Ищу проекты для инвестиций',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    icon: <Person />,
    stats: '8 активных инвестиций',
  } : {
    type: 'startup',
    title: 'Стартап',
    name: 'TechStart',
    description: 'Ищу инвестиции для развития',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    icon: <Business />,
    stats: 'Раунд A, $500K',
  };

  const otherProfile = userType === 'investor' ? {
    type: 'startup',
    title: 'Стартап',
    name: 'TechStart',
    description: 'Переключиться на профиль стартапа',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    icon: <Business />,
  } : {
    type: 'investor',
    title: 'Инвестор',
    name: 'Алексей Петров',
    description: 'Переключиться на профиль инвестора',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    icon: <Person />,
  };

  const handleSwitch = () => {
    switchUserType();
    navigate(userType === 'investor' ? '/startup-profile' : '/profile');
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Current Profile */}
      <Card
        sx={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #333333',
          mb: 2,
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={currentProfile.avatar}
              sx={{
                width: 48,
                height: 48,
                mr: 2,
                border: '2px solid #ffffff',
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  {currentProfile.name}
                </Typography>
                <Chip
                  label="Активный"
                  size="small"
                  sx={{
                    backgroundColor: '#4caf50',
                    color: '#ffffff',
                    fontSize: '10px',
                    height: 20,
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: '#888888', mb: 0.5 }}>
                {currentProfile.title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666666' }}>
                {currentProfile.stats}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                color: '#000000',
              }}
            >
              {currentProfile.icon}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Switch to Other Profile */}
      <Card
        sx={{
          backgroundColor: '#111111',
          border: '1px solid #333333',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#1a1a1a',
            borderColor: '#555555',
          },
        }}
        onClick={handleSwitch}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={otherProfile.avatar}
              sx={{
                width: 40,
                height: 40,
                mr: 2,
                border: '1px solid #333333',
                opacity: 0.7,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 500, mb: 0.5 }}>
                {otherProfile.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#888888' }}>
                {otherProfile.description}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<SwapHoriz />}
              sx={{
                borderColor: '#333333',
                color: '#ffffff',
                '&:hover': {
                  borderColor: '#ffffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Переключить
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuickProfileSwitch;