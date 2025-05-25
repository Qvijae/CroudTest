import React, { useState, useEffect } from 'react';
import {
  Container,
  Stack,
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp,
  Star,
  AccessTime,
  LocalFireDepartment,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import StartupVideoCard from '../components/StartupVideoCard';
import { mockPitches, mockStartups, mockOpportunities } from '../data/mockData';
import { StartupPitch, Startup, InvestmentOpportunity } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`feed-tabpanel-${index}`}
      aria-labelledby={`feed-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const FeedPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [pitches, setPitches] = useState<StartupPitch[]>([]);
  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Simulate loading data
    setPitches(mockPitches);
    setOpportunities(mockOpportunities);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStartupForPitch = (pitchId: string): Startup | undefined => {
    const pitch = pitches.find(p => p.id === pitchId);
    return pitch ? mockStartups.find(s => s.id === pitch.startupId) : undefined;
  };

  const handleInvest = (pitchId: string) => {
    console.log('Investing in pitch:', pitchId);
    // Here you would navigate to investment page or open investment modal
  };

  const trendingPitches = pitches.filter((_, index) => index < 3);
  const recentPitches = pitches.slice().sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Лента стартапов
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Откройте для себя инновационные стартапы и инвестируйте в будущее
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            mb: 3,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minWidth: 'auto',
              mr: 2,
            },
          }}
        >
          <Tab
            icon={<LocalFireDepartment />}
            iconPosition="start"
            label="Популярные"
          />
          <Tab
            icon={<AccessTime />}
            iconPosition="start"
            label="Новые"
          />
          <Tab
            icon={<TrendingUp />}
            iconPosition="start"
            label="Трендовые"
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', gap: 3 }}>
          {pitches.map((pitch, index) => {
            const startup = getStartupForPitch(pitch.id);
            if (!startup) return null;
            
            return (
              <motion.div
                key={pitch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                style={{ flex: '1 1 300px', maxWidth: '400px' }}
              >
                <StartupVideoCard
                  pitch={pitch}
                  startup={startup}
                  autoPlay={index === 0}
                  onInvest={handleInvest}
                />
              </motion.div>
            );
          })}
        </Stack>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', gap: 3 }}>
          {recentPitches.map((pitch, index) => {
            const startup = getStartupForPitch(pitch.id);
            if (!startup) return null;
            
            return (
              <motion.div
                key={pitch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                style={{ flex: '1 1 300px', maxWidth: '400px' }}
              >
                <StartupVideoCard
                  pitch={pitch}
                  startup={startup}
                  onInvest={handleInvest}
                />
              </motion.div>
            );
          })}
        </Stack>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', gap: 3 }}>
          {trendingPitches.map((pitch, index) => {
            const startup = getStartupForPitch(pitch.id);
            if (!startup) return null;
            
            return (
              <motion.div
                key={pitch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                style={{ flex: '1 1 300px', maxWidth: '400px' }}
              >
                <StartupVideoCard
                  pitch={pitch}
                  startup={startup}
                  onInvest={handleInvest}
                />
              </motion.div>
            );
          })}
        </Stack>
      </TabPanel>

      {/* Stats Card */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Статистика платформы
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} color="primary.main">
                127
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Активных стартапов
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} color="secondary.main">
                ₽2.4M
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Инвестировано
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} color="success.main">
                89%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Успешных сделок
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            Присоединяйтесь к сообществу инвесторов и стартапов
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FeedPage;