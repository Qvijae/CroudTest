import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Slider,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Avatar,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  TrendingUp,
  AccountBalance,
  CheckCircle,
} from '@mui/icons-material';
import { mockStartups } from '../data/mockData';

const InvestPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeStep, setActiveStep] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [investmentComplete, setInvestmentComplete] = useState(false);

  const startup = mockStartups.find(s => s.id === id);

  if (!startup) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Стартап не найден</Typography>
      </Container>
    );
  }

  const steps = ['Сумма инвестиции', 'Подтверждение', 'Оплата'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateEquity = (amount: number) => {
    const companyValuation = 25000000; // 25M RUB
    return ((amount / companyValuation) * 100).toFixed(3);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setConfirmDialogOpen(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirmInvestment = () => {
    setConfirmDialogOpen(false);
    setInvestmentComplete(true);
  };

  const handleAmountChange = (event: Event, newValue: number | number[]) => {
    setInvestmentAmount(newValue as number);
  };

  if (investmentComplete) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Инвестиция успешно оформлена!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Ваша инвестиция в размере {formatCurrency(investmentAmount)} в компанию {startup.companyName} была успешно обработана.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Вы получили {calculateEquity(investmentAmount)}% доли в компании.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
              onClick={() => window.location.href = '/profile'}
            >
              Перейти в профиль
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      {/* Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              src={startup.avatar}
              sx={{ width: 60, height: 60 }}
            />
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Инвестиция в {startup.companyName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {startup.industry} • {startup.stage}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Stepper */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Выберите сумму инвестиции
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Сумма: {formatCurrency(investmentAmount)}
                </Typography>
                <Slider
                  value={investmentAmount}
                  onChange={handleAmountChange}
                  min={50000}
                  max={1000000}
                  step={10000}
                  marks={[
                    { value: 50000, label: '50K' },
                    { value: 250000, label: '250K' },
                    { value: 500000, label: '500K' },
                    { value: 1000000, label: '1M' },
                  ]}
                  sx={{ mt: 2 }}
                />
              </Box>

              <Alert severity="info" sx={{ mb: 3 }}>
                За эту сумму вы получите {calculateEquity(investmentAmount)}% доли в компании
              </Alert>

              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Сумма инвестиции:</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(investmentAmount)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Комиссия платформы (2%):</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(investmentAmount * 0.02)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, borderTop: 1, borderColor: 'divider' }}>
                  <Typography variant="body1" fontWeight={600}>Итого к оплате:</Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {formatCurrency(investmentAmount * 1.02)}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Подтверждение инвестиции
              </Typography>
              
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Детали инвестиции
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Компания:</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {startup.companyName}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Сумма инвестиции:</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {formatCurrency(investmentAmount)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Доля в компании:</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {calculateEquity(investmentAmount)}%
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                }
                label="Я согласен с условиями инвестирования и политикой конфиденциальности"
              />
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Способ оплаты
              </Typography>
              
              <Stack spacing={3}>
                <Card variant="outlined" sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <AccountBalance color="primary" />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Банковская карта
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Visa, MasterCard, МИР
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                <TextField
                  fullWidth
                  label="Номер карты"
                  placeholder="1234 5678 9012 3456"
                  variant="outlined"
                />
                
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="MM/YY"
                    placeholder="12/25"
                    variant="outlined"
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="CVC"
                    placeholder="123"
                    variant="outlined"
                    sx={{ flex: 1 }}
                  />
                </Stack>
              </Stack>
            </Box>
          )}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Назад
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === 1 && !agreedToTerms}
              startIcon={activeStep === steps.length - 1 ? <TrendingUp /> : undefined}
            >
              {activeStep === steps.length - 1 ? 'Инвестировать' : 'Далее'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Подтвердите инвестицию</DialogTitle>
        <DialogContent>
          <Typography>
            Вы уверены, что хотите инвестировать {formatCurrency(investmentAmount)} в {startup.companyName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>
            Отмена
          </Button>
          <Button onClick={handleConfirmInvestment} variant="contained">
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InvestPage;