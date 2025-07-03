import React, { useState } from 'react';
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
  Tabs,
  Tab,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  TrendingUp,
  Business,
  People,
  LocationOn,
  CalendarToday,
  Assessment,
  Chat,
  Info,
  Videocam,
  ProductionQuantityLimits,
  AttachMoney,
  Timeline,
  Group,
  Gavel,
  Favorite,
  FavoriteBorder,
  CheckCircle,
  Circle,
  PlayArrow,
} from '@mui/icons-material';
import {
  IconButton,
} from '@mui/material';
import { mockStartups, mockPitches } from '../data/mockData';

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
      id={`startup-tabpanel-${index}`}
      aria-labelledby={`startup-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const StartupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState(0); // 0 - Информация о компании, 1 - Видео
  const [infoTab, setInfoTab] = useState(0); // 0 - Продукт, 1 - Финансы, 2 - Дорожная карта, 3 - Команда, 4 - Инвестирование
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Find startup by ID
  const startup = mockStartups.find(s => s.id === id);
  
  // Find startup videos
  const startupVideos = mockPitches.filter(pitch => pitch.startupId === id);
  
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
  
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {startup.companyName}
                </Typography>
                <IconButton 
                  onClick={handleFavoriteToggle}
                  sx={{ 
                    color: isFavorite ? '#FFC107' : '#666666',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    }
                  }}
                >
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Box>
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
            
            <Stack direction="row" spacing={2}>
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
              
              <Button
                variant="outlined"
                size="large"
                startIcon={<Chat />}
                onClick={() => navigate('/chat/1')} // Переход к чату с основателем
                sx={{
                  borderColor: '#667eea',
                  color: '#667eea',
                  minWidth: 180,
                  '&:hover': {
                    borderColor: '#5a6fd8',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  },
                }}
              >
                Написать в чат
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

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

      {/* Main Tabs */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: '#333333' }}>
          <Tabs
            value={mainTab}
            onChange={(e, newValue) => setMainTab(newValue)}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                color: '#cccccc',
                '&.Mui-selected': {
                  color: '#ffffff',
                },
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 600,
                minHeight: '56px',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#ffffff',
              },
            }}
          >
            <Tab icon={<Info sx={{ fontSize: 20, mr: 1 }} />} label="Информация о компании" iconPosition="start" />
            <Tab icon={<Videocam sx={{ fontSize: 20, mr: 1 }} />} label="Видео" iconPosition="start" />
          </Tabs>
        </Box>

        {/* Информация о компании */}
        <TabPanel value={mainTab} index={0}>
          {/* Info Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: '#333333', mb: 3 }}>
            <Tabs
              value={infoTab}
              onChange={(e, newValue) => setInfoTab(newValue)}
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
              <Tab icon={<ProductionQuantityLimits sx={{ fontSize: 18, mr: 1 }} />} label="Продукт" iconPosition="start" />
              <Tab icon={<AttachMoney sx={{ fontSize: 18, mr: 1 }} />} label="Финансы" iconPosition="start" />
              <Tab icon={<Timeline sx={{ fontSize: 18, mr: 1 }} />} label="Дорожная карта" iconPosition="start" />
              <Tab icon={<Group sx={{ fontSize: 18, mr: 1 }} />} label="Команда" iconPosition="start" />
              <Tab icon={<Gavel sx={{ fontSize: 18, mr: 1 }} />} label="Инвестирование" iconPosition="start" />
            </Tabs>
          </Box>

          {/* Продукт */}
          <TabPanel value={infoTab} index={0}>
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                О продукте
              </Typography>
              <Typography variant="body1" paragraph>
                {startup.businessModel || 'Подробная информация о продукте будет представлена здесь. Компания разрабатывает инновационное решение, которое помогает пользователям решать их проблемы более эффективно.'}
              </Typography>
              
              <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                Конкурентные преимущества
              </Typography>
              <Typography variant="body1" paragraph>
                {startup.competitiveAdvantage || 'Уникальные технологии, опытная команда и сильные партнерские отношения обеспечивают конкурентное преимущество на рынке.'}
              </Typography>
              
              <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                Технологии
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {['AI', 'Machine Learning', 'Blockchain', 'Cloud Computing'].map((tech) => (
                  <Grid component="div" item key={tech}>
                    <Chip label={tech} variant="outlined" />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </TabPanel>

          {/* Финансы */}
          <TabPanel value={infoTab} index={1}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Финансовые показатели
            </Typography>
            
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
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
            
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Ключевые метрики
            </Typography>
            
            <Grid container spacing={3}>
              <Grid component="div" item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Месячный рост
                    </Typography>
                    <Typography variant="h5" fontWeight={600} color="success.main">
                      +12.5%
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Стабильный рост на протяжении последних 6 месяцев
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid component="div" item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Средний чек
                    </Typography>
                    <Typography variant="h5" fontWeight={600}>
                      ₽15,000
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Увеличился на 20% по сравнению с прошлым годом
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid component="div" item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      CAC (Стоимость привлечения клиента)
                    </Typography>
                    <Typography variant="h5" fontWeight={600}>
                      ₽2,500
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Снизился на 15% за последний квартал
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid component="div" item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      LTV (Пожизненная ценность клиента)
                    </Typography>
                    <Typography variant="h5" fontWeight={600}>
                      ₽75,000
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Соотношение LTV/CAC: 30x
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Дорожная карта */}
          <TabPanel value={infoTab} index={2}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Дорожная карта развития
            </Typography>
            
            <Box sx={{ position: 'relative', my: 4, ml: 2 }}>
              {/* Вертикальная линия */}
              <Box sx={{ 
                position: 'absolute', 
                left: 12, 
                top: 0, 
                bottom: 0, 
                width: 2, 
                backgroundColor: '#333333',
                zIndex: 0
              }} />
              
              {/* Этапы */}
              <Stack spacing={4}>
                <Box sx={{ position: 'relative', pl: 5 }}>
                  <Box sx={{ 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    backgroundColor: '#4CAF50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1
                  }}>
                    <CheckCircle sx={{ color: '#ffffff', fontSize: 16 }} />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Q1 2024: MVP и первые клиенты
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Запуск минимально жизнеспособного продукта и привлечение первых 100 клиентов. Сбор обратной связи и итерация продукта.
                  </Typography>
                </Box>
                
                <Box sx={{ position: 'relative', pl: 5 }}>
                  <Box sx={{ 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    backgroundColor: '#4CAF50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1
                  }}>
                    <CheckCircle sx={{ color: '#ffffff', fontSize: 16 }} />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Q2 2024: Расширение функционала
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Добавление ключевых функций на основе обратной связи. Оптимизация процессов и улучшение пользовательского опыта.
                  </Typography>
                </Box>
                
                <Box sx={{ position: 'relative', pl: 5 }}>
                  <Box sx={{ 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    backgroundColor: '#FFC107',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1
                  }}>
                    <Circle sx={{ color: '#ffffff', fontSize: 16 }} />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Q3-Q4 2024: Масштабирование
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Активное привлечение новых клиентов и выход на новые рынки. Расширение команды и инфраструктуры.
                  </Typography>
                </Box>
                
                <Box sx={{ position: 'relative', pl: 5 }}>
                  <Box sx={{ 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    backgroundColor: '#666666',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1
                  }}>
                    <Circle sx={{ color: '#ffffff', fontSize: 16 }} />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    2025: Международная экспансия
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Выход на международные рынки и адаптация продукта для глобальной аудитории. Привлечение стратегических партнеров.
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </TabPanel>

          {/* Команда */}
          <TabPanel value={infoTab} index={3}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Наша команда
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid component="div" item xs={12} sm={6} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <Avatar 
                        sx={{ width: 100, height: 100, mb: 2 }}
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
                      />
                      <Typography variant="h6" fontWeight={600}>
                        Алексей Петров
                      </Typography>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        CEO & Founder
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        10+ лет опыта в технологическом секторе. Ранее основал и успешно продал два стартапа.
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid component="div" item xs={12} sm={6} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <Avatar 
                        sx={{ width: 100, height: 100, mb: 2 }}
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                      />
                      <Typography variant="h6" fontWeight={600}>
                        Мария Иванова
                      </Typography>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        CTO
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Эксперт в области машинного обучения и искусственного интеллекта. Опыт работы в ведущих технологических компаниях.
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid component="div" item xs={12} sm={6} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <Avatar 
                        sx={{ width: 100, height: 100, mb: 2 }}
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                      />
                      <Typography variant="h6" fontWeight={600}>
                        Дмитрий Смирнов
                      </Typography>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        CMO
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Специалист по маркетингу с опытом работы в крупных компаниях. Эксперт в области цифрового маркетинга и стратегии роста.
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Инвестирование */}
          <TabPanel value={infoTab} index={4}>
            <Grid container spacing={4}>
              <Grid component="div" item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Условия инвестирования
                </Typography>
                
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <List>
                    <ListItem divider>
                      <ListItemText 
                        primary="Минимальная инвестиция" 
                        secondary="₽50,000"
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        secondaryTypographyProps={{ color: 'white', variant: 'h6', fontWeight: 600 }}
                      />
                    </ListItem>
                    <ListItem divider>
                      <ListItemText 
                        primary="Доля за инвестицию" 
                        secondary="15%"
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        secondaryTypographyProps={{ color: 'white', variant: 'h6', fontWeight: 600 }}
                      />
                    </ListItem>
                    <ListItem divider>
                      <ListItemText 
                        primary="Оценка компании" 
                        secondary="₽25M"
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        secondaryTypographyProps={{ color: 'white', variant: 'h6', fontWeight: 600 }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Тип инвестиции" 
                        secondary="Конвертируемый заем"
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        secondaryTypographyProps={{ color: 'white', variant: 'h6', fontWeight: 600 }}
                      />
                    </ListItem>
                  </List>
                </Card>
                
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Юридические документы
                </Typography>
                
                <List>
                  <ListItem divider>
                    <ListItemIcon>
                      <Assessment sx={{ color: '#4CAF50' }} />
                    </ListItemIcon>
                    <ListItemText primary="Инвестиционный меморандум" />
                  </ListItem>
                  <ListItem divider>
                    <ListItemIcon>
                      <Assessment sx={{ color: '#4CAF50' }} />
                    </ListItemIcon>
                    <ListItemText primary="Договор инвестирования" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Assessment sx={{ color: '#4CAF50' }} />
                    </ListItemIcon>
                    <ListItemText primary="Финансовая модель" />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid component="div" item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Оценка рисков
                </Typography>
                
                <Card variant="outlined">
                  <CardContent>
                    <Stack spacing={3}>
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
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          Конкуренция на рынке умеренная, но есть крупные игроки
                        </Typography>
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
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          Технология проверена и имеет защиту интеллектуальной собственности
                        </Typography>
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
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          Компания еще не достигла точки безубыточности
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Stack direction="row" justifyContent="space-between" mb={1}>
                          <Typography variant="body2">Операционный риск</Typography>
                          <Typography variant="body2" color="success.main">Низкий</Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={25}
                          color="success"
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          Опытная команда с отлаженными процессами
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </TabPanel>

        {/* Видео */}
        <TabPanel value={mainTab} index={1}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Видео стартапа
          </Typography>
          
          <Grid container spacing={3}>
            {startupVideos.length > 0 ? (
              startupVideos.map((video, index) => (
                <Grid component="div" item xs={12} sm={6} md={4} key={video.id}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 4,
                        transition: 'all 0.3s ease',
                      },
                    }}
                  >
                    <Box 
                      sx={{ 
                        position: 'relative',
                        paddingTop: '56.25%', // 16:9 aspect ratio
                        backgroundColor: '#000000',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        component="img"
                        src={video.thumbnail}
                        alt={video.title}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0,0,0,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconButton
                          sx={{
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            color: '#000000',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,1)',
                            },
                          }}
                        >
                          <PlayArrow />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          color: '#ffffff',
                          padding: '2px 6px',
                          borderRadius: 1,
                          fontSize: '12px',
                        }}
                      >
                        {Math.floor(video.duration)}s
                      </Box>
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        {video.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {video.description.length > 100 
                          ? `${video.description.substring(0, 100)}...` 
                          : video.description}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Favorite sx={{ fontSize: 16, mr: 0.5, color: '#ff4757' }} />
                        <Typography variant="caption" color="text.secondary">
                          {video.likes}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(video.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid component="div" item xs={12}>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    У этого стартапа пока нет видео
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </TabPanel>
      </Card>
    </Container>
  );
};

export default StartupDetailPage;