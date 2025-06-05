import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Stack,
  Chip,
  Autocomplete,
  Slider,
  Alert,
  IconButton,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  Security,
  Notifications,
  Business,
  AttachMoney,
  Description,
} from '@mui/icons-material';
import QuickProfileSwitch from './QuickProfileSwitch';

const StartupSettings: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Состояние для данных компании
  const [companyData, setCompanyData] = useState({
    companyName: 'EcoTech Solutions',
    founderName: 'Мария Иванова',
    email: 'maria@ecotech.ru',
    phone: '+7 (999) 123-45-67',
    website: 'https://ecotech-solutions.ru',
    location: 'Москва, Россия',
    industry: 'Экологические технологии',
    description: 'Разрабатываем инновационные решения для переработки пластиковых отходов с использованием ИИ',
    foundedDate: '2023-03-15',
    teamSize: 8,
    linkedin: 'https://linkedin.com/company/ecotech-solutions',
    twitter: 'https://twitter.com/ecotech_solutions',
  });

  // Настройки финансирования
  const [fundingSettings, setFundingSettings] = useState({
    fundingGoal: 5000000,
    minInvestment: 100000,
    maxInvestment: 1000000,
    equity: 15,
    stage: 'mvp' as 'idea' | 'mvp' | 'early' | 'growth' | 'expansion',
    useOfFunds: {
      development: 40,
      marketing: 30,
      team: 20,
      operations: 10,
    },
    acceptingInvestments: true,
  });

  // Настройки уведомлений
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newInvestors: true,
    investmentUpdates: true,
    milestoneReminders: true,
    weeklyReports: true,
    chatMessages: true,
  });

  // Настройки приватности
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public' as 'public' | 'private' | 'investors-only',
    showFinancials: true,
    showTeamInfo: true,
    showContactInfo: true,
    allowDirectMessages: true,
    showInvestorList: false,
  });

  const industries = [
    'Финтех', 'Здравоохранение', 'Образование', 'E-commerce', 'SaaS',
    'Искусственный интеллект', 'Блокчейн', 'Биотехнологии', 'Энергетика',
    'Транспорт', 'Недвижимость', 'Медиа', 'Игры', 'Кибербезопасность',
    'Экологические технологии', 'Агротех', 'Космические технологии'
  ];

  const stages = [
    { value: 'idea', label: 'Идея' },
    { value: 'mvp', label: 'MVP' },
    { value: 'early', label: 'Ранняя стадия' },
    { value: 'growth', label: 'Рост' },
    { value: 'expansion', label: 'Расширение' },
  ];

  const handleSave = () => {
    setEditMode(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Stack spacing={3}>
      {showSuccess && (
        <Alert severity="success" sx={{ backgroundColor: '#1a4d3a', color: '#ffffff' }}>
          Настройки успешно сохранены
        </Alert>
      )}

      {/* Quick Profile Switch */}
      <QuickProfileSwitch />

      {/* Информация о компании */}
      <Card sx={{ backgroundColor: '#111111', border: '1px solid #333333' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
              <Business sx={{ mr: 1 }} />
              Информация о компании
            </Typography>
            <Button
              variant={editMode ? "outlined" : "contained"}
              onClick={() => editMode ? setEditMode(false) : setEditMode(true)}
              startIcon={editMode ? <Cancel /> : <Edit />}
              size="small"
            >
              {editMode ? 'Отмена' : 'Редактировать'}
            </Button>
          </Box>

          <Stack spacing={3}>
            {/* Логотип компании */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{ width: 80, height: 80, border: '2px solid #333333' }}
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150"
              />
              {editMode && (
                <IconButton
                  sx={{ 
                    backgroundColor: '#333333',
                    '&:hover': { backgroundColor: '#444444' }
                  }}
                >
                  <PhotoCamera sx={{ color: '#ffffff' }} />
                </IconButton>
              )}
              <Box>
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  Логотип компании
                </Typography>
                <Typography variant="caption" sx={{ color: '#666666' }}>
                  Рекомендуемый размер: 200x200px
                </Typography>
              </Box>
            </Box>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Название компании"
                value={companyData.companyName}
                onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                disabled={!editMode}
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': { color: '#cccccc' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#333333' },
                    '&:hover fieldset': { borderColor: '#555555' },
                    '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                  },
                }}
              />
              <TextField
                label="Имя основателя"
                value={companyData.founderName}
                onChange={(e) => setCompanyData({ ...companyData, founderName: e.target.value })}
                disabled={!editMode}
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': { color: '#cccccc' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#333333' },
                    '&:hover fieldset': { borderColor: '#555555' },
                    '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                  },
                }}
              />
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Email"
                value={companyData.email}
                onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                disabled={!editMode}
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': { color: '#cccccc' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#333333' },
                    '&:hover fieldset': { borderColor: '#555555' },
                    '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                  },
                }}
              />
              <TextField
                label="Телефон"
                value={companyData.phone}
                onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                disabled={!editMode}
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': { color: '#cccccc' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#333333' },
                    '&:hover fieldset': { borderColor: '#555555' },
                    '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                  },
                }}
              />
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Веб-сайт"
                value={companyData.website}
                onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                disabled={!editMode}
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': { color: '#cccccc' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#333333' },
                    '&:hover fieldset': { borderColor: '#555555' },
                    '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                  },
                }}
              />
              <TextField
                label="Местоположение"
                value={companyData.location}
                onChange={(e) => setCompanyData({ ...companyData, location: e.target.value })}
                disabled={!editMode}
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': { color: '#cccccc' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#333333' },
                    '&:hover fieldset': { borderColor: '#555555' },
                    '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                  },
                }}
              />
            </Stack>

            <Autocomplete
              options={industries}
              value={companyData.industry}
              onChange={(_, newValue) => {
                if (newValue) {
                  setCompanyData({ ...companyData, industry: newValue });
                }
              }}
              disabled={!editMode}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Отрасль"
                  sx={{
                    '& .MuiInputLabel-root': { color: '#cccccc' },
                    '& .MuiOutlinedInput-root': {
                      color: '#ffffff',
                      '& fieldset': { borderColor: '#333333' },
                      '&:hover fieldset': { borderColor: '#555555' },
                      '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                    },
                  }}
                />
              )}
            />

            <TextField
              label="Описание компании"
              value={companyData.description}
              onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
              disabled={!editMode}
              multiline
              rows={3}
              fullWidth
              sx={{
                '& .MuiInputLabel-root': { color: '#cccccc' },
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  '& fieldset': { borderColor: '#333333' },
                  '&:hover fieldset': { borderColor: '#555555' },
                  '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                },
              }}
            />

            {editMode && (
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={<Save />}
                sx={{ alignSelf: 'flex-start' }}
              >
                Сохранить изменения
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Настройки финансирования */}
      <Card sx={{ backgroundColor: '#111111', border: '1px solid #333333' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 3, display: 'flex', alignItems: 'center' }}>
            <AttachMoney sx={{ mr: 1 }} />
            Настройки финансирования
          </Typography>

          <Stack spacing={3}>
            {/* Цель финансирования */}
            <TextField
              label="Цель финансирования"
              value={fundingSettings.fundingGoal}
              onChange={(e) => setFundingSettings({
                ...fundingSettings,
                fundingGoal: Number(e.target.value),
              })}
              type="number"
              fullWidth
              sx={{
                '& .MuiInputLabel-root': { color: '#cccccc' },
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  '& fieldset': { borderColor: '#333333' },
                  '&:hover fieldset': { borderColor: '#555555' },
                  '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                },
              }}
            />

            {/* Диапазон инвестиций */}
            <Box>
              <Typography variant="subtitle1" sx={{ color: '#ffffff', mb: 2 }}>
                Диапазон инвестиций
              </Typography>
              <Typography variant="body2" sx={{ color: '#cccccc', mb: 2 }}>
                {formatCurrency(fundingSettings.minInvestment)} - {formatCurrency(fundingSettings.maxInvestment)}
              </Typography>
              <Slider
                value={[fundingSettings.minInvestment, fundingSettings.maxInvestment]}
                onChange={(_, newValue) => {
                  const [min, max] = newValue as number[];
                  setFundingSettings({
                    ...fundingSettings,
                    minInvestment: min,
                    maxInvestment: max,
                  });
                }}
                min={50000}
                max={2000000}
                step={50000}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => formatCurrency(value)}
                sx={{
                  color: '#ffffff',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#333333',
                  },
                }}
              />
            </Box>

            {/* Стадия развития */}
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#cccccc' }}>Стадия развития</InputLabel>
              <Select
                value={fundingSettings.stage}
                onChange={(e) => setFundingSettings({
                  ...fundingSettings,
                  stage: e.target.value as any,
                })}
                sx={{
                  color: '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#333333',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555555',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#ffffff',
                  },
                }}
              >
                {stages.map((stage) => (
                  <MenuItem key={stage.value} value={stage.value}>
                    {stage.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Доля в компании */}
            <Box>
              <Typography variant="subtitle1" sx={{ color: '#ffffff', mb: 2 }}>
                Доля в компании: {fundingSettings.equity}%
              </Typography>
              <Slider
                value={fundingSettings.equity}
                onChange={(_, newValue) => {
                  setFundingSettings({
                    ...fundingSettings,
                    equity: newValue as number,
                  });
                }}
                min={1}
                max={49}
                step={1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
                sx={{
                  color: '#ffffff',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#333333',
                  },
                }}
              />
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={fundingSettings.acceptingInvestments}
                  onChange={(e) => setFundingSettings({
                    ...fundingSettings,
                    acceptingInvestments: e.target.checked,
                  })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#ffffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                />
              }
              label="Принимаем инвестиции"
              sx={{ color: '#ffffff' }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Настройки уведомлений */}
      <Card sx={{ backgroundColor: '#111111', border: '1px solid #333333' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 3, display: 'flex', alignItems: 'center' }}>
            <Notifications sx={{ mr: 1 }} />
            Уведомления
          </Typography>

          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    emailNotifications: e.target.checked,
                  })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#ffffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                />
              }
              label="Email уведомления"
              sx={{ color: '#ffffff' }}
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.pushNotifications}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    pushNotifications: e.target.checked,
                  })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#ffffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                />
              }
              label="Push уведомления"
              sx={{ color: '#ffffff' }}
            />

            <Divider sx={{ borderColor: '#333333', my: 2 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.newInvestors}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    newInvestors: e.target.checked,
                  })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#ffffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                />
              }
              label="Новые инвесторы"
              sx={{ color: '#ffffff' }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.investmentUpdates}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    investmentUpdates: e.target.checked,
                  })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#ffffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                />
              }
              label="Обновления инвестиций"
              sx={{ color: '#ffffff' }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.milestoneReminders}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    milestoneReminders: e.target.checked,
                  })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#ffffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                />
              }
              label="Напоминания о вехах"
              sx={{ color: '#ffffff' }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Настройки приватности */}
      <Card sx={{ backgroundColor: '#111111', border: '1px solid #333333' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 3, display: 'flex', alignItems: 'center' }}>
            <Security sx={{ mr: 1 }} />
            Приватность и безопасность
          </Typography>

          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.showFinancials}
                  onChange={(e) => setPrivacySettings({
                    ...privacySettings,
                    showFinancials: e.target.checked,
                  })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#ffffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                />
              }
              label="Показывать финансовые данные"
              sx={{ color: '#ffffff' }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.showTeamInfo}
                  onChange={(e) => setPrivacySettings({
                    ...privacySettings,
                    showTeamInfo: e.target.checked,
                  })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#ffffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                />
              }
              label="Показывать информацию о команде"
              sx={{ color: '#ffffff' }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.showContactInfo}
                  onChange={(e) => setPrivacySettings({
                    ...privacySettings,
                    showContactInfo: e.target.checked,
                  })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#ffffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                />
              }
              label="Показывать контактную информацию"
              sx={{ color: '#ffffff' }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.allowDirectMessages}
                  onChange={(e) => setPrivacySettings({
                    ...privacySettings,
                    allowDirectMessages: e.target.checked,
                  })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#ffffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                />
              }
              label="Разрешить личные сообщения"
              sx={{ color: '#ffffff' }}
            />

            <Divider sx={{ borderColor: '#333333', my: 2 }} />

            <Button
              variant="outlined"
              sx={{
                borderColor: '#ff4444',
                color: '#ff4444',
                '&:hover': {
                  borderColor: '#ff6666',
                  backgroundColor: 'rgba(255, 68, 68, 0.1)',
                },
              }}
            >
              Изменить пароль
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: '#ff4444',
                color: '#ff4444',
                '&:hover': {
                  borderColor: '#ff6666',
                  backgroundColor: 'rgba(255, 68, 68, 0.1)',
                },
              }}
            >
              Удалить аккаунт
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default StartupSettings;