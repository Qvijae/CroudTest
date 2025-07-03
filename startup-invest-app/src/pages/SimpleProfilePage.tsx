import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
  Stack,
  Grid,
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  Business,
  TrendingUp,
  Edit,
  Analytics,
  Favorite,
  Settings,
  Security,
} from '@mui/icons-material';
import {
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import PortfolioAnalytics from '../components/PortfolioAnalyticsSimple';
import InvestorSettings from '../components/InvestorSettings';
import { mockStartups } from '../data/mockData';

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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const ProfilePage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock user data
  const user = {
    name: 'Алексей Петров',
    email: 'alexey.petrov@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    location: 'Москва, Россия',
    joinDate: '2023-01-15',
    userType: 'Инвестор',
    totalInvested: 2500000,
    activeInvestments: 8,
    successfulExits: 3,
  };

  const investments = [
    {
      id: '1',
      companyName: 'EcoTech Solutions',
      amount: 500000,
      date: '2024-01-15',
      status: 'Активная',
      returns: 15.5,
    },
    {
      id: '2',
      companyName: 'FinanceBot',
      amount: 750000,
      date: '2023-11-20',
      status: 'Активная',
      returns: 22.3,
    },
    {
      id: '3',
      companyName: 'HealthTracker',
      amount: 300000,
      date: '2023-09-10',
      status: 'Завершена',
      returns: 45.2,
    },
  ];
  
  // Избранные стартапы (для демонстрации)
  const favoriteStartups = mockStartups.slice(0, 4);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#000000', pt: { xs: 7, md: 8 }, pb: { xs: 8, md: 2 } }}>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Profile Header */}
        <Card sx={{ mb: 4, backgroundColor: '#111111', border: '1px solid #333333' }}>
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
              <Avatar
                src={user.avatar}
                sx={{ width: 120, height: 120, border: '3px solid #333333' }}
              />
              
              <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#ffffff' }}>
                  {user.name}
                </Typography>
                <Typography variant="body1" sx={{ color: '#cccccc' }} gutterBottom>
                  {user.email}
                </Typography>
                
                <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }} mb={2} flexWrap="wrap">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ fontSize: 16, mr: 0.5, color: '#cccccc' }} />
                    <Typography variant="body2" sx={{ color: '#cccccc' }}>
                      {user.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: '#cccccc' }} />
                    <Typography variant="body2" sx={{ color: '#cccccc' }}>
                      С {new Date(user.joinDate).toLocaleDateString('ru-RU')}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Business sx={{ fontSize: 16, mr: 0.5, color: '#cccccc' }} />
                    <Typography variant="body2" sx={{ color: '#cccccc' }}>
                      {user.userType}
                    </Typography>
                  </Box>
                </Stack>
                
                <Chip
                  label={user.userType}
                  sx={{ 
                    mb: 2,
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    fontWeight: 600
                  }}
                />
              </Box>
              
              <Button
                variant="outlined"
                startIcon={<Edit />}
                sx={{
                  borderColor: '#666666',
                  color: '#ffffff',
                  alignSelf: { xs: 'center', md: 'flex-start' },
                  '&:hover': {
                    borderColor: '#888888',
                    backgroundColor: '#222222',
                  }
                }}
              >
                Редактировать профиль
              </Button>
          </Stack>
        </CardContent>
      </Card>

        {/* Stats Cards */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={4}>
          <Card sx={{ flex: 1, backgroundColor: '#111111', border: '1px solid #333333' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff' }}>
                {formatCurrency(user.totalInvested)}
              </Typography>
              <Typography variant="body2" sx={{ color: '#cccccc' }}>
                Общая сумма инвестиций
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1, backgroundColor: '#111111', border: '1px solid #333333' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff' }}>
                {user.activeInvestments}
              </Typography>
              <Typography variant="body2" sx={{ color: '#cccccc' }}>
                Активных инвестиций
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1, backgroundColor: '#111111', border: '1px solid #333333' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff' }}>
                {user.successfulExits}
              </Typography>
              <Typography variant="body2" sx={{ color: '#cccccc' }}>
                Успешных выходов
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Tabs */}
        <Card sx={{ backgroundColor: '#111111', border: '1px solid #333333' }}>
          <Box sx={{ borderBottom: 1, borderColor: '#333333' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  color: '#cccccc',
                  '&.Mui-selected': {
                    color: '#ffffff',
                  },
                  textTransform: 'none',
                  fontSize: '14px',
                  minHeight: '48px',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#ffffff',
                },
              }}
            >
              <Tab label="Мои инвестиции" icon={<TrendingUp sx={{ fontSize: 20 }} />} iconPosition="start" />
              <Tab label="Избранное" icon={<Favorite sx={{ fontSize: 20 }} />} iconPosition="start" />
              <Tab label="Аналитика портфеля" icon={<Analytics sx={{ fontSize: 20 }} />} iconPosition="start" />
              <Tab label="Настройки" icon={<Settings sx={{ fontSize: 20 }} />} iconPosition="start" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Stack spacing={3}>
              {investments.map((investment, index) => (
                <motion.div
                  key={investment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card variant="outlined" sx={{ backgroundColor: '#222222', border: '1px solid #444444' }}>
                    <CardContent>
                      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="start" spacing={2}>
                        <Box>
                          <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>
                            {investment.companyName}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#cccccc' }} gutterBottom>
                            Инвестировано: {formatCurrency(investment.amount)}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#cccccc' }}>
                            Дата: {new Date(investment.date).toLocaleDateString('ru-RU')}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                          <Chip
                            label={investment.status}
                            sx={{ 
                              mb: 1,
                              backgroundColor: investment.status === 'Активная' ? '#ffffff' : '#00ff00',
                              color: investment.status === 'Активная' ? '#000000' : '#000000',
                              fontWeight: 600
                            }}
                          />
                          <Typography variant="h6" fontWeight={600} sx={{ color: '#00ff00' }}>
                            +{investment.returns}%
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#cccccc' }}>
                            Доходность
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Stack>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ py: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mb: 3 }}>
                Избранные стартапы
              </Typography>
              
              <Grid container spacing={3}>
                {favoriteStartups.map((startup) => (
                  <Grid item xs={12} sm={6} md={4} key={startup.id}>
                    <Card 
                      sx={{ 
                        backgroundColor: '#222222', 
                        border: '1px solid #444444',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                          borderColor: '#666666',
                        },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box 
                        sx={{ 
                          height: 140, 
                          overflow: 'hidden',
                          position: 'relative',
                        }}
                      >
                        <Box
                          component="img"
                          src={`https://source.unsplash.com/random/400x200?${startup.industry.toLowerCase()}`}
                          alt={startup.companyName}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            p: 1,
                          }}
                        >
                          <IconButton
                            sx={{
                              backgroundColor: 'rgba(0,0,0,0.5)',
                              color: '#FFC107',
                              '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.7)',
                              },
                            }}
                          >
                            <Favorite fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar 
                            src={startup.avatar} 
                            sx={{ width: 40, height: 40, mr: 1.5 }}
                          />
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#ffffff' }}>
                              {startup.companyName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#999999' }}>
                              {startup.industry}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Typography variant="body2" sx={{ color: '#cccccc', mb: 2, flexGrow: 1 }}>
                          {startup.description.length > 100 
                            ? `${startup.description.substring(0, 100)}...` 
                            : startup.description}
                        </Typography>
                        
                        <Box sx={{ mb: 1.5 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="caption" sx={{ color: '#999999' }}>
                              Собрано
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#ffffff' }}>
                              {Math.round((startup.fundingRaised / startup.fundingGoal) * 100)}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(startup.fundingRaised / startup.fundingGoal) * 100}
                            sx={{ 
                              height: 4, 
                              borderRadius: 2,
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: '#ffffff',
                              }
                            }}
                          />
                        </Box>
                        
                        <Button 
                          variant="outlined"
                          fullWidth
                          onClick={() => {}}
                          sx={{
                            borderColor: '#666666',
                            color: '#ffffff',
                            '&:hover': {
                              borderColor: '#ffffff',
                              backgroundColor: 'rgba(255,255,255,0.1)',
                            },
                            textTransform: 'none',
                          }}
                        >
                          Подробнее
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <PortfolioAnalytics />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <InvestorSettings />
          </TabPanel>
        </Card>
      </Container>
    </Box>
  );
};

export default ProfilePage;