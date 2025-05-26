import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  TextField,
  InputAdornment,
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { Search, Circle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Chat {
  id: string;
  participantName: string;
  participantAvatar: string;
  participantType: 'investor' | 'founder';
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  startupName?: string;
}

const mockChats: Chat[] = [
  {
    id: '1',
    participantName: 'Александр Иванов',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    participantType: 'investor',
    lastMessage: 'Готов инвестировать 500,000 руб в ваш проект',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 2,
    isOnline: true,
    startupName: 'EcoTech Solutions',
  },
  {
    id: '2',
    participantName: 'Мария Волкова',
    participantAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    participantType: 'investor',
    lastMessage: 'Интересует партнерство в области FinTech',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
    unreadCount: 0,
    isOnline: false,
    startupName: 'FinBot AI',
  },
  {
    id: '3',
    participantName: 'Сергей Петров',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    participantType: 'investor',
    lastMessage: 'Когда планируете выход на прибыльность?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 1,
    isOnline: true,
    startupName: 'MedConnect',
  },
];

const ChatListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredChats = mockChats.filter(chat =>
    chat.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (chat.startupName && chat.startupName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes}м`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}ч`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}д`;
    }
  };

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#ffffff',
        pt: isMobile ? '56px' : '64px',
        pb: isMobile ? '60px' : 0,
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid #333333' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Сообщения
        </Typography>
        
        {/* Search */}
        <TextField
          fullWidth
          placeholder="Поиск чатов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#666666' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#111111',
              border: '1px solid #333333',
              borderRadius: '8px',
              '& fieldset': {
                border: 'none',
              },
              '&:hover': {
                borderColor: '#555555',
              },
              '&.Mui-focused': {
                borderColor: '#ffffff',
              },
            },
            '& .MuiInputBase-input': {
              color: '#ffffff',
              '&::placeholder': {
                color: '#666666',
                opacity: 1,
              },
            },
          }}
        />
      </Box>

      {/* Chat List */}
      <List sx={{ p: 0 }}>
        {filteredChats.map((chat, index) => (
          <React.Fragment key={chat.id}>
            <ListItem
              onClick={() => handleChatClick(chat.id)}
              sx={{
                cursor: 'pointer',
                py: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: '#111111',
                },
              }}
            >
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    chat.isOnline ? (
                      <Circle sx={{ color: '#4CAF50', fontSize: 12 }} />
                    ) : null
                  }
                >
                  <Avatar
                    src={chat.participantAvatar}
                    sx={{ width: 56, height: 56 }}
                  />
                </Badge>
              </ListItemAvatar>
              
              <ListItemText
                sx={{ ml: 2 }}
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#ffffff' }}>
                      {chat.participantName}
                    </Typography>
                    <Chip
                      label={chat.participantType === 'investor' ? 'Инвестор' : 'Основатель'}
                      size="small"
                      sx={{
                        backgroundColor: chat.participantType === 'investor' ? '#1976d2' : '#ff9800',
                        color: '#ffffff',
                        fontSize: '10px',
                        height: '20px',
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    {chat.startupName && (
                      <Typography variant="caption" sx={{ color: '#888888', display: 'block' }}>
                        {chat.startupName}
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#cccccc',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '200px',
                      }}
                    >
                      {chat.lastMessage}
                    </Typography>
                  </Box>
                }
              />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                <Typography variant="caption" sx={{ color: '#666666' }}>
                  {formatTime(chat.lastMessageTime)}
                </Typography>
                {chat.unreadCount > 0 && (
                  <Badge
                    badgeContent={chat.unreadCount}
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#ff4444',
                        color: '#ffffff',
                        fontSize: '12px',
                        minWidth: '20px',
                        height: '20px',
                      },
                    }}
                  />
                )}
              </Box>
            </ListItem>
            {index < filteredChats.length - 1 && (
              <Divider sx={{ backgroundColor: '#333333', mx: 2 }} />
            )}
          </React.Fragment>
        ))}
      </List>

      {filteredChats.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" sx={{ color: '#666666', mb: 1 }}>
            Чаты не найдены
          </Typography>
          <Typography variant="body2" sx={{ color: '#888888' }}>
            Попробуйте изменить поисковый запрос
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatListPage;