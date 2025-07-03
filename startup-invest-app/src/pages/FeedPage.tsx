import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Fade,
  Tabs,
  Tab,
} from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Subscriptions,
  Explore,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import StartupVideoCard from '../components/StartupVideoCard';
import { mockPitches, mockStartups } from '../data/mockData';
import { StartupPitch, Startup } from '../types';

const FeedPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedTab, setFeedTab] = useState(0); // 0 - Рекомендации, 1 - Подписки
  const [pitches, setPitches] = useState<StartupPitch[]>([]);
  const [subscriptionPitches, setSubscriptionPitches] = useState<StartupPitch[]>([]);
  const [subscribedStartups, setSubscribedStartups] = useState<string[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPitches(mockPitches);
    // Инициализируем подписки на несколько стартапов для демонстрации
    const initialSubscriptions = ['startup1', 'startup3', 'startup5'];
    setSubscribedStartups(initialSubscriptions);
    
    // Фильтруем питчи только от стартапов, на которые подписан пользователь
    const filteredPitches = mockPitches.filter(pitch => {
      const startup = mockStartups.find(s => s.id === pitch.startupId);
      return startup && initialSubscriptions.includes(startup.id);
    });
    setSubscriptionPitches(filteredPitches);
  }, []);

  const getStartupForPitch = (pitchId: string, source: StartupPitch[] = pitches): Startup | undefined => {
    const pitch = source.find(p => p.id === pitchId);
    return pitch ? mockStartups.find(s => s.id === pitch.startupId) : undefined;
  };
  
  // Функция для подписки/отписки от стартапа
  const handleSubscribe = (startupId: string) => {
    if (subscribedStartups.includes(startupId)) {
      // Отписываемся
      const newSubscriptions = subscribedStartups.filter(id => id !== startupId);
      setSubscribedStartups(newSubscriptions);
      
      // Обновляем ленту подписок
      const newSubscriptionPitches = mockPitches.filter(pitch => {
        const startup = mockStartups.find(s => s.id === pitch.startupId);
        return startup && newSubscriptions.includes(startup.id);
      });
      setSubscriptionPitches(newSubscriptionPitches);
    } else {
      // Подписываемся
      const newSubscriptions = [...subscribedStartups, startupId];
      setSubscribedStartups(newSubscriptions);
      
      // Обновляем ленту подписок
      const newSubscriptionPitches = mockPitches.filter(pitch => {
        const startup = mockStartups.find(s => s.id === pitch.startupId);
        return startup && newSubscriptions.includes(startup.id);
      });
      setSubscriptionPitches(newSubscriptionPitches);
    }
  };

  const handleInvest = (pitchId: string) => {
    console.log('Investing in pitch:', pitchId);
  };

  const scrollToNext = () => {
    if (currentIndex < pitches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle wheel/touch events for scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        scrollToNext();
      } else {
        scrollToPrev();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentIndex, pitches.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, pitches.length]);

  if (pitches.length === 0) {
    return (
      <Box 
        sx={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#000000'
        }}
      >
        <Typography variant="h6" color="white">
          Загрузка...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000000',
        paddingTop: isMobile ? '56px' : '64px', // Account for top navigation
        paddingBottom: isMobile ? '60px' : 0, // Account for bottom navigation
      }}
    >
      {/* Tabs for switching between Recommendations and Subscriptions */}
      <Box sx={{ 
        position: 'absolute', 
        top: isMobile ? 56 : 64, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Tabs
          value={feedTab}
          onChange={(e, newValue) => {
            setFeedTab(newValue);
            setCurrentIndex(0); // Reset index when switching tabs
          }}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              color: '#888888',
              fontWeight: 600,
              fontSize: '14px',
              textTransform: 'none',
              minHeight: '48px',
              '&.Mui-selected': {
                color: '#ffffff',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#ffffff',
            },
          }}
        >
          <Tab icon={<Explore sx={{ fontSize: 20, mr: 1 }} />} label="Рекомендации" iconPosition="start" />
          <Tab icon={<Subscriptions sx={{ fontSize: 20, mr: 1 }} />} label="Подписки" iconPosition="start" />
        </Tabs>
      </Box>

      {/* SwipeableViews for horizontal swiping between tabs */}
      <SwipeableViews
        axis="x"
        index={feedTab}
        onChangeIndex={(index) => setFeedTab(index)}
        style={{ height: '100%', width: '100%', marginTop: 48 }} // Add margin for tabs
        containerStyle={{ height: '100%', width: '100%' }}
        slideStyle={{ height: '100%', width: '100%' }}
        resistance
      >
        {/* Recommendations Feed */}
        <Box
          sx={{
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
        >
          {pitches.map((pitch, index) => {
            const startup = getStartupForPitch(pitch.id);
            if (!startup) return null;

            const isActive = index === currentIndex && feedTab === 0;
            const offset = (index - currentIndex) * 100;

            return (
              <motion.div
                key={pitch.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  transform: `translateY(${offset}%)`,
                }}
                animate={{
                  transform: `translateY(${offset}%)`,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
              >
                <StartupVideoCard
                  pitch={pitch}
                  startup={startup}
                  autoPlay={isActive}
                  onInvest={handleInvest}
                  fullScreen={true}
                  isSubscribed={subscribedStartups.includes(startup.id)}
                  onSubscribe={() => handleSubscribe(startup.id)}
                />
              </motion.div>
            );
          })}
        </Box>

        {/* Subscriptions Feed */}
        <Box
          sx={{
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
        >
          {subscriptionPitches.length > 0 ? (
            subscriptionPitches.map((pitch, index) => {
              const startup = getStartupForPitch(pitch.id, subscriptionPitches);
              if (!startup) return null;

              const isActive = index === currentIndex && feedTab === 1;
              const offset = (index - currentIndex) * 100;

              return (
                <motion.div
                  key={pitch.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    transform: `translateY(${offset}%)`,
                  }}
                  animate={{
                    transform: `translateY(${offset}%)`,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  <StartupVideoCard
                    pitch={pitch}
                    startup={startup}
                    autoPlay={isActive}
                    onInvest={handleInvest}
                    fullScreen={true}
                    isSubscribed={true}
                    onSubscribe={() => handleSubscribe(startup.id)}
                  />
                </motion.div>
              );
            })
          ) : (
            <Box 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column',
                p: 3
              }}
            >
              <Typography variant="h6" color="white" align="center" gutterBottom>
                У вас пока нет подписок
              </Typography>
              <Typography variant="body1" color="#888888" align="center">
                Подпишитесь на интересные стартапы, чтобы видеть их видео здесь
              </Typography>
            </Box>
          )}
      </Box>
      </SwipeableViews>

      {/* Navigation Arrows (Desktop) */}
      {!isMobile && (
        <>
          <Fade in={currentIndex > 0}>
            <IconButton
              onClick={scrollToPrev}
              sx={{
                position: 'fixed',
                top: '50%',
                right: 20,
                transform: 'translateY(-100%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                },
                zIndex: 1000,
              }}
            >
              <KeyboardArrowUp />
            </IconButton>
          </Fade>

          <Fade in={(feedTab === 0 && currentIndex < pitches.length - 1) || 
                    (feedTab === 1 && currentIndex < subscriptionPitches.length - 1)}>
            <IconButton
              onClick={scrollToNext}
              sx={{
                position: 'fixed',
                top: '50%',
                right: 20,
                transform: 'translateY(0%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                },
                zIndex: 1000,
              }}
            >
              <KeyboardArrowDown />
            </IconButton>
          </Fade>
        </>
      )}

      {/* Progress Indicator */}
      <Box
        sx={{
          position: 'fixed',
          right: isMobile ? 8 : 20,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          zIndex: 1000,
        }}
      >
        {(feedTab === 0 ? pitches : subscriptionPitches).map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 3,
              height: index === currentIndex ? 20 : 8,
              backgroundColor: index === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.3)',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>

      {/* Current Video Info */}
      <Box
        sx={{
          position: 'fixed',
          bottom: isMobile ? 80 : 20,
          left: 20,
          color: 'white',
          zIndex: 1000,
        }}
      >
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          {currentIndex + 1} из {feedTab === 0 ? pitches.length : subscriptionPitches.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeedPage;