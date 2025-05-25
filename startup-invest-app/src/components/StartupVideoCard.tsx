import React, { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Button,
  LinearProgress,
  Fade,
  useTheme,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Favorite,
  FavoriteBorder,
  Share,
  Comment,
  TrendingUp,
  Verified,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { StartupPitch, Startup } from '../types';
import { useNavigate } from 'react-router-dom';

interface StartupVideoCardProps {
  pitch: StartupPitch;
  startup: Startup;
  autoPlay?: boolean;
  onInvest?: (pitchId: string) => void;
}

const StartupVideoCard: React.FC<StartupVideoCardProps> = ({
  pitch,
  startup,
  autoPlay = false,
  onInvest,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const fundingPercentage = (pitch.currentFunding / pitch.fundingGoal) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleInvest = () => {
    if (onInvest) {
      onInvest(pitch.id);
    } else {
      navigate(`/invest/${pitch.id}`);
    }
  };

  const handleProfileClick = () => {
    navigate(`/profile/${startup.id}`);
  };

  const handleStartupClick = () => {
    navigate(`/startup/${startup.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          maxWidth: 400,
          mx: 'auto',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'background.paper',
          boxShadow: theme.shadows[4],
        }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video Container */}
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '9/16',
            backgroundColor: 'black',
            cursor: 'pointer',
          }}
          onClick={handlePlayPause}
        >
          <ReactPlayer
            ref={playerRef}
            url={pitch.videoUrl}
            playing={isPlaying}
            muted={isMuted}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />

          {/* Video Overlay Controls */}
          <Fade in={showControls || !isPlaying}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 2,
              }}
            >
              {/* Top Controls */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Chip
                  label={`${Math.floor(pitch.duration)}s`}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    fontSize: '0.75rem',
                  }}
                />
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  sx={{ color: 'white' }}
                >
                  {isMuted ? <VolumeOff /> : <VolumeUp />}
                </IconButton>
              </Box>

              {/* Center Play Button */}
              {!isPlaying && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,1)',
                      },
                      width: 64,
                      height: 64,
                    }}
                  >
                    <PlayArrow sx={{ fontSize: 32 }} />
                  </IconButton>
                </Box>
              )}

              {/* Bottom Info */}
              <Box>
                {/* Startup Info */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1,
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProfileClick();
                  }}
                >
                  <Avatar
                    src={startup.avatar}
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: 'white', fontWeight: 600, lineHeight: 1.2 }}
                    >
                      {startup.name}
                      {startup.verified && (
                        <Verified sx={{ ml: 0.5, fontSize: 16, color: '#1DA1F2' }} />
                      )}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'rgba(255,255,255,0.8)' }}
                    >
                      {startup.companyName}
                    </Typography>
                  </Box>
                </Box>

                {/* Title */}
                <Typography
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                    mb: 1,
                    lineHeight: 1.3,
                  }}
                >
                  {pitch.title}
                </Typography>

                {/* Tags */}
                <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
                  {pitch.tags.slice(0, 3).map((tag) => (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontSize: '0.7rem',
                        height: 20,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Fade>

          {/* Side Actions */}
          <Box
            sx={{
              position: 'absolute',
              right: 12,
              bottom: 80,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: isLiked ? '#ff4757' : 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                  },
                }}
              >
                {isLiked ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <Typography variant="caption" sx={{ color: 'white', display: 'block', mt: 0.5 }}>
                {formatNumber(pitch.likes + (isLiked ? 1 : 0))}
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <IconButton
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                  },
                }}
              >
                <Comment />
              </IconButton>
              <Typography variant="caption" sx={{ color: 'white', display: 'block', mt: 0.5 }}>
                {formatNumber(pitch.comments.length)}
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <IconButton
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                  },
                }}
              >
                <Share />
              </IconButton>
              <Typography variant="caption" sx={{ color: 'white', display: 'block', mt: 0.5 }}>
                Поделиться
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Investment Info */}
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Собрано
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fundingPercentage.toFixed(1)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(fundingPercentage, 100)}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  background: 'linear-gradient(45deg, #6366f1, #ec4899)',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                {formatCurrency(pitch.currentFunding)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                из {formatCurrency(pitch.fundingGoal)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Мин. инвестиция
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatCurrency(pitch.minInvestment)}
              </Typography>
            </Box>
            {pitch.equity && (
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Доля
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {pitch.equity}%
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleInvest}
              sx={{
                background: 'linear-gradient(45deg, #6366f1, #ec4899)',
                fontWeight: 600,
                py: 1.2,
              }}
            >
              Инвестировать
            </Button>
            <Button
              variant="outlined"
              onClick={handleStartupClick}
              sx={{ minWidth: 'auto', px: 2 }}
            >
              <TrendingUp />
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StartupVideoCard;