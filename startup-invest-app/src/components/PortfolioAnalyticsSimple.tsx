import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Button,
  Avatar,
  Divider,
  Tab,
  Tabs,
} from '@mui/material';
import {
  TrendingUp,
  AccountBalance,
  AttachMoney,
  ShowChart,
  Analytics,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

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
      id={`portfolio-tabpanel-${index}`}
      aria-labelledby={`portfolio-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const PortfolioAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Моковые данные
  const portfolioData = [
    { month: 'Янв', value: 50000, investments: 2 },
    { month: 'Фев', value: 75000, investments: 3 },
    { month: 'Мар', value: 120000, investments: 5 },
    { month: 'Апр', value: 180000, investments: 7 },
    { month: 'Май', value: 250000, investments: 10 },
    { month: 'Июн', value: 320000, investments: 12 },
  ];

  const categoryData = [
    { name: 'Технологии', value: 40, color: '#4caf50' },
    { name: 'Финтех', value: 25, color: '#2196f3' },
    { name: 'E-commerce', value: 20, color: '#ff9800' },
    { name: 'Здравоохранение', value: 15, color: '#9c27b0' },
  ];

  const mockInvestments = [
    {
      id: '1',
      name: 'TechStart',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
      amount: 50000,
      currentValue: 65000,
      equity: 2.5,
      return: 30,
      status: 'active' as const,
    },
    {
      id: '2',
      name: 'FinanceApp',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop',
      amount: 75000,
      currentValue: 90000,
      equity: 3.0,
      return: 20,
      status: 'active' as const,
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="portfolio analytics tabs"
          sx={{
            '& .MuiTab-root': {
              color: '#cccccc',
              '&.Mui-selected': {
                color: '#4caf50',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#4caf50',
            },
          }}
        >
          <Tab label="Обзор" />
          <Tab label="Производительность" />
          <Tab label="Инвестиции" />
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <Typography variant="h5" sx={{ color: '#ffffff', mb: 3, fontWeight: 600 }}>
          Обзор портфеля
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {/* Общая стоимость */}
          <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
            <Card sx={{ backgroundColor: '#222222', border: '1px solid #333333' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AttachMoney sx={{ color: '#4caf50', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                    Общая стоимость
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700, mb: 1 }}>
                  ₽320,000
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ color: '#4caf50', fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ color: '#4caf50' }}>
                    +28% за месяц
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Количество инвестиций */}
          <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
            <Card sx={{ backgroundColor: '#222222', border: '1px solid #333333' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccountBalance sx={{ color: '#2196f3', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                    Активные инвестиции
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 700, mb: 1 }}>
                  12
                </Typography>
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  В 8 различных секторах
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Доходность */}
          <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
            <Card sx={{ backgroundColor: '#222222', border: '1px solid #333333' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShowChart sx={{ color: '#ff9800', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                    Средняя доходность
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 700, mb: 1 }}>
                  +24.5%
                </Typography>
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  За последний год
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* График роста портфеля */}
        <Card sx={{ backgroundColor: '#222222', border: '1px solid #333333', mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, color: '#ffffff', fontWeight: 600 }}>
              Рост портфеля
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                  <XAxis dataKey="month" stroke="#cccccc" />
                  <YAxis stroke="#cccccc" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#333333',
                      border: '1px solid #555555',
                      borderRadius: '8px',
                      color: '#ffffff',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4caf50"
                    strokeWidth={3}
                    dot={{ fill: '#4caf50', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Typography variant="h5" sx={{ color: '#ffffff', mb: 3, fontWeight: 600 }}>
          Производительность
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {/* Метрики производительности */}
          <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
            <Card sx={{ backgroundColor: '#222222', border: '1px solid #333333' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                  ROI
                </Typography>
                <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700 }}>
                  +32%
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
            <Card sx={{ backgroundColor: '#222222', border: '1px solid #333333' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                  Лучшая инвестиция
                </Typography>
                <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700 }}>
                  +85%
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
            <Card sx={{ backgroundColor: '#222222', border: '1px solid #333333' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                  Успешных выходов
                </Typography>
                <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 700 }}>
                  3
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
            <Card sx={{ backgroundColor: '#222222', border: '1px solid #333333' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                  Время удержания
                </Typography>
                <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 700 }}>
                  18 мес
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* График производительности и распределение по категориям */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: '2 1 400px', minWidth: 400 }}>
            <Card sx={{ backgroundColor: '#222222', border: '1px solid #333333' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, color: '#ffffff', fontWeight: 600 }}>
                  Производительность по месяцам
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                      <XAxis dataKey="month" stroke="#cccccc" />
                      <YAxis stroke="#cccccc" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#333333',
                          border: '1px solid #555555',
                          borderRadius: '8px',
                          color: '#ffffff',
                        }}
                      />
                      <Bar dataKey="investments" fill="#4caf50" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
            <Card sx={{ backgroundColor: '#222222', border: '1px solid #333333' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, color: '#ffffff', fontWeight: 600 }}>
                  Распределение по секторам
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#333333',
                          border: '1px solid #555555',
                          borderRadius: '8px',
                          color: '#ffffff',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Typography variant="h5" sx={{ color: '#ffffff', mb: 3, fontWeight: 600 }}>
          Мои инвестиции
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {mockInvestments.map((investment) => (
            <Box key={investment.id} sx={{ flex: '1 1 400px', minWidth: 400 }}>
              <Card sx={{ backgroundColor: '#222222', border: '1px solid #333333' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={investment.logo}
                      sx={{ width: 48, height: 48, mr: 2 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                        {investment.name}
                      </Typography>
                      <Chip
                        label={investment.status === 'active' ? 'Активно' : 'Завершено'}
                        size="small"
                        sx={{
                          backgroundColor: investment.status === 'active' ? '#4caf50' : '#ff9800',
                          color: 'white',
                        }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ flex: '1 1 150px' }}>
                      <Typography variant="body2" sx={{ color: '#cccccc' }}>
                        Инвестировано
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                        ₽{investment.amount.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 150px' }}>
                      <Typography variant="body2" sx={{ color: '#cccccc' }}>
                        Текущая стоимость
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 600 }}>
                        ₽{investment.currentValue.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 150px' }}>
                      <Typography variant="body2" sx={{ color: '#cccccc' }}>
                        Доля
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                        {investment.equity}%
                      </Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 150px' }}>
                      <Typography variant="body2" sx={{ color: '#cccccc' }}>
                        Доходность
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: investment.return > 0 ? '#4caf50' : '#f44336',
                          fontWeight: 600,
                        }}
                      >
                        +{investment.return}%
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2, backgroundColor: '#333333' }} />
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: '#4caf50',
                        color: '#4caf50',
                        '&:hover': {
                          borderColor: '#4caf50',
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        },
                      }}
                    >
                      Подробнее
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: '#333333',
                        color: '#cccccc',
                        '&:hover': {
                          borderColor: '#555555',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        },
                      }}
                    >
                      Продать долю
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        <Card sx={{ backgroundColor: '#222222', border: '1px solid #333333', mt: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, color: '#ffffff', fontWeight: 600 }}>
              Рекомендации
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Chip
                icon={<Analytics />}
                label="Диверсифицировать в FinTech"
                sx={{ backgroundColor: '#333333', color: '#ffffff' }}
              />
              <Chip
                icon={<TrendingUp />}
                label="Увеличить долю в TechStart"
                sx={{ backgroundColor: '#333333', color: '#ffffff' }}
              />
              <Chip
                icon={<AccountBalance />}
                label="Рассмотреть выход из 2 позиций"
                sx={{ backgroundColor: '#333333', color: '#ffffff' }}
              />
            </Box>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
};

export default PortfolioAnalytics;