import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  Close,
  Send,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { Comment } from '../types';

interface CommentsDialogProps {
  open: boolean;
  onClose: () => void;
  comments: Comment[];
  pitchTitle: string;
  onAddComment: (comment: string) => void;
}

const CommentsDialog: React.FC<CommentsDialogProps> = ({
  open,
  onClose,
  comments,
  pitchTitle,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  const handleLikeComment = (commentId: string) => {
    const newLikedComments = new Set(likedComments);
    if (likedComments.has(commentId)) {
      newLikedComments.delete(commentId);
    } else {
      newLikedComments.add(commentId);
    }
    setLikedComments(newLikedComments);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'только что';
    if (diffInMinutes < 60) return `${diffInMinutes} мин назад`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ч назад`;
    return `${Math.floor(diffInMinutes / 1440)} дн назад`;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#111111',
          color: '#ffffff',
          border: '1px solid #333333',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Комментарии
          </Typography>
          <Typography variant="body2" sx={{ color: '#cccccc', mt: 0.5 }}>
            {pitchTitle}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#ffffff' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
        {/* Comments List */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: 3 }}>
          {comments.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px',
                color: '#666666',
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Пока нет комментариев
              </Typography>
              <Typography variant="body2">
                Станьте первым, кто оставит комментарий!
              </Typography>
            </Box>
          ) : (
            <List sx={{ py: 0 }}>
              {comments.map((comment, index) => (
                <React.Fragment key={comment.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      px: 0,
                      py: 2,
                      '&:hover': { backgroundColor: '#222222' },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={comment.userAvatar}
                        sx={{ width: 40, height: 40 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, color: '#ffffff' }}
                          >
                            {comment.userName}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: '#888888' }}
                          >
                            {formatTime(comment.createdAt)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ color: '#cccccc', mb: 1, lineHeight: 1.4 }}
                          >
                            {comment.text}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button
                              size="small"
                              startIcon={
                                likedComments.has(comment.id) ? (
                                  <Favorite sx={{ fontSize: 16, color: '#ff4757' }} />
                                ) : (
                                  <FavoriteBorder sx={{ fontSize: 16 }} />
                                )
                              }
                              onClick={() => handleLikeComment(comment.id)}
                              sx={{
                                color: likedComments.has(comment.id) ? '#ff4757' : '#888888',
                                minWidth: 'auto',
                                p: 0.5,
                                '&:hover': { backgroundColor: 'transparent' },
                              }}
                            >
                              {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                            </Button>
                            <Button
                              size="small"
                              sx={{
                                color: '#888888',
                                minWidth: 'auto',
                                p: 0.5,
                                '&:hover': { backgroundColor: 'transparent' },
                              }}
                            >
                              Ответить
                            </Button>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < comments.length - 1 && (
                    <Divider sx={{ backgroundColor: '#333333' }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {/* Comment Input */}
        <Box
          sx={{
            borderTop: '1px solid #333333',
            p: 3,
            backgroundColor: '#111111',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Avatar
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              sx={{ width: 40, height: 40 }}
            />
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Написать комментарий..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#222222',
                    border: '1px solid #444444',
                    borderRadius: 2,
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
                    '&::placeholder': {
                      color: '#888888',
                      opacity: 1,
                    },
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button
                  variant="contained"
                  endIcon={<Send />}
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  sx={{
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    '&:hover': { backgroundColor: '#f0f0f0' },
                    '&:disabled': {
                      backgroundColor: '#444444',
                      color: '#666666',
                    },
                  }}
                >
                  Отправить
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;