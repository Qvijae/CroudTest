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
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  Security,
  Notifications,
  Business,
  AccountBalance,
} from '@mui/icons-material';
import QuickProfileSwitch from './QuickProfileSwitch';

const InvestorSettings: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Состояние для личных данных
  const [personalData, setPersonalData] = useState({
    name: 'Алексей Петров',
    email: 'alexey.petrov@example.com',
    phone: '+7 (999) 123-45-67',
    location: 'Москва, Россия',
    bio: 'Опытный инвестор с 10-летним стажем в венчурном капитале',
    linkedin: 'https://linkedin.com/in/alexey-petrov',
    website: 'https://alexey-investments.com',
  });

  // Настройки инвестиций
  const [investmentSettings, setInvestmentSettings] = useState({
    minInvestment: 100000,
    maxInvestment: 5000000,
    preferredSectors: ['Финтех', 'Здравоохранение', 'Образование'],
    riskTolerance: 'medium' as 'low' | 'medium' | 'high',
    investmentStage: ['early', 'growth'] as string[],
    geographicFocus: ['Россия', 'СНГ'],
  });

  // Настройки уведомлений
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newStartups: true,
    investmentUpdates: true,
    marketNews: false,
    weeklyDigest: true,
    chatMessages: true,
  });

  // Настройки приватности
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public' as 'public' | 'private' | 'investors-only',
    showInvestmentHistory: false,
    showContactInfo: true,
    allowDirectMessages: true,
  });

  const availableSectors = [
    'Финтех', 'Здравоохранение', 'Образование', 'E-commerce', 'SaaS',
    'Искусственный интеллект', 'Блокчейн', 'Биотехнологии', 'Энергетика',
    'Транспорт', 'Недвижимость', 'Медиа', 'Игры', 'Кибербезопасность'
  ];

  const investmentStages = [
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

      {/* Личные данные */}
      <Card sx={{ backgroundColor: '#111111', border: '1px solid #333333' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
              <Edit sx={{ mr: 1 }} />
              Личные данные
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
            {/* Аватар */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{ width: 80, height: 80, border: '2px solid #333333' }}
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
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
            </Box>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Имя"
                value={personalData.name}
                onChange={(e) => setPersonalData({ ...personalData, name: e.target.value })}
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
                label="Email"
                value={personalData.email}
                onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
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
                label="Телефон"
                value={personalData.phone}
                onChange={(e) => setPersonalData({ ...personalData, phone: e.target.value })}
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
                value={personalData.location}
                onChange={(e) => setPersonalData({ ...personalData, location: e.target.value })}
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

            <TextField
              label="О себе"
              value={personalData.bio}
              onChange={(e) => setPersonalData({ ...personalData, bio: e.target.value })}
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

      {/* Настройки инвестиций */}
      <Card sx={{ backgroundColor: '#111111', border: '1px solid #333333' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 3, display: 'flex', alignItems: 'center' }}>
            <Business sx={{ mr: 1 }} />
            Настройки инвестиций
          </Typography>

          <Stack spacing={3}>
            {/* Диапазон инвестиций */}
            <Box>
              <Typography variant="subtitle1" sx={{ color: '#ffffff', mb: 2 }}>
                Диапазон инвестиций
              </Typography>
              <Typography variant="body2" sx={{ color: '#cccccc', mb: 2 }}>
                {formatCurrency(investmentSettings.minInvestment)} - {formatCurrency(investmentSettings.maxInvestment)}
              </Typography>
              <Slider
                value={[investmentSettings.minInvestment, investmentSettings.maxInvestment]}
                onChange={(_, newValue) => {
                  const [min, max] = newValue as number[];
                  setInvestmentSettings({
                    ...investmentSettings,
                    minInvestment: min,
                    maxInvestment: max,
                  });
                }}
                min={50000}
                max={10000000}
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

            {/* Предпочитаемые сектора */}
            <Box>
              <Typography variant="subtitle1" sx={{ color: '#ffffff', mb: 2 }}>
                Предпочитаемые сектора
              </Typography>
              <Autocomplete
                multiple
                options={availableSectors}
                value={investmentSettings.preferredSectors}
                onChange={(_, newValue) => {
                  setInvestmentSettings({
                    ...investmentSettings,
                    preferredSectors: newValue,
                  });
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      sx={{
                        color: '#ffffff',
                        borderColor: '#333333',
                        '& .MuiChip-deleteIcon': {
                          color: '#cccccc',
                        },
                      }}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Выберите сектора"
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
                sx={{
                  '& .MuiAutocomplete-popupIndicator': { color: '#cccccc' },
                  '& .MuiAutocomplete-clearIndicator': { color: '#cccccc' },
                }}
              />
            </Box>

            {/* Стадии инвестирования */}
            <Box>
              <Typography variant="subtitle1" sx={{ color: '#ffffff', mb: 2 }}>
                Предпочитаемые стадии
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {investmentStages.map((stage) => (
                  <Chip
                    key={stage.value}
                    label={stage.label}
                    clickable
                    variant={investmentSettings.investmentStage.includes(stage.value) ? "filled" : "outlined"}
                    onClick={() => {
                      const newStages = investmentSettings.investmentStage.includes(stage.value)
                        ? investmentSettings.investmentStage.filter(s => s !== stage.value)
                        : [...investmentSettings.investmentStage, stage.value];
                      setInvestmentSettings({
                        ...investmentSettings,
                        investmentStage: newStages,
                      });
                    }}
                    sx={{
                      color: investmentSettings.investmentStage.includes(stage.value) ? '#000000' : '#ffffff',
                      backgroundColor: investmentSettings.investmentStage.includes(stage.value) ? '#ffffff' : 'transparent',
                      borderColor: '#333333',
                      '&:hover': {
                        backgroundColor: investmentSettings.investmentStage.includes(stage.value) ? '#f0f0f0' : '#222222',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
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
                  checked={notificationSettings.newStartups}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    newStartups: e.target.checked,
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
              label="Новые стартапы"
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
                  checked={notificationSettings.weeklyDigest}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    weeklyDigest: e.target.checked,
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
              label="Еженедельная сводка"
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
                  checked={privacySettings.showInvestmentHistory}
                  onChange={(e) => setPrivacySettings({
                    ...privacySettings,
                    showInvestmentHistory: e.target.checked,
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
              label="Показывать историю инвестиций"
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

export default InvestorSettings;