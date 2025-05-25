import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import StartupVideoCard from '../components/StartupVideoCard';
import { mockPitches, mockStartups } from '../data/mockData';
import { StartupPitch, Startup } from '../types';

const FeedPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pitches, setPitches] = useState<StartupPitch[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPitches(mockPitches);
  }, []);

  const getStartupForPitch = (pitchId: string): Startup | undefined => {
    const pitch = pitches.find(p => p.id === pitchId);
    return pitch ? mockStartups.find(s => s.id === pitch.startupId) : undefined;
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
      {/* Video Cards Container */}
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

          const isActive = index === currentIndex;
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
              />
            </motion.div>
          );
        })}
      </Box>

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

          <Fade in={currentIndex < pitches.length - 1}>
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
        {pitches.map((_, index) => (
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
          {currentIndex + 1} из {pitches.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeedPage;