import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, TextField, Stack, CircularProgress, Alert } from '@mui/material';
import Step1PairwiseMatrix from '../components/Step1PairwiseMatrix';
import Step2ExpertWeights from '../components/Step2ExpertWeights';
import Step3ExpertAssignments from '../components/Step3ExpertAssignments';
import Step4ExpertMatrix from '../components/Step4ExpertMatrix';
import Step5NormalizedMatrix from '../components/Step5NormalizedMatrix';
import Step6AggregatedMatrix from '../components/Step6AggregatedMatrix';
import Step7to10Table from '../components/Step7to10Table';
import Step11ExpertConsistencyRatios from '../components/Step11ExpertConsistencyRatios';
import Step12ExpertWeights from '../components/Step12ExpertWeights';
import Step13AggregatedExpertWeights from '../components/Step13AggregatedExpertWeights';
import Step14WeightsMatrix from '../components/Step14WeightsMatrix';
import Step15FinalWeights from '../components/Step15FinalWeights';
import Step16Ranking from '../components/Step16Ranking';
import Step17Summary from '../components/Step17Summary';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const FullSteps: React.FC = () => {
  const [numCriteria, setNumCriteria] = useState<number>(0);
  const [numAlternatives, setNumAlternatives] = useState<number>(0);
  const [costCriteriaIndices, setCostCriteriaIndices] = useState<string>('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const calculationData = localStorage.getItem('calculationData');
    if (calculationData) {
      setResults(JSON.parse(calculationData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCsvFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!numCriteria || !numAlternatives || !csvFile) {
      setError('Please fill in all required fields and upload a CSV file.');
      return;
    }
    setLoading(true);
    setResults(null);
    try {
      const input = {
        numCriteria,
        numAlternatives,
        alternatives: [],
        costCriteriaIndices: costCriteriaIndices.split(',').map(i => parseInt(i.trim())).filter(i => !isNaN(i)),
        autoCalculate: false,
        csvFile,
      };
      const data = await api.uploadData(input);
      setResults(data);
    } catch (err: any) {
      setError('Failed to fetch calculation results.');
    } finally {
      setLoading(false);
    }
  };

  const getStep = (n: number) => results?.steps?.[n];

  return (
    <Box sx={{ minHeight: '100vh', background: '#181825', py: 6, overflowY: 'auto', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Container maxWidth={false} disableGutters sx={{ width: '100vw', px: { xs: 1, md: 6 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: '#b4befe', fontWeight: 800, mb: 4, letterSpacing: 1, textAlign: 'center', textShadow: '0 2px 8px rgba(180, 190, 254, 0.2)' }}>
          {results ? 'Calculation Steps' : 'Test: All Steps Preview (API)'}
        </Typography>
        {!results && (
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 6, background: '#232136', borderRadius: 3, p: 4, boxShadow: '0 2px 16px 0 rgba(180, 190, 254, 0.1)', border: '1.5px solid #313244', width: '100%', maxWidth: 1400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack spacing={3} direction={{ xs: 'column', sm: 'row' }} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <TextField
                label="Number of Criteria"
                type="number"
                value={numCriteria || ''}
                onChange={e => setNumCriteria(Number(e.target.value))}
                required
                sx={{ input: { color: '#cdd6f4' }, label: { color: '#f5c2e7' }, flex: 1, minWidth: 180 }}
              />
              <TextField
                label="Number of Alternatives"
                type="number"
                value={numAlternatives || ''}
                onChange={e => setNumAlternatives(Number(e.target.value))}
                required
                sx={{ input: { color: '#cdd6f4' }, label: { color: '#f5c2e7' }, flex: 1, minWidth: 180 }}
              />
              <TextField
                label="Cost Criteria Indices (comma separated)"
                value={costCriteriaIndices}
                onChange={e => setCostCriteriaIndices(e.target.value)}
                placeholder="e.g. 1,3"
                sx={{ input: { color: '#cdd6f4' }, label: { color: '#f5c2e7' }, flex: 2, minWidth: 220 }}
              />
              <Button variant="contained" component="label" sx={{ background: '#b4befe', color: '#181825', fontWeight: 700, flex: 1, minWidth: 160, '&:hover': { background: '#f5c2e7' } }}>
                Upload CSV
                <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
              </Button>
              <Button type="submit" variant="contained" sx={{ background: '#f5c2e7', color: '#181825', fontWeight: 700, flex: 1, minWidth: 160, '&:hover': { background: '#b4befe' } }}>
                {loading ? <CircularProgress size={24} sx={{ color: '#181825' }} /> : 'Run Test'}
              </Button>
            </Stack>
            {csvFile && <Typography sx={{ color: '#f5c2e7', mt: 2 }}>Selected file: {csvFile.name}</Typography>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </Box>
        )}
        <Box sx={{ width: '100%', maxWidth: 1400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {results && (
            <>
              {getStep(1) && <Step1PairwiseMatrix data={getStep(1)} />}
              {getStep(2) && <Step2ExpertWeights data={getStep(2)} />}
              {getStep(3) && Array.isArray(getStep(3)) && <Step3ExpertAssignments data={getStep(3)} />}
              {getStep(4) && <Step4ExpertMatrix data={getStep(4)} />}
              {getStep(5) && <Step5NormalizedMatrix data={getStep(5)} />}
              {getStep(6) && <Step6AggregatedMatrix data={getStep(6)} />}
              {getStep(7) && getStep(8) && getStep(9) && getStep(10) && (
                <Step7to10Table step7={getStep(7)} step8={getStep(8)} step9={getStep(9)} step10={getStep(10)} />
              )}
              {getStep(11) && <Step11ExpertConsistencyRatios data={getStep(11)} />}
              {getStep(12) && <Step12ExpertWeights data={getStep(12)} />}
              {getStep(13) && <Step13AggregatedExpertWeights data={getStep(13)} />}
              {getStep(14) && <Step14WeightsMatrix data={getStep(14)} />}
              {getStep(15) && <Step15FinalWeights data={getStep(15)} />}
              {getStep(16) && <Step16Ranking data={getStep(16)} />}
              {getStep(17) && <Step17Summary data={results.rankings} />}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default FullSteps; 
