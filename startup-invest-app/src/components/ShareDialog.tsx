import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Close,
  ContentCopy,
  Telegram,
  WhatsApp,
  Facebook,
  Twitter,
  LinkedIn,
  Email,
} from '@mui/icons-material';

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  pitchId: string;
  pitchTitle: string;
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  open,
  onClose,
  pitchId,
  pitchTitle,
}) => {
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  
  const shareUrl = `${window.location.origin}/startup/${pitchId}`;
  const shareText = `Посмотрите этот стартап: ${pitchTitle}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopyAlert(true);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareOptions = [
    {
      name: 'Telegram',
      icon: <Telegram />,
      color: '#0088cc',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'WhatsApp',
      icon: <WhatsApp />,
      color: '#25d366',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    },
    {
      name: 'VKontakte',
      icon: <Facebook />, // Using Facebook icon as placeholder
      color: '#4c75a3',
      url: `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Twitter',
      icon: <Twitter />,
      color: '#1da1f2',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: <LinkedIn />,
      color: '#0077b5',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Email',
      icon: <Email />,
      color: '#ea4335',
      url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
    },
  ];

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#111111',
            color: '#ffffff',
            border: '1px solid #333333',
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Поделиться стартапом
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#ffffff' }}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#cccccc', mb: 3 }}>
            {pitchTitle}
          </Typography>

          {/* Copy Link */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#222222',
              borderRadius: 2,
              p: 2,
              mb: 3,
              border: '1px solid #333333',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                color: '#cccccc',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                mr: 2,
              }}
            >
              {shareUrl}
            </Typography>
            <Button
              variant="contained"
              startIcon={<ContentCopy />}
              onClick={handleCopyLink}
              sx={{
                backgroundColor: '#ffffff',
                color: '#000000',
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              Копировать
            </Button>
          </Box>

          {/* Social Share Options */}
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Поделиться в социальных сетях
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {shareOptions.map((option) => (
              <Box key={option.name} sx={{ flex: '1 1 150px', minWidth: 150 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={option.icon}
                  onClick={() => handleShare(option.url)}
                  sx={{
                    borderColor: option.color,
                    color: option.color,
                    py: 1.5,
                    '&:hover': {
                      borderColor: option.color,
                      backgroundColor: `${option.color}20`,
                    },
                  }}
                >
                  {option.name}
                </Button>
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={showCopyAlert}
        autoHideDuration={3000}
        onClose={() => setShowCopyAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowCopyAlert(false)}
          severity="success"
          sx={{ backgroundColor: '#4caf50', color: '#ffffff' }}
        >
          Ссылка скопирована в буфер обмена!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareDialog;