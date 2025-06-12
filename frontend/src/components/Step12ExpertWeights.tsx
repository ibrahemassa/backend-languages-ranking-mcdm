import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Step12ExpertWeightsProps {
  data: number[][];
}

const Step12ExpertWeights: React.FC<Step12ExpertWeightsProps> = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ color: '#b4befe', fontWeight: 700, mb: 2 }}>
        Step 12: Linear Normalization
      </Typography>
      <TableContainer component={Paper} sx={{ background: '#232136', borderRadius: 2, boxShadow: '0 2px 16px 0 #18182588', border: '1.5px solid #313244' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>Alternative</TableCell>
              {data[0].map((_, j) => (
                <TableCell key={j} sx={{ color: '#a6adc8', fontWeight: 700 }}>C{j + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ color: '#cdd6f4' }}>A{i + 1}</TableCell>
                {row.map((val, j) => (
                  <TableCell key={j} sx={{ color: '#94e2d5' }}>{val.toFixed(4)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Step12ExpertWeights; 
