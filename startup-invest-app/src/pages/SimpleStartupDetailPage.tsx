import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  Stack,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  Business,
  People,
  LocationOn,
  CalendarToday,
  Assessment,
} from '@mui/icons-material';
import { mockStartups } from '../data/mockData';

const StartupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find startup by ID
  const startup = mockStartups.find(s => s.id === id);
  
  if (!startup) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Стартап не найден</Typography>
      </Container>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const progressPercentage = (startup.fundingRaised / startup.fundingGoal) * 100;

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="start">
            <Avatar
              src={startup.avatar}
              sx={{ width: 100, height: 100 }}
            />
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {startup.companyName}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {startup.description}
              </Typography>
              
              <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
                <Chip label={startup.industry} color="primary" />
                <Chip label={startup.stage} color="secondary" />
                <Chip label={startup.location} variant="outlined" />
              </Stack>
              
              <Stack direction="row" spacing={3} mb={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <People sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {startup.teamSize} в команде
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Основана в {startup.foundedYear}
                  </Typography>
                </Box>
              </Stack>
            </Box>
            
            <Button
              variant="contained"
              size="large"
              startIcon={<TrendingUp />}
              onClick={() => navigate(`/invest/${startup.id}`)}
              sx={{
                background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                minWidth: 200,
                '&:hover': {
                  background: 'linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%)',
                },
              }}
            >
              Инвестировать
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
        {/* Main Content */}
        <Box sx={{ flex: 2 }}>
          {/* Funding Progress */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Прогресс финансирования
              </Typography>
              
              <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                  {formatCurrency(startup.fundingRaised)}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  из {formatCurrency(startup.fundingGoal)}
                </Typography>
              </Stack>
              
              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                sx={{ height: 12, borderRadius: 6, mb: 2 }}
              />
              
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  {Math.round(progressPercentage)}% собрано
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {startup.investors} инвесторов
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* Business Model */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Бизнес-модель
              </Typography>
              <Typography variant="body1" paragraph>
                {startup.businessModel || 'Подробная информация о бизнес-модели будет представлена здесь. Компания использует инновационный подход к решению проблем в своей отрасли.'}
              </Typography>
              
              <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                Конкурентные преимущества
              </Typography>
              <Typography variant="body1">
                {startup.competitiveAdvantage || 'Уникальные технологии, опытная команда и сильные партнерские отношения обеспечивают конкурентное преимущество на рынке.'}
              </Typography>
            </CardContent>
          </Card>

          {/* Financial Metrics */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Финансовые показатели
              </Typography>
              
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <Paper sx={{ p: 2, textAlign: 'center', flex: 1 }}>
                  <Typography variant="h5" fontWeight={600} color="primary.main">
                    ₽2.1M
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Выручка 2023
                  </Typography>
                </Paper>
                
                <Paper sx={{ p: 2, textAlign: 'center', flex: 1 }}>
                  <Typography variant="h5" fontWeight={600} color="success.main">
                    ₽3.8M
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Выручка 2024
                  </Typography>
                </Paper>
                
                <Paper sx={{ p: 2, textAlign: 'center', flex: 1 }}>
                  <Typography variant="h5" fontWeight={600} color="secondary.main">
                    ₽7.2M
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Прогноз 2025
                  </Typography>
                </Paper>
              </Stack>
              
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mt={3}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Месячный рост
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="success.main">
                    +12.5%
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Средний чек
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    ₽15,000
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Sidebar */}
        <Box sx={{ flex: 1 }}>
          {/* Investment Terms */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Условия инвестирования
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Минимальная инвестиция
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    ₽50,000
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Доля за инвестицию
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    15%
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Оценка компании
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    ₽25M
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Team */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Команда
              </Typography>
              
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
                    АП
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      Алексей Петров
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      CEO & Founder
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
                    МИ
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      Мария Иванова
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      CTO
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Оценка рисков
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Рыночный риск</Typography>
                    <Typography variant="body2" color="warning.main">Средний</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={60}
                    color="warning"
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
                
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Технологический риск</Typography>
                    <Typography variant="body2" color="success.main">Низкий</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={30}
                    color="success"
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
                
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Финансовый риск</Typography>
                    <Typography variant="body2" color="warning.main">Средний</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={50}
                    color="warning"
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Container>
  );
};

export default StartupDetailPage;