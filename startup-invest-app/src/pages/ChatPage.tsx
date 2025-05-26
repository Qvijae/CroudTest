import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Paper,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Send,
  AttachFile,
  MoreVert,
  Circle,
  CheckCircle,
  AccountBalance,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'file' | 'investment_proposal';
  fileUrl?: string;
  fileName?: string;
  investmentAmount?: number;
  isRead: boolean;
  isMine: boolean;
}

const mockMessages: ChatMessage[] = [
  {
    id: 'm1',
    senderId: 'inv1',
    senderName: 'Александр Иванов',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    message: 'Здравствуйте! Меня заинтересовал ваш проект EcoTech Solutions.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    type: 'text',
    isRead: true,
    isMine: false,
  },
  {
    id: 'm2',
    senderId: 'founder1',
    senderName: 'Анна Петрова',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    message: 'Добро пожаловать! Рада вашему интересу. Что именно вас привлекло в нашем проекте?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
    type: 'text',
    isRead: true,
    isMine: true,
  },
  {
    id: 'm3',
    senderId: 'inv1',
    senderName: 'Александр Иванов',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    message: 'Инновационный подход к экомониторингу и потенциал масштабирования. Можете прислать более детальную презентацию?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    type: 'text',
    isRead: true,
    isMine: false,
  },
  {
    id: 'm4',
    senderId: 'founder1',
    senderName: 'Анна Петрова',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    message: 'Конечно! Высылаю презентацию с финансовой моделью.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: 'file',
    fileName: 'EcoTech_Presentation.pdf',
    fileUrl: '#',
    isRead: true,
    isMine: true,
  },
  {
    id: 'm5',
    senderId: 'inv1',
    senderName: 'Александр Иванов',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    message: 'Готов инвестировать 500,000 руб в ваш проект',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: 'investment_proposal',
    investmentAmount: 500000,
    isRead: false,
    isMine: false,
  },
];

const ChatPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: `m${Date.now()}`,
        senderId: 'current_user',
        senderName: 'Вы',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        message: message.trim(),
        timestamp: new Date(),
        type: 'text',
        isRead: false,
        isMine: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount);
  };

  const renderMessage = (msg: ChatMessage) => {
    const isInvestmentProposal = msg.type === 'investment_proposal';
    const isFile = msg.type === 'file';

    return (
      <Box
        key={msg.id}
        sx={{
          display: 'flex',
          justifyContent: msg.isMine ? 'flex-end' : 'flex-start',
          mb: 2,
          px: 2,
        }}
      >
        {!msg.isMine && (
          <Avatar
            src={msg.senderAvatar}
            sx={{ width: 32, height: 32, mr: 1, mt: 0.5 }}
          />
        )}
        
        <Box sx={{ maxWidth: '70%' }}>
          {!msg.isMine && (
            <Typography variant="caption" sx={{ color: '#888888', ml: 1 }}>
              {msg.senderName}
            </Typography>
          )}
          
          <Paper
            sx={{
              p: 1.5,
              backgroundColor: msg.isMine ? '#ffffff' : '#222222',
              color: msg.isMine ? '#000000' : '#ffffff',
              borderRadius: '12px',
              border: isInvestmentProposal ? '2px solid #4CAF50' : 'none',
              mt: 0.5,
            }}
          >
            {isInvestmentProposal ? (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccountBalance sx={{ mr: 1, color: '#4CAF50' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                    Предложение инвестиций
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {formatAmount(msg.investmentAmount!)} ₽
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {msg.message}
                </Typography>
                {!msg.isMine && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: '#4CAF50',
                        color: '#ffffff',
                        '&:hover': { backgroundColor: '#45a049' },
                      }}
                    >
                      Принять
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: '#666666',
                        color: msg.isMine ? '#000000' : '#ffffff',
                      }}
                    >
                      Обсудить
                    </Button>
                  </Box>
                )}
              </Box>
            ) : isFile ? (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AttachFile sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {msg.fileName}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: '#666666',
                    color: msg.isMine ? '#000000' : '#ffffff',
                  }}
                >
                  Скачать
                </Button>
              </Box>
            ) : (
              <Typography variant="body2">
                {msg.message}
              </Typography>
            )}
          </Paper>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: msg.isMine ? 'flex-end' : 'flex-start', mt: 0.5, px: 1 }}>
            <Typography variant="caption" sx={{ color: '#666666' }}>
              {formatTime(msg.timestamp)}
            </Typography>
            {msg.isMine && (
              <CheckCircle 
                sx={{ 
                  ml: 0.5, 
                  fontSize: 12, 
                  color: msg.isRead ? '#4CAF50' : '#666666' 
                }} 
              />
            )}
          </Box>
        </Box>
        
        {msg.isMine && (
          <Avatar
            src={msg.senderAvatar}
            sx={{ width: 32, height: 32, ml: 1, mt: 0.5 }}
          />
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#000000',
        color: '#ffffff',
      }}
    >
      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: '#000000',
          borderBottom: '1px solid #333333',
        }}
      >
        <Toolbar sx={{ minHeight: isMobile ? '56px' : '64px' }}>
          <IconButton
            edge="start"
            onClick={() => navigate('/chat')}
            sx={{ mr: 2, color: '#ffffff' }}
          >
            <ArrowBack />
          </IconButton>
          
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={<Circle sx={{ color: '#4CAF50', fontSize: 12 }} />}
          >
            <Avatar
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              sx={{ width: 40, height: 40, mr: 2 }}
            />
          </Badge>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Александр Иванов
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label="Инвестор"
                size="small"
                sx={{
                  backgroundColor: '#1976d2',
                  color: '#ffffff',
                  fontSize: '10px',
                  height: '18px',
                }}
              />
              <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                онлайн
              </Typography>
            </Box>
          </Box>
          
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ color: '#ffffff' }}
          >
            <MoreVert />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                backgroundColor: '#111111',
                border: '1px solid #333333',
                '& .MuiMenuItem-root': {
                  color: '#ffffff',
                  '&:hover': { backgroundColor: '#222222' },
                },
              },
            }}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>
              Посмотреть профиль
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              Перейти к стартапу
            </MenuItem>
            <Divider sx={{ backgroundColor: '#333333' }} />
            <MenuItem onClick={() => setAnchorEl(null)}>
              Заблокировать
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          py: 2,
        }}
      >
        {messages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid #333333',
          backgroundColor: '#111111',
          position: 'sticky',
          bottom: 0,
          zIndex: 10,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
          <IconButton sx={{ color: '#666666', mb: 0.5 }}>
            <AttachFile />
          </IconButton>
          
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Написать сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#222222',
                border: '2px solid #444444',
                borderRadius: '24px',
                minHeight: '48px',
                padding: '8px 16px',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover': {
                  borderColor: '#666666',
                },
                '&.Mui-focused': {
                  borderColor: '#ffffff',
                },
              },
              '& .MuiInputBase-input': {
                color: '#ffffff',
                fontSize: '16px',
                padding: '8px 0',
                '&::placeholder': {
                  color: '#888888',
                  opacity: 1,
                },
              },
            }}
          />
          
          <IconButton
            onClick={handleSendMessage}
            disabled={!message.trim()}
            sx={{
              color: '#000000',
              backgroundColor: message.trim() ? '#ffffff' : '#444444',
              width: 48,
              height: 48,
              mb: 0.5,
              '&:hover': {
                backgroundColor: message.trim() ? '#f0f0f0' : '#555555',
              },
              '&:disabled': {
                backgroundColor: '#444444',
                color: '#666666',
              },
            }}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;