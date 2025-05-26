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
  Comment as CommentIcon,
  TrendingUp,
  Verified,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { StartupPitch, Startup, Comment } from '../types';
import { useNavigate } from 'react-router-dom';
import ShareDialog from './ShareDialog';
import CommentsDialog from './CommentsDialog';
import InvestDialog from './InvestDialog';

interface StartupVideoCardProps {
  pitch: StartupPitch;
  startup: Startup;
  autoPlay?: boolean;
  onInvest?: (pitchId: string) => void;
  fullScreen?: boolean;
}

const StartupVideoCard: React.FC<StartupVideoCardProps> = ({
  pitch,
  startup,
  autoPlay = false,
  onInvest,
  fullScreen = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [commentsDialogOpen, setCommentsDialogOpen] = useState(false);
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const [comments, setComments] = useState(pitch.comments);
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
    setInvestDialogOpen(true);
  };

  const handleInvestConfirm = (amount: number) => {
    if (onInvest) {
      onInvest(pitch.id);
    }
    console.log(`Invested ${amount} in ${pitch.title}`);
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const handleComments = () => {
    setCommentsDialogOpen(true);
  };

  const handleAddComment = (commentText: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      userId: 'current_user',
      userName: 'Вы',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      text: commentText,
      createdAt: new Date(),
      likes: 0,
    };
    setComments([...comments, newComment]);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${startup.id}`);
  };

  const handleStartupClick = () => {
    navigate(`/startup/${startup.id}`);
  };

  if (fullScreen) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={handlePlayPause}
      >
        {/* Full Screen Video */}
        <ReactPlayer
          ref={playerRef}
          url={pitch.videoUrl}
          playing={isPlaying}
          muted={isMuted}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />

        {/* Full Screen Overlay */}
        <Fade in={showControls || !isPlaying}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 3,
            }}
          >
            {/* Top Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label={startup.category}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontSize: '0.75rem',
                    backdropFilter: 'blur(10px)',
                  }}
                />
                <Chip
                  label={`${Math.floor(pitch.duration)}s`}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    fontSize: '0.75rem',
                  }}
                />
              </Box>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                sx={{ 
                  color: 'white',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                }}
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
                    color: '#000000',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,1)',
                    },
                    width: 80,
                    height: 80,
                  }}
                >
                  <PlayArrow sx={{ fontSize: 40 }} />
                </IconButton>
              </Box>
            )}

            {/* Bottom Content */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              {/* Left Side - Startup Info */}
              <Box sx={{ flex: 1, mr: 3 }}>
                {/* Startup Profile */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProfileClick();
                  }}
                >
                  <Avatar
                    src={startup.avatar}
                    sx={{ width: 48, height: 48, mr: 2, border: '2px solid white' }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: 'white', fontWeight: 700, lineHeight: 1.2 }}
                    >
                      {startup.name}
                      {startup.verified && (
                        <Verified sx={{ ml: 1, fontSize: 20, color: '#1DA1F2' }} />
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255,255,255,0.8)' }}
                    >
                      {startup.companyName}
                    </Typography>
                  </Box>
                </Box>

                {/* Pitch Title */}
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    mb: 2,
                    lineHeight: 1.3,
                  }}
                >
                  {pitch.title}
                </Typography>

                {/* Tags */}
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {pitch.tags.slice(0, 4).map((tag) => (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontSize: '0.8rem',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                  ))}
                </Box>

                {/* Investment Info */}
                <Box
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: 2,
                    p: 2,
                    backdropFilter: 'blur(10px)',
                    maxWidth: 300,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      Собрано
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                      {fundingPercentage.toFixed(1)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(fundingPercentage, 100)}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        backgroundColor: '#ffffff',
                      },
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                      {formatCurrency(pitch.currentFunding)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      из {formatCurrency(pitch.fundingGoal)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Right Side - Actions */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  alignItems: 'center',
                }}
              >
                {/* Like */}
                <Box sx={{ textAlign: 'center' }}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike();
                    }}
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: isLiked ? '#ff4757' : 'white',
                      width: 56,
                      height: 56,
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                      },
                    }}
                  >
                    {isLiked ? <Favorite sx={{ fontSize: 28 }} /> : <FavoriteBorder sx={{ fontSize: 28 }} />}
                  </IconButton>
                  <Typography variant="body2" sx={{ color: 'white', mt: 1, fontWeight: 600 }}>
                    {formatNumber(pitch.likes + (isLiked ? 1 : 0))}
                  </Typography>
                </Box>

                {/* Comments */}
                <Box sx={{ textAlign: 'center' }}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleComments();
                    }}
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      width: 56,
                      height: 56,
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                      },
                    }}
                  >
                    <CommentIcon sx={{ fontSize: 28 }} />
                  </IconButton>
                  <Typography variant="body2" sx={{ color: 'white', mt: 1, fontWeight: 600 }}>
                    {formatNumber(comments.length)}
                  </Typography>
                </Box>

                {/* Share */}
                <Box sx={{ textAlign: 'center' }}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare();
                    }}
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      width: 56,
                      height: 56,
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                      },
                    }}
                  >
                    <Share sx={{ fontSize: 28 }} />
                  </IconButton>
                  <Typography variant="body2" sx={{ color: 'white', mt: 1, fontWeight: 600 }}>
                    Поделиться
                  </Typography>
                </Box>

                {/* Invest Button */}
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInvest();
                  }}
                  sx={{
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    fontWeight: 700,
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    minWidth: 120,
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                >
                  Инвестировать
                </Button>

                {/* More Info Button */}
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartupClick();
                  }}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 600,
                    py: 1,
                    px: 3,
                    borderRadius: 2,
                    minWidth: 120,
                    '&:hover': {
                      borderColor: '#f0f0f0',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Подробнее
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Dialogs for fullscreen mode */}
        <ShareDialog
          open={shareDialogOpen}
          onClose={() => setShareDialogOpen(false)}
          pitchId={pitch.id}
          pitchTitle={pitch.title}
        />

        <CommentsDialog
          open={commentsDialogOpen}
          onClose={() => setCommentsDialogOpen(false)}
          comments={comments}
          pitchTitle={pitch.title}
          onAddComment={handleAddComment}
        />

        <InvestDialog
          open={investDialogOpen}
          onClose={() => setInvestDialogOpen(false)}
          pitch={pitch}
          startup={startup}
          onInvest={handleInvestConfirm}
        />
      </Box>
    );
  }

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
          borderRadius: 0,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#111111',
          border: '1px solid #333333',
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleComments();
                }}
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                  },
                }}
              >
                <CommentIcon />
              </IconButton>
              <Typography variant="caption" sx={{ color: 'white', display: 'block', mt: 0.5 }}>
                {formatNumber(comments.length)}
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
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

      {/* Dialogs */}
      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        pitchId={pitch.id}
        pitchTitle={pitch.title}
      />

      <CommentsDialog
        open={commentsDialogOpen}
        onClose={() => setCommentsDialogOpen(false)}
        comments={comments}
        pitchTitle={pitch.title}
        onAddComment={handleAddComment}
      />

      <InvestDialog
        open={investDialogOpen}
        onClose={() => setInvestDialogOpen(false)}
        pitch={pitch}
        startup={startup}
        onInvest={handleInvestConfirm}
      />
    </motion.div>
  );
};

export default StartupVideoCard;