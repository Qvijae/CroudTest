import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  Slider,
  Chip,
  Avatar,
  LinearProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Close,
  TrendingUp,
  AccountBalance,
  Security,
  CheckCircle,
} from '@mui/icons-material';
import { StartupPitch, Startup } from '../types';

interface InvestDialogProps {
  open: boolean;
  onClose: () => void;
  pitch: StartupPitch;
  startup: Startup;
  onInvest: (amount: number) => void;
}

const InvestDialog: React.FC<InvestDialogProps> = ({
  open,
  onClose,
  pitch,
  startup,
  onInvest,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const minInvestment = 5000;
  const maxInvestment = Math.min(500000, pitch.fundingGoal - pitch.currentFunding);
  const fundingPercentage = (pitch.currentFunding / pitch.fundingGoal) * 100;

  const steps = ['Сумма инвестиций', 'Подтверждение', 'Оплата'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateEquity = (amount: number) => {
    // Простая формула для расчета доли
    const valuation = pitch.fundingGoal * 10; // Примерная оценка компании
    return ((amount / valuation) * 100).toFixed(2);
  };

  const handleAmountChange = (event: Event, newValue: number | number[]) => {
    setInvestmentAmount(newValue as number);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleInvest();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInvest = async () => {
    setIsProcessing(true);
    // Симуляция процесса инвестирования
    setTimeout(() => {
      onInvest(investmentAmount);
      setIsProcessing(false);
      onClose();
      setActiveStep(0);
    }, 2000);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Выберите сумму инвестиций
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ color: '#cccccc', mb: 2 }}>
                Сумма: {formatCurrency(investmentAmount)}
              </Typography>
              <Slider
                value={investmentAmount}
                onChange={handleAmountChange}
                min={minInvestment}
                max={maxInvestment}
                step={1000}
                sx={{
                  color: '#ffffff',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#444444',
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" sx={{ color: '#888888' }}>
                  {formatCurrency(minInvestment)}
                </Typography>
                <Typography variant="caption" sx={{ color: '#888888' }}>
                  {formatCurrency(maxInvestment)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mb: 4, flexWrap: 'wrap' }}>
              {[10000, 25000, 50000, 100000].map((amount) => (
                <Chip
                  key={amount}
                  label={formatCurrency(amount)}
                  onClick={() => setInvestmentAmount(amount)}
                  sx={{
                    backgroundColor: investmentAmount === amount ? '#ffffff' : '#333333',
                    color: investmentAmount === amount ? '#000000' : '#ffffff',
                    '&:hover': {
                      backgroundColor: investmentAmount === amount ? '#f0f0f0' : '#444444',
                    },
                  }}
                />
              ))}
            </Box>

            <Box
              sx={{
                backgroundColor: '#222222',
                borderRadius: 2,
                p: 3,
                border: '1px solid #333333',
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Детали инвестиций
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  Ваша доля в компании:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {calculateEquity(investmentAmount)}%
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  Комиссия платформы:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {formatCurrency(investmentAmount * 0.05)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px solid #333333' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Итого к оплате:
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {formatCurrency(investmentAmount * 1.05)}
                </Typography>
              </Box>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Подтверждение инвестиций
            </Typography>
            
            <Box
              sx={{
                backgroundColor: '#222222',
                borderRadius: 2,
                p: 3,
                border: '1px solid #333333',
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={startup.avatar} sx={{ width: 48, height: 48, mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {startup.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#cccccc' }}>
                    {startup.companyName}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: '#cccccc', mb: 2 }}>
                {pitch.title}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  Прогресс сбора:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {fundingPercentage.toFixed(1)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(fundingPercentage, 100)}
                sx={{
                  mt: 1,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#444444',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3,
                    backgroundColor: '#ffffff',
                  },
                }}
              />
            </Box>

            <Alert
              severity="info"
              sx={{
                backgroundColor: '#1976d220',
                border: '1px solid #1976d2',
                color: '#ffffff',
                mb: 3,
              }}
            >
              Инвестиции в стартапы связаны с высокими рисками. Инвестируйте только те средства, потерю которых вы можете себе позволить.
            </Alert>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: '#222222',
                  borderRadius: 2,
                  p: 2,
                  textAlign: 'center',
                  border: '1px solid #333333',
                }}
              >
                <TrendingUp sx={{ fontSize: 32, color: '#4caf50', mb: 1 }} />
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  Потенциальная доходность
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  до 500%
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: '#222222',
                  borderRadius: 2,
                  p: 2,
                  textAlign: 'center',
                  border: '1px solid #333333',
                }}
              >
                <Security sx={{ fontSize: 32, color: '#2196f3', mb: 1 }} />
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  Защита инвестора
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Гарантии
                </Typography>
              </Box>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Оплата инвестиций
            </Typography>
            
            {isProcessing ? (
              <Box>
                <Box sx={{ mb: 3 }}>
                  <LinearProgress
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: '#444444',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        backgroundColor: '#ffffff',
                      },
                    }}
                  />
                </Box>
                <Typography variant="body1" sx={{ color: '#cccccc' }}>
                  Обработка платежа...
                </Typography>
              </Box>
            ) : (
              <Box>
                <CheckCircle sx={{ fontSize: 64, color: '#4caf50', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Готово к оплате
                </Typography>
                <Typography variant="body1" sx={{ color: '#cccccc', mb: 3 }}>
                  Сумма к оплате: {formatCurrency(investmentAmount * 1.05)}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    startIcon={<AccountBalance />}
                    sx={{
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      '&:hover': { backgroundColor: '#f0f0f0' },
                    }}
                  >
                    Банковская карта
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: '#666666',
                      color: '#ffffff',
                      '&:hover': { borderColor: '#888888' },
                    }}
                  >
                    СБП
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#111111',
          color: '#ffffff',
          border: '1px solid #333333',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Инвестировать в стартап
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#ffffff' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': {
                    color: '#cccccc',
                    '&.Mui-active': { color: '#ffffff' },
                    '&.Mui-completed': { color: '#ffffff' },
                  },
                  '& .MuiStepIcon-root': {
                    color: '#444444',
                    '&.Mui-active': { color: '#ffffff' },
                    '&.Mui-completed': { color: '#ffffff' },
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ color: '#cccccc' }}
        >
          Назад
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={isProcessing}
          sx={{
            backgroundColor: '#ffffff',
            color: '#000000',
            '&:hover': { backgroundColor: '#f0f0f0' },
            '&:disabled': {
              backgroundColor: '#444444',
              color: '#666666',
            },
          }}
        >
          {activeStep === steps.length - 1 ? 'Инвестировать' : 'Далее'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvestDialog;