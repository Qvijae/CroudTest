import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  Avatar,
  Button,
  LinearProgress,
  Stack,
  Tabs,
  Tab,
  Grid,
  Paper,
} from '@mui/material';
import {
  Search,
  FilterList,
  TrendingUp,
  Business,
  LocationOn,
  Person,
  People,
  Apartment,
  Chat,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { mockStartups } from '../data/mockData';

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [fundingRange, setFundingRange] = useState([0, 10000000]);
  const [searchType, setSearchType] = useState(0); // 0 - Стартапы, 1 - Инвесторы

  const industries = ['Технологии', 'Финтех', 'Здравоохранение', 'E-commerce', 'Образование'];
  const stages = ['Идея', 'MVP', 'Рост', 'Масштабирование'];
  
  // Моковые данные для инвесторов
  const mockInvestors = [
    {
      id: 'inv1',
      name: 'Александр Иванов',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      location: 'Москва, Россия',
      investmentRange: { min: 500000, max: 5000000 },
      sectors: ['Технологии', 'Финтех'],
      totalInvestments: 12,
      successfulInvestments: 8,
      bio: 'Опытный инвестор с фокусом на технологические стартапы и финтех-решения. Более 10 лет опыта в венчурном инвестировании.',
    },
    {
      id: 'inv2',
      name: 'Елена Петрова',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      location: 'Санкт-Петербург, Россия',
      investmentRange: { min: 1000000, max: 10000000 },
      sectors: ['Здравоохранение', 'Образование'],
      totalInvestments: 8,
      successfulInvestments: 5,
      bio: 'Инвестор в сфере здравоохранения и образовательных технологий. Предпочитаю проекты с социальным воздействием и долгосрочным потенциалом.',
    },
    {
      id: 'inv3',
      name: 'Дмитрий Смирнов',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'Казань, Россия',
      investmentRange: { min: 300000, max: 3000000 },
      sectors: ['E-commerce', 'Технологии'],
      totalInvestments: 15,
      successfulInvestments: 10,
      bio: 'Серийный предприниматель и инвестор. Специализируюсь на e-commerce проектах и технологических решениях для бизнеса.',
    },
  ];

  // Маппинг русских названий стадий к английским значениям в данных
  const stageMapping: { [key: string]: string } = {
    'Идея': 'idea',
    'MVP': 'mvp',
    'Рост': 'early',
    'Масштабирование': 'scale'
  };

  const filteredStartups = mockStartups.filter(startup => {
    const matchesSearch = startup.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !selectedIndustry || startup.industry === selectedIndustry;
    const matchesStage = !selectedStage || startup.stage === stageMapping[selectedStage];
    const matchesFunding = startup.fundingGoal >= fundingRange[0] && startup.fundingGoal <= fundingRange[1];
    
    return matchesSearch && matchesIndustry && matchesStage && matchesFunding;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Фильтрация инвесторов
  const filteredInvestors = mockInvestors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = !selectedIndustry || investor.sectors.includes(selectedIndustry);
    
    return matchesSearch && matchesSector;
  });

  // Форматирование диапазона инвестиций
  const formatInvestmentRange = (min: number, max: number) => {
    return `${formatCurrency(min)} - ${formatCurrency(max)}`;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {searchType === 0 ? 'Исследовать стартапы' : 'Найти инвесторов'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {searchType === 0 
            ? 'Найдите идеальные инвестиционные возможности' 
            : 'Найдите подходящих инвесторов для вашего проекта'}
        </Typography>
      </Box>

      {/* Search Type Tabs */}
      <Paper sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
        <Tabs
          value={searchType}
          onChange={(e, newValue) => setSearchType(newValue)}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minHeight: '60px',
              fontWeight: 600,
              fontSize: '16px',
              textTransform: 'none',
              color: '#666666',
              '&.Mui-selected': {
                color: '#ffffff',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#ffffff',
              height: 3,
            },
          }}
        >
          <Tab 
            icon={<Apartment sx={{ fontSize: 20, mr: 1 }} />} 
            label="Стартапы" 
            iconPosition="start"
          />
          <Tab 
            icon={<Person sx={{ fontSize: 20, mr: 1 }} />} 
            label="Инвесторы" 
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {/* Search and Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack spacing={3}>
            <TextField
              fullWidth
              placeholder={searchType === 0 ? "Поиск стартапов..." : "Поиск инвесторов..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>{searchType === 0 ? "Отрасль" : "Сектор интересов"}</InputLabel>
                <Select
                  value={selectedIndustry}
                  label={searchType === 0 ? "Отрасль" : "Сектор интересов"}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                >
                  <MenuItem value="">{searchType === 0 ? "Все отрасли" : "Все секторы"}</MenuItem>
                  {industries.map((industry) => (
                    <MenuItem key={industry} value={industry}>
                      {industry}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {searchType === 0 && (
                <FormControl fullWidth>
                  <InputLabel>Стадия</InputLabel>
                  <Select
                    value={selectedStage}
                    label="Стадия"
                    onChange={(e) => setSelectedStage(e.target.value)}
                  >
                    <MenuItem value="">Все стадии</MenuItem>
                    {stages.map((stage) => (
                      <MenuItem key={stage} value={stage}>
                        {stage}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Results */}
      <Typography variant="h6" gutterBottom>
        {searchType === 0 
          ? `Найдено стартапов: ${filteredStartups.length}`
          : `Найдено инвесторов: ${filteredInvestors.length}`
        }
      </Typography>

      {/* Conditional rendering based on search type */}
      {searchType === 0 ? (
        // Startups list
        <Stack spacing={3}>
          {filteredStartups.map((startup, index) => (
            <motion.div
              key={startup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card sx={{ '&:hover': { boxShadow: 4 }, cursor: 'pointer' }}>
                <CardContent>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="start">
                    <Avatar
                      src={startup.avatar}
                      sx={{ width: 80, height: 80 }}
                    />
                    
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="start" mb={1}>
                        <Typography variant="h6" fontWeight={600}>
                          {startup.companyName}
                        </Typography>
                        <Chip
                          label={startup.stage}
                          color="primary"
                          size="small"
                        />
                      </Stack>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {startup.description}
                      </Typography>
                      
                      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Business sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {startup.industry}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {startup.location}
                          </Typography>
                        </Box>
                      </Stack>
                      
                      <Box sx={{ mb: 2 }}>
                        <Stack direction="row" justifyContent="space-between" mb={1}>
                          <Typography variant="body2">
                            Цель: {formatCurrency(startup.fundingGoal)}
                          </Typography>
                          <Typography variant="body2">
                            {Math.round((startup.fundingRaised / startup.fundingGoal) * 100)}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={(startup.fundingRaised / startup.fundingGoal) * 100}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                      
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label={`${startup.investors} инвесторов`}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={`${startup.teamSize} в команде`}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                        
                        <Button
                          variant="contained"
                          startIcon={<TrendingUp />}
                          onClick={() => navigate(`/startup/${startup.id}`)}
                          sx={{
                            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%)',
                            },
                          }}
                        >
                          Подробнее
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Stack>
      ) : (
        // Investors list
        <Grid container spacing={3}>
          {filteredInvestors.map((investor, index) => (
            <Grid component="div" item xs={12} md={6} key={investor.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card sx={{ 
                  '&:hover': { 
                    boxShadow: 4,
                    borderColor: '#666666',
                  }, 
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={investor.avatar}
                        sx={{ width: 64, height: 64, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {investor.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {investor.location}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                      {investor.bio}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Диапазон инвестиций
                      </Typography>
                      <Chip
                        label={formatInvestmentRange(investor.investmentRange.min, investor.investmentRange.max)}
                        color="primary"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Интересы
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {investor.sectors.map(sector => (
                          <Chip
                            key={sector}
                            label={sector}
                            size="small"
                            variant="outlined"
                            sx={{ mb: 1 }}
                          />
                        ))}
                      </Stack>
                    </Box>
                    
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Всего инвестиций
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {investor.totalInvestments}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Успешных
                        </Typography>
                        <Typography variant="h6" fontWeight={600} color="success.main">
                          {investor.successfulInvestments}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        startIcon={<Chat />}
                        sx={{
                          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%)',
                          },
                          alignSelf: 'flex-end',
                        }}
                      >
                        Связаться
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ExplorePage;