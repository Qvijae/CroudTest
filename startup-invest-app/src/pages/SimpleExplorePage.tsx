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
} from '@mui/material';
import {
  Search,
  FilterList,
  TrendingUp,
  Business,
  LocationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { mockStartups } from '../data/mockData';

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [fundingRange, setFundingRange] = useState([0, 10000000]);

  const industries = ['Технологии', 'Финтех', 'Здравоохранение', 'E-commerce', 'Образование'];
  const stages = ['Идея', 'MVP', 'Рост', 'Масштабирование'];

  const filteredStartups = mockStartups.filter(startup => {
    const matchesSearch = startup.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !selectedIndustry || startup.industry === selectedIndustry;
    const matchesStage = !selectedStage || startup.stage === selectedStage;
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

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Исследовать стартапы
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Найдите идеальные инвестиционные возможности
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack spacing={3}>
            <TextField
              fullWidth
              placeholder="Поиск стартапов..."
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
                <InputLabel>Отрасль</InputLabel>
                <Select
                  value={selectedIndustry}
                  label="Отрасль"
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                >
                  <MenuItem value="">Все отрасли</MenuItem>
                  {industries.map((industry) => (
                    <MenuItem key={industry} value={industry}>
                      {industry}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Results */}
      <Typography variant="h6" gutterBottom>
        Найдено стартапов: {filteredStartups.length}
      </Typography>

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
    </Container>
  );
};

export default ExplorePage;