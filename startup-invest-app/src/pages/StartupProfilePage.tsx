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
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  Business,
  TrendingUp,
  Edit,
  Analytics,
  People,
  AttachMoney,
  PlayArrow,
  Language,
  LinkedIn,
  Twitter,
  Email,
  Phone,
  Group,
  Timeline,
  Description,
  Lightbulb,
  Star,
  Visibility,
  ThumbUp,
  Comment,
  Share,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import StartupSettings from '../components/StartupSettings';

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

const StartupProfilePage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock startup data
  const startup = {
    id: '1',
    companyName: 'EcoTech Solutions',
    founderName: 'Мария Иванова',
    email: 'maria@ecotech.ru',
    phone: '+7 (999) 123-45-67',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150',
    location: 'Москва, Россия',
    foundedDate: '2023-03-15',
    industry: 'Экологические технологии',
    stage: 'MVP',
    website: 'https://ecotech-solutions.ru',
    linkedin: 'https://linkedin.com/company/ecotech-solutions',
    description: 'Разрабатываем инновационные решения для переработки пластиковых отходов с использованием ИИ',
    fundingGoal: 5000000,
    currentFunding: 1250000,
    minInvestment: 100000,
    equity: 15,
    teamSize: 8,
    valuation: 25000000,
    businessModel: 'B2B SaaS с элементами marketplace',
    competitiveAdvantage: 'Уникальная технология распознавания типов пластика с точностью 99.2%',
  };

  const teamMembers = [
    {
      id: '1',
      name: 'Мария Иванова',
      role: 'CEO & Founder',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      experience: '10 лет в экологических технологиях',
      linkedin: 'https://linkedin.com/in/maria-ivanova',
    },
    {
      id: '2',
      name: 'Алексей Смирнов',
      role: 'CTO',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      experience: '8 лет в разработке ИИ',
      linkedin: 'https://linkedin.com/in/alexey-smirnov',
    },
    {
      id: '3',
      name: 'Елена Петрова',
      role: 'Head of Sales',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      experience: '6 лет в B2B продажах',
      linkedin: 'https://linkedin.com/in/elena-petrova',
    },
  ];

  const milestones = [
    {
      date: '2024-01-15',
      title: 'Запуск MVP',
      description: 'Успешно запустили минимально жизнеспособный продукт',
      completed: true,
    },
    {
      date: '2024-02-20',
      title: 'Первые клиенты',
      description: 'Привлекли 5 крупных клиентов',
      completed: true,
    },
    {
      date: '2024-03-10',
      title: 'Раунд финансирования',
      description: 'Привлекли 1.25M рублей инвестиций',
      completed: true,
    },
    {
      date: '2024-06-01',
      title: 'Расширение команды',
      description: 'Планируем увеличить команду до 15 человек',
      completed: false,
    },
    {
      date: '2024-08-01',
      title: 'Выход на международный рынок',
      description: 'Запуск в странах СНГ',
      completed: false,
    },
  ];

  const investors = [
    {
      id: '1',
      name: 'Алексей Петров',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      amount: 500000,
      date: '2024-01-15',
      type: 'Частный инвестор',
    },
    {
      id: '2',
      name: 'TechVentures Fund',
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150',
      amount: 750000,
      date: '2024-02-20',
      type: 'Венчурный фонд',
    },
  ];

  const pitchVideo = {
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225',
    title: 'EcoTech Solutions - Революция в переработке пластика',
    duration: '3:45',
    views: 1250,
    likes: 89,
    comments: 23,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const fundingProgress = (startup.currentFunding / startup.fundingGoal) * 100;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#000000', pt: { xs: 7, md: 8 }, pb: { xs: 8, md: 2 } }}>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Profile Header */}
        <Card sx={{ mb: 4, backgroundColor: '#111111', border: '1px solid #333333' }}>
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={startup.companyLogo}
                  sx={{ width: 120, height: 120, border: '3px solid #333333' }}
                />
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  Логотип компании
                </Typography>
              </Box>
              
              <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#ffffff' }}>
                  {startup.companyName}
                </Typography>
                <Typography variant="h6" sx={{ color: '#cccccc' }} gutterBottom>
                  {startup.founderName} - CEO & Founder
                </Typography>
                
                <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }} mb={2} flexWrap="wrap">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ fontSize: 16, mr: 0.5, color: '#cccccc' }} />
                    <Typography variant="body2" sx={{ color: '#cccccc' }}>
                      {startup.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: '#cccccc' }} />
                    <Typography variant="body2" sx={{ color: '#cccccc' }}>
                      Основана {new Date(startup.foundedDate).toLocaleDateString('ru-RU')}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Business sx={{ fontSize: 16, mr: 0.5, color: '#cccccc' }} />
                    <Typography variant="body2" sx={{ color: '#cccccc' }}>
                      {startup.industry}
                    </Typography>
                  </Box>
                </Stack>
                
                <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }} mb={2} flexWrap="wrap">
                  <Chip
                    label={startup.stage}
                    sx={{ 
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      fontWeight: 600
                    }}
                  />
                  <Chip
                    label={`Команда: ${startup.teamSize} чел.`}
                    variant="outlined"
                    sx={{ 
                      borderColor: '#666666',
                      color: '#ffffff'
                    }}
                  />
                </Stack>

                <Typography variant="body1" sx={{ color: '#cccccc', mb: 2 }}>
                  {startup.description}
                </Typography>

                <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <IconButton sx={{ color: '#ffffff' }}>
                    <Language />
                  </IconButton>
                  <IconButton sx={{ color: '#ffffff' }}>
                    <LinkedIn />
                  </IconButton>
                  <IconButton sx={{ color: '#ffffff' }}>
                    <Email />
                  </IconButton>
                </Stack>
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

        {/* Funding Progress */}
        <Card sx={{ mb: 4, backgroundColor: '#111111', border: '1px solid #333333' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>
              Прогресс финансирования
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  Собрано: {formatCurrency(startup.currentFunding)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  Цель: {formatCurrency(startup.fundingGoal)}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={fundingProgress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#333333',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#00ff00',
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: '#00ff00', mt: 1 }}>
                {fundingProgress.toFixed(1)}% от цели
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight={700} sx={{ color: '#ffffff' }}>
                  {formatCurrency(startup.minInvestment)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  Минимальная инвестиция
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight={700} sx={{ color: '#ffffff' }}>
                  {startup.equity}%
                </Typography>
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  Доля в компании
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight={700} sx={{ color: '#ffffff' }}>
                  {formatCurrency(startup.valuation)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  Оценка компании
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

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
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#ffffff',
                },
              }}
            >
              <Tab label="Питч" icon={<PlayArrow />} />
              <Tab label="Команда" icon={<People />} />
              <Tab label="Продукт" icon={<Lightbulb />} />
              <Tab label="Финансы" icon={<AttachMoney />} />
              <Tab label="Дорожная карта" icon={<Timeline />} />
              <Tab label="Инвесторы" icon={<Group />} />
              <Tab label="Настройки" icon={<Edit />} />
            </Tabs>
          </Box>

          {/* Питч */}
          <TabPanel value={tabValue} index={0}>
            <Stack spacing={3}>
              {/* Видео питч */}
              <Card variant="outlined" sx={{ backgroundColor: '#222222', border: '1px solid #444444' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 300,
                    backgroundImage: `url(${pitchVideo.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      '& .play-button': {
                        transform: 'scale(1.1)',
                      },
                    },
                  }}
                >
                  <Box
                    className="play-button"
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <PlayArrow sx={{ fontSize: 40, color: '#000000', ml: 1 }} />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      color: '#ffffff',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.875rem',
                    }}
                  >
                    {pitchVideo.duration}
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>
                    {pitchVideo.title}
                  </Typography>
                  <Stack direction="row" spacing={3} sx={{ color: '#cccccc' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Visibility sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2">{pitchVideo.views}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ThumbUp sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2">{pitchVideo.likes}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Comment sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2">{pitchVideo.comments}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Описание проблемы и решения */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <Box sx={{ flex: 1 }}>
                  <Card variant="outlined" sx={{ backgroundColor: '#222222', border: '1px solid #444444', height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>
                        Проблема
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#cccccc' }}>
                        Ежегодно в мире производится более 300 миллионов тонн пластиковых отходов, 
                        из которых перерабатывается менее 10%. Существующие методы сортировки 
                        неэффективны и требуют больших затрат человеческих ресурсов.
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Card variant="outlined" sx={{ backgroundColor: '#222222', border: '1px solid #444444', height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>
                        Решение
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#cccccc' }}>
                        Наша ИИ-платформа автоматически распознает и сортирует пластиковые отходы 
                        с точностью 99.2%, увеличивая эффективность переработки в 5 раз и 
                        снижая операционные расходы на 40%.
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Stack>
            </Stack>
          </TabPanel>

          {/* Команда */}
          <TabPanel value={tabValue} index={1}>
            <Stack component="div" direction={{ xs: 'column', md: 'row' }} spacing={3} flexWrap="wrap">
              {teamMembers.map((member, index) => (
                <Box key={member.id} sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card variant="outlined" sx={{ backgroundColor: '#222222', border: '1px solid #444444', height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Avatar
                          src={member.avatar}
                          sx={{ width: 80, height: 80, mx: 'auto', mb: 2, border: '2px solid #333333' }}
                        />
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>
                          {member.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#00ff00', mb: 1 }}>
                          {member.role}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#cccccc', mb: 2 }}>
                          {member.experience}
                        </Typography>
                        <IconButton sx={{ color: '#ffffff' }}>
                          <LinkedIn />
                        </IconButton>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Box>
              ))}
            </Stack>
          </TabPanel>

          {/* Продукт */}
          <TabPanel value={tabValue} index={2}>
            <Stack spacing={3}>
              <Card variant="outlined" sx={{ backgroundColor: '#222222', border: '1px solid #444444' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>
                    Бизнес-модель
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#cccccc' }}>
                    {startup.businessModel}
                  </Typography>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ backgroundColor: '#222222', border: '1px solid #444444' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>
                    Конкурентное преимущество
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#cccccc' }}>
                    {startup.competitiveAdvantage}
                  </Typography>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ backgroundColor: '#222222', border: '1px solid #444444' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>
                    Ключевые метрики
                  </Typography>
                  <Stack component="div" direction={{ xs: 'column', md: 'row' }} spacing={2} flexWrap="wrap">
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(25% - 12px)' }, textAlign: 'center' }}>
                      <Typography variant="h4" fontWeight={700} sx={{ color: '#00ff00' }}>
                        99.2%
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#cccccc' }}>
                        Точность распознавания
                      </Typography>
                    </Box>
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(25% - 12px)' }, textAlign: 'center' }}>
                      <Typography variant="h4" fontWeight={700} sx={{ color: '#00ff00' }}>
                        5x
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#cccccc' }}>
                        Увеличение эффективности
                      </Typography>
                    </Box>
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(25% - 12px)' }, textAlign: 'center' }}>
                      <Typography variant="h4" fontWeight={700} sx={{ color: '#00ff00' }}>
                        40%
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#cccccc' }}>
                        Снижение расходов
                      </Typography>
                    </Box>
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(25% - 12px)' }, textAlign: 'center' }}>
                      <Typography variant="h4" fontWeight={700} sx={{ color: '#00ff00' }}>
                        15
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#cccccc' }}>
                        Типов пластика
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </TabPanel>

          {/* Финансы */}
          <TabPanel value={tabValue} index={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              <Box sx={{ flex: 1 }}>
                <Card variant="outlined" sx={{ backgroundColor: '#222222', border: '1px solid #444444' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>
                      Использование средств
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Stack direction="row" justifyContent="space-between" mb={1}>
                          <Typography variant="body2" sx={{ color: '#cccccc' }}>
                            Разработка продукта
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#ffffff' }}>
                            40%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={40}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#333333',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#00ff00',
                            },
                          }}
                        />
                      </Box>
                      <Box>
                        <Stack direction="row" justifyContent="space-between" mb={1}>
                          <Typography variant="body2" sx={{ color: '#cccccc' }}>
                            Маркетинг и продажи
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#ffffff' }}>
                            30%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={30}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#333333',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#00ff00',
                            },
                          }}
                        />
                      </Box>
                      <Box>
                        <Stack direction="row" justifyContent="space-between" mb={1}>
                          <Typography variant="body2" sx={{ color: '#cccccc' }}>
                            Команда
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#ffffff' }}>
                            20%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={20}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#333333',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#00ff00',
                            },
                          }}
                        />
                      </Box>
                      <Box>
                        <Stack direction="row" justifyContent="space-between" mb={1}>
                          <Typography variant="body2" sx={{ color: '#cccccc' }}>
                            Операционные расходы
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#ffffff' }}>
                            10%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={10}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#333333',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#00ff00',
                            },
                          }}
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Card variant="outlined" sx={{ backgroundColor: '#222222', border: '1px solid #444444' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>
                      Финансовые показатели
                    </Typography>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#cccccc' }}>
                          Месячная выручка
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ffffff' }}>
                          ₽450,000
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#cccccc' }}>
                          Рост MRR
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#00ff00' }}>
                          +25% м/м
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#cccccc' }}>
                          Количество клиентов
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ffffff' }}>
                          12
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#cccccc' }}>
                          LTV/CAC
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#00ff00' }}>
                          4.2
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#cccccc' }}>
                          Burn rate
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ffffff' }}>
                          ₽280,000/мес
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#cccccc' }}>
                          Runway
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ffffff' }}>
                          18 месяцев
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </Stack>
          </TabPanel>

          {/* Дорожная карта */}
          <TabPanel value={tabValue} index={4}>
            <List>
              {milestones.map((milestone, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        backgroundColor: milestone.completed ? '#00ff00' : '#333333',
                        color: milestone.completed ? '#000000' : '#ffffff',
                        width: 40,
                        height: 40,
                      }}
                    >
                      {milestone.completed ? <Star /> : <Timeline />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ color: '#ffffff' }}>
                        {milestone.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ color: '#cccccc', mb: 1 }}>
                          {milestone.description}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666666' }}>
                          {new Date(milestone.date).toLocaleDateString('ru-RU')}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </TabPanel>

          {/* Инвесторы */}
          <TabPanel value={tabValue} index={5}>
            <Stack spacing={3}>
              {investors.map((investor, index) => (
                <motion.div
                  key={investor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card variant="outlined" sx={{ backgroundColor: '#222222', border: '1px solid #444444' }}>
                    <CardContent>
                      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="start" spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            src={investor.avatar}
                            sx={{ width: 60, height: 60, border: '2px solid #333333' }}
                          />
                          <Box>
                            <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
                              {investor.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#cccccc' }}>
                              {investor.type}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666666' }}>
                              {new Date(investor.date).toLocaleDateString('ru-RU')}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                          <Typography variant="h6" fontWeight={600} sx={{ color: '#00ff00' }}>
                            {formatCurrency(investor.amount)}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#cccccc' }}>
                            Инвестиция
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Stack>
          </TabPanel>

          {/* Настройки */}
          <TabPanel value={tabValue} index={6}>
            <StartupSettings />
          </TabPanel>
        </Card>
      </Container>
    </Box>
  );
};

export default StartupProfilePage;