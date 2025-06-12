import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function formatNumberSmart(num: number) {
  if (typeof num !== 'number') return num;
  return parseFloat(num.toFixed(3)).toString();
}

interface Step2ExpertWeightsProps {
  data: number[];
}

const Step2ExpertWeights: React.FC<Step2ExpertWeightsProps> = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ color: '#b4befe', fontWeight: 700, mb: 2 }}>
        Step 2: Expert Scores
      </Typography>
      <TableContainer component={Paper} sx={{ background: '#232136', borderRadius: 2, boxShadow: '0 2px 16px 0 #18182588', border: '1.5px solid #313244', overflowX: 'auto' }}>
        <Table size="small" sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>Expert</TableCell>
              {data.map((_, i) => (
                <TableCell key={i} sx={{ color: '#a6adc8', fontWeight: 700 }}>{i + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ color: '#cdd6f4', fontWeight: 700 }}>Score</TableCell>
              {data.map((val, i) => (
                <TableCell key={i} sx={{ color: '#94e2d5' }}>{formatNumberSmart(val)}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Step2ExpertWeights; 
