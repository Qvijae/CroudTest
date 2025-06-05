import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Typography,
  IconButton,
  Slide,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Person,
  Business,
  Close,
  CheckCircle,
  SwapHoriz,
} from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ProfileSwitcherProps {
  open: boolean;
  onClose: () => void;
}

const ProfileSwitcher: React.FC<ProfileSwitcherProps> = ({ open, onClose }) => {
  const { userType, switchUserType } = useUser();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSwitchProfile = (newUserType: 'investor' | 'startup') => {
    if (newUserType !== userType) {
      switchUserType();
      // Перенаправляем на соответствующий профиль
      navigate(newUserType === 'investor' ? '/profile' : '/startup-profile');
    }
    onClose();
  };

  const profiles = [
    {
      type: 'investor' as const,
      title: 'Инвестор',
      description: 'Ищу проекты для инвестиций',
      icon: <Person sx={{ fontSize: 28 }} />,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      name: 'Алексей Петров',
      stats: '8 активных инвестиций',
    },
    {
      type: 'startup' as const,
      title: 'Стартап',
      description: 'Ищу инвестиции для развития',
      icon: <Business sx={{ fontSize: 28 }} />,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      name: 'TechStart',
      stats: 'Раунд A, $500K',
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#111111',
          border: isMobile ? 'none' : '1px solid #333333',
          borderRadius: isMobile ? 0 : 2,
          margin: isMobile ? 0 : 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: '#000000',
          color: '#ffffff',
          borderBottom: '1px solid #333333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SwapHoriz sx={{ color: '#ffffff' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Переключить профиль
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#ffffff' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, backgroundColor: '#111111' }}>
        <List sx={{ p: 0 }}>
          {profiles.map((profile) => (
            <ListItem key={profile.type} disablePadding>
              <ListItemButton
                onClick={() => handleSwitchProfile(profile.type)}
                sx={{
                  py: 3,
                  px: 3,
                  borderBottom: '1px solid #333333',
                  '&:hover': {
                    backgroundColor: '#222222',
                  },
                  position: 'relative',
                }}
              >
                <ListItemIcon sx={{ minWidth: 60 }}>
                  <Avatar
                    src={profile.avatar}
                    sx={{
                      width: 48,
                      height: 48,
                      border: userType === profile.type ? '2px solid #ffffff' : '2px solid #333333',
                    }}
                  />
                </ListItemIcon>

                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#ffffff',
                          fontWeight: 600,
                          fontSize: '16px',
                        }}
                      >
                        {profile.name}
                      </Typography>
                      {userType === profile.type && (
                        <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: '#888888', mb: 0.5 }}
                      >
                        {profile.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#666666' }}
                      >
                        {profile.stats}
                      </Typography>
                    </Box>
                  }
                />

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: userType === profile.type ? '#ffffff' : '#333333',
                    color: userType === profile.type ? '#000000' : '#ffffff',
                  }}
                >
                  {profile.icon}
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            borderTop: '1px solid #333333',
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: '#666666', lineHeight: 1.5 }}
          >
            Выберите тип профиля для переключения между режимами инвестора и стартапа
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSwitcher;