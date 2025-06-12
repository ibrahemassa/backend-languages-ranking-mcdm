import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Container,
  Card,
  CardContent,
  Stack,
  Slide,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Step1PairwiseMatrix from '../components/Step1PairwiseMatrix';
// import Step4ExpertMatrix from '../components/Step4ExpertMatrix';
// import Step14WeightsMatrix from '../components/Step14WeightsMatrix';

interface CalculationResult {
  expertWeights: number[];
  criteriaWeights: number[];
  rankings: Array<{
    name: string;
    score: number;
  }>;
  criteriaNames?: string[];
  alternativeNames?: string[];
  expertsNames?: string[];
  steps?: any[];
}

const Calculation = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [showPodium, setShowPodium] = useState(false);

  useEffect(() => {
    const storedResults = localStorage.getItem('calculationResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (results) {
      setShowPodium(true);
    }
  }, [results]);

  if (!results) {
    return null;
  }

  const criteriaData = results.criteriaWeights.map((weight, index) => ({
    name: results.criteriaNames?.[index] || `Criterion ${index + 1}`,
    weight: Number(weight.toFixed(4)),
  }));

  const rankingsData = results.rankings.map((rank, index) => ({
    name: results.alternativeNames?.[index] || rank.name,
    score: Number(rank.score.toFixed(4)),
  }));

  return (
    <Container maxWidth={false} disableGutters sx={{ py: 0, px: 0, minHeight: '100vh', background: '#181825' }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 80px)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        px: { xs: 1, md: 6 },
        py: { xs: 2, md: 4 },
      }}>
        <Box sx={{ mb: 4, textAlign: 'left', width: '100%', maxWidth: 1200, mx: 'auto' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 900, color: '#b4befe', letterSpacing: '-0.03em', mb: 1, textAlign: 'left', textShadow: '0 2px 8px rgba(180, 190, 254, 0.2)' }}>
            Calculation Results
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', opacity: 0.85, mt: 2, fontWeight: 500, letterSpacing: '-0.01em', color: '#f5c2e7', textAlign: 'left' }}>
            Analysis of expert weights, criteria weights, and alternative rankings
          </Typography>
        </Box><Card elevation={0} sx={{ bgcolor: '#232136', border: '1.5px solid #313244', boxShadow: '0 2px 16px 0 #18182588', borderRadius: 12, p: 0, mb: 4, width: '100%', maxWidth: 1200, mx: 'auto' }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, color: '#b4befe', fontWeight: 700 }}>
              Top 3 Alternatives
            </Typography>
            {(() => {
              const sortedTop3 = rankingsData.slice(0, 3).sort((a, b) => b.score - a.score);
              let displayOrder: Array<{ name: string; score: number; }> = [];
              if (sortedTop3.length === 3) {
                displayOrder = [sortedTop3[1], sortedTop3[0], sortedTop3[2]]; // 2nd, 1st, 3rd
              } else if (sortedTop3.length === 2) {
                displayOrder = [sortedTop3[1], sortedTop3[0]]; // 2nd, 1st
              } else if (sortedTop3.length === 1) {
                displayOrder = [sortedTop3[0]]; // 1st
              }

              return (
                <Stack direction="row" justifyContent="space-around" alignItems="flex-end" spacing={2} sx={{ height: 180, mt: 0 }}>
                  {displayOrder.map((rank, displayIndex) => {
                    let actualRank = 0;
                    if (rank === sortedTop3[0]) actualRank = 1;
                    else if (sortedTop3.length > 1 && rank === sortedTop3[1]) actualRank = 2;
                    else if (sortedTop3.length > 2 && rank === sortedTop3[2]) actualRank = 3;

                    let height = 0;
                    let bgColor = '#a6adc8'; 
                    let textColor = '#181825';

                    if (actualRank === 1) {
                      height = 200;
                      bgColor = '#89b4fa'; // Blue
                    } else if (actualRank === 2) {
                      height = 150;
                      bgColor = '#f5c2e7'; // Pink
                    } else if (actualRank === 3) {
                      height = 100;
                      bgColor = '#94e2d5'; // Teal
                    }

                    return (
                      <Slide 
                        key={rank.name} 
                        direction="up" 
                        in={showPodium} 
                        timeout={500 + displayIndex * 150} 
                      >
                        <Box
                          sx={{
                            width: '30%',
                            height: height,
                            bgcolor: bgColor,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 2,
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            color: textColor,
                            fontWeight: 700,
                            transition: 'all 0.3s ease-in-out',
                            py: 0,
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                            }
                          }}
                        >
                          <Typography variant="h6" sx={{ fontSize: '1.2rem', color: textColor }}>
                            {actualRank === 1 ? '1st' : actualRank === 2 ? '2nd' : '3rd'}
                          </Typography>
                          <Typography variant="subtitle1" sx={{ fontSize: '1rem', textAlign: 'center', mt: 0.5, color: textColor }}>
                            {rank.name}
                          </Typography>
                          <Typography variant="body1" sx={{ fontSize: '0.9rem', mt: 0.5, color: textColor }}>
                            {rank.score.toFixed(4)}
                          </Typography>
                        </Box>
                      </Slide>
                    );
                  })}
                </Stack>
              );
            })()}
          </CardContent>
        </Card>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            width: '100%',
            maxWidth: 1200,
            flex: 1,
            alignItems: 'stretch',
            minHeight: { md: 400 },
            mx: 'auto',
          }}
        >
          <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: '#232136', border: '1.5px solid #313244', boxShadow: '0 2px 16px 0 #18182588', borderRadius: 12, p: 0 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#b4befe', fontWeight: 700 }}>
                Expert Weights
              </Typography>
              <TableContainer sx={{ background: '#232136', borderRadius: 8 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>Expert</TableCell>
                      <TableCell align="right" sx={{ color: '#a6adc8', fontWeight: 700 }}>Weight</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.expertWeights.map((weight, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: '#cdd6f4' }}>{results.expertsNames?.[index] || `Expert ${index + 1}`}</TableCell>
                        <TableCell align="right" sx={{ color: '#cdd6f4' }}>{weight.toFixed(4)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
          <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: '#232136', border: '1.5px solid #313244', boxShadow: '0 2px 16px 0 #18182588', borderRadius: 12, p: 0 }}>
            <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#b4befe', fontWeight: 700 }}>
                Criteria Weights
              </Typography>
              <Box sx={{ flex: 1, minHeight: 400, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={criteriaData} style={{ background: '#232136', borderRadius: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#313244" />
                    <XAxis
                      dataKey="name"
                      stroke="#a6adc8"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      tick={{ fill: '#f5c2e7', fontSize: 14, fontWeight: 500 }}
                      interval={0}
                    />
                    <YAxis
                      stroke="#a6adc8"
                      tick={{ fill: '#f5c2e7', fontSize: 14, fontWeight: 500 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#181825',
                        border: 'none',
                        borderRadius: 8,
                        color: '#cdd6f4',
                        boxShadow: '0 4px 12px rgba(180, 190, 254, 0.15)',
                        fontSize: 14,
                      }}
                      itemStyle={{ color: '#b4befe', fontSize: 14 }}
                      labelStyle={{ color: '#f5c2e7', fontSize: 14, fontWeight: 600 }}
                      cursor={{fill: 'transparent'}}
                    />
                    <Legend
                      wrapperStyle={{
                        color: '#f5c2e7',
                        paddingTop: '20px',
                        fontSize: 14,
                        fontWeight: 500
                      }}
                    />
                    <Bar
                      dataKey="weight"
                      fill="#b4befe"
                      name="Weight"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ mt: 4, width: '100%', maxWidth: 1200, mx: 'auto' }}>
          <Card elevation={0} sx={{ bgcolor: '#232136', border: '1.5px solid #313244', boxShadow: '0 2px 16px 0 #18182588', borderRadius: 12, p: 0 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 2, color: '#b4befe', fontWeight: 700 }}>
                Alternative Rankings
              </Typography>
              <Box sx={{ height: 350, mb: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rankingsData} style={{ background: '#232136', borderRadius: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#313244" />
                    <XAxis
                      dataKey="name"
                      stroke="#a6adc8"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      tick={{ fill: '#f5c2e7', fontSize: 14, fontWeight: 500 }}
                      interval={0}
                    />
                    <YAxis
                      stroke="#a6adc8"
                      tick={{ fill: '#f5c2e7', fontSize: 14, fontWeight: 500 }}
                      domain={[0.6, 'dataMax + 0.05']}
                      allowDataOverflow={true}
                      ticks={[0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#181825',
                        border: 'none',
                        borderRadius: 8,
                        color: '#cdd6f4',
                        boxShadow: '0 4px 12px rgba(180, 190, 254, 0.15)',
                        fontSize: 14,
                      }}
                      itemStyle={{ color: '#b4befe', fontSize: 14 }}
                      labelStyle={{ color: '#f5c2e7', fontSize: 14, fontWeight: 600 }}
                      cursor={{fill: 'transparent'}}
                    />
                    {/* <Legend 
                      wrapperStyle={{
                        color: '#f5c2e7',
                        paddingTop: '0px',
                        fontSize: 14,
                        fontWeight: 500
                      }}
                    /> */}
                    <Bar
                      dataKey="score"
                      fill="#cba6f7"
                      name="Score"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              <TableContainer sx={{ background: '#232136', borderRadius: 8 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#a6adc8', fontWeight: 700, py: 0.5 }}>Rank</TableCell>
                      <TableCell sx={{ color: '#a6adc8', fontWeight: 700, py: 0.5 }}>Alternative</TableCell>
                      <TableCell align="right" sx={{ color: '#a6adc8', fontWeight: 700, py: 0.5 }}>Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.rankings
                      .sort((a, b) => b.score - a.score)
                      .map((rank, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ color: '#cdd6f4', fontWeight: 700, py: 0.5 }}>{index + 1}</TableCell>
                          <TableCell sx={{ color: '#cdd6f4', py: 0.5 }}>{results.alternativeNames?.[index] || rank.name}</TableCell>
                          <TableCell align="right" sx={{ color: '#cdd6f4', py: 0.5 }}>{rank.score.toFixed(4)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
        {/* <Box sx={{ mt: 2, width: '100%', maxWidth: 1200, mx: 'auto' }}> */}
          {/* Step 1: Pairwise Matrix */}
          {/* <Step1PairwiseMatrix data={results.steps?.[1]} /> */}
          {/* Step 4: Expert Matrices */}
          {/* <Step4ExpertMatrix data={results.steps?.[4]} /> */}
          {/* Step 14: Weights Matrix */}
          {/* <Step14WeightsMatrix data={results.steps?.[14]} /> */}
        {/* </Box> */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', width: '100%', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
            startIcon={<ArrowBackIcon />}
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
            New Calculation
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              localStorage.setItem('calculationData', JSON.stringify(results));
              navigate('/full-steps');
            }}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 12,
              background: '#f5c2e7',
              color: '#181825',
              border: '1.5px solid #f5c2e7',
              fontWeight: 700,
              fontSize: '1.15rem',
              letterSpacing: '-0.01em',
              boxShadow: 'none',
              transition: 'all 0.3s',
              '&:hover': {
                background: '#b4befe',
                color: '#181825',
                borderColor: '#b4befe',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Show Full Steps
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Calculation; 
