import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Card,
  CardContent,
  Stack,
  Alert,
  Fade,
  Checkbox
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import api from '../services/api';
import type { CalculationInput } from '../services/api';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [numCriteria, setNumCriteria] = useState<number>(0);
  const [numAlternatives, setNumAlternatives] = useState<number>(0);
  const [autoCalculate, setAutoCalculate] = useState<boolean>(false);
  const [costCriteriaIndices, setCostCriteriaIndices] = useState<string>('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCsvFile(event.target.files[0]);
    }
  };

  const validateForm = (): boolean => {
    // if (!numCriteria || !numAlternatives || !csvFile) {
    if ((!autoCalculate && (!numAlternatives || !numCriteria)) || !csvFile) {
      setError('Please fill in all required fields');
      return false;
    }
    if (costCriteriaIndices) {
      const indices = costCriteriaIndices.split(',').map(i => parseInt(i.trim()));
      if (indices.some(isNaN) || (!autoCalculate && indices.some(i => i < 0 || i > numCriteria))) {
        setError('Invalid cost criteria indices. Please enter valid comma-separated numbers between 1 and ' + numCriteria);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    setError(null);
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const input: CalculationInput = {
        numCriteria,
        numAlternatives,
        autoCalculate,
        alternatives: [],
        costCriteriaIndices: costCriteriaIndices.split(',').map(i => parseInt(i.trim())).filter(i => !isNaN(i)),
        csvFile: csvFile!,
      };
      const results = await api.uploadData(input);
      localStorage.setItem('calculationResults', JSON.stringify(results));
      navigate('/calculation');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const errorData = err.response.data;
        setError(
          `Server Error: ${errorData.error}\n\n` +
          (errorData.traceback ? `Details:\n${errorData.traceback}` : '')
        );
      } else {
        setError('Failed to process data. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ py: 0, px: 0, minHeight: '100vh', background: '#181825' }}>
      <Fade in timeout={800}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 80px)',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          px: { xs: 2, md: 0 },
        }}>
          <Box sx={{ width: '100%', maxWidth: 540, mx: 'auto', mb: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 900,
                letterSpacing: '-0.03em',
                mb: 1,
                color: '#b4befe',
                textAlign: 'left',
                textShadow: '0 2px 8px rgba(180, 190, 254, 0.2)',
              }}
            >
              Decision Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: '#f5c2e7', fontWeight: 500, mb: 2, fontSize: '1.1rem', letterSpacing: '-0.01em', textAlign: 'left' }}>
              Analyze and compare alternatives based on your criteria. Upload your data and get instant results.
            </Typography>
          </Box>
          <Card elevation={0} sx={{
            width: '100%',
            maxWidth: 540,
            bgcolor: '#232136',
            border: '1.5px solid #313244',
            boxShadow: '0 2px 16px 0 #18182588',
            borderRadius: 12,
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#b4befe', fontWeight: 700, mb: 1, letterSpacing: '0.01em', textAlign: 'left' }}>
                    Criteria & Alternatives
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Criteria"
                      type="text"
                      value={numCriteria}
                      disabled={autoCalculate}
                      onChange={(e) => setNumCriteria(Number(e.target.value))}
                      InputProps={{ inputProps: { min: 1 }, sx: { borderRadius: 8, background: '#232136', color: '#cdd6f4', border: '1.5px solid #313244', fontWeight: 600, textAlign: 'left', pl: 1.5 } }}
                      InputLabelProps={{ sx: { color: '#a6adc8', left: 8 } }}
                    />
                    <TextField
                      fullWidth
                      label="Alternatives"
                      type="text"
                      value={numAlternatives}
                      disabled={autoCalculate}
                      onChange={(e) => setNumAlternatives(Number(e.target.value))}
                      InputProps={{ inputProps: { min: 1 }, sx: { borderRadius: 8, background: '#232136', color: '#cdd6f4', border: '1.5px solid #313244', fontWeight: 600, textAlign: 'left', pl: 1.5 } }}
                      InputLabelProps={{ sx: { color: '#a6adc8', left: 8 } }}
                    />


                    <Stack direction="row" spacing={-0.5} alignItems="center">
                      <Box>
                        <Checkbox
                          checked={autoCalculate}
                          onChange={(e) => setAutoCalculate(e.target.checked)}
                          sx={{
                            color: '#cdd6f4',
                            '&.Mui-checked': {
                              color: '#b4befe',
                            },
                          }}
                        />
                      </Box>
                      <Typography sx={{ color: '#b4befe', fontWeight: 200, fontSize: '0.9rem' }}>
                        Auto
                      </Typography>
                    </Stack>

                  </Stack>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#b4befe', fontWeight: 700, mb: 1, letterSpacing: '0.01em', textAlign: 'left' }}>
                    Cost Criteria (optional)
                  </Typography>
                  <TextField
                    fullWidth
                    label="Cost Criteria Indices"
                    value={costCriteriaIndices}
                    onChange={(e) => setCostCriteriaIndices(e.target.value)}
                    helperText="Comma-separated indices (e.g. 1,3)"
                    InputProps={{ sx: { borderRadius: 8, background: '#232136', color: '#cdd6f4', border: '1.5px solid #313244', fontWeight: 600, textAlign: 'left', pl: 1.5 } }}
                    InputLabelProps={{ sx: { color: '#a6adc8', left: 8 } }}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#94e2d5', fontWeight: 700, mb: 1, letterSpacing: '0.01em', textAlign: 'left' }}>
                    Data File
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadFileIcon />}
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: 12,
                      background: '#313244',
                      color: '#94e2d5',
                      border: '1.5px dashed #94e2d5',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      letterSpacing: '-0.01em',
                      boxShadow: 'none',
                      transition: 'all 0.3s',
                      '&:hover': {
                        background: '#45475a',
                        borderColor: '#89dceb',
                        color: '#89dceb',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Upload CSV File
                    <input
                      type="file"
                      hidden
                      accept=".csv"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  {csvFile && (
                    <Typography variant="body2" sx={{ mt: 1, color: '#94e2d5', display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
                      ✓ Selected file: {csvFile.name}
                    </Typography>
                  )}
                </Box>
              </Stack>
              {error && (
                <Alert severity="error" sx={{ mt: 3, whiteSpace: 'pre-wrap', borderRadius: 8, border: '1.5px solid', borderColor: '#f38ba8', background: '#181825', color: '#f38ba8' }}>
                  {error}
                </Alert>
              )}
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={<AddIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 12,
                    background: '#b4befe',
                    color: '#181825',
                    border: '1.5px solid #b4befe',
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    letterSpacing: '-0.01em',
                    boxShadow: 'none',
                    transition: 'all 0.3s',
                    '&:hover': {
                      background: '#f5c2e7',
                      color: '#181825',
                      borderColor: '#f5c2e7',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {loading ? 'Processing...' : 'Start Calculation'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Fade>
    </Container>
  );
};

export default Home; 
