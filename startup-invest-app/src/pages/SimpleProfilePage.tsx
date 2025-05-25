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
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  Business,
  TrendingUp,
  Edit,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

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
              sx={{
                '& .MuiTab-root': {
                  color: '#cccccc',
                  '&.Mui-selected': {
                    color: '#ffffff',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#ffffff',
                },
              }}
            >
              <Tab label="Мои инвестиции" />
              <Tab label="Портфолио" />
              <Tab label="Настройки" />
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
            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
              Анализ портфолио
            </Typography>
            <Typography variant="body2" sx={{ color: '#cccccc' }}>
              Здесь будет детальная аналитика вашего инвестиционного портфолио
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
              Настройки аккаунта
            </Typography>
            <Typography variant="body2" sx={{ color: '#cccccc' }}>
              Управление настройками профиля и уведомлений
            </Typography>
          </TabPanel>
        </Card>
      </Container>
    </Box>
  );
};

export default ProfilePage;