import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function formatNumberSmart(num: number) {
  if (typeof num !== 'number') return num;
  return parseFloat(num.toFixed(3)).toString();
}

interface Step7to10TableProps {
  step7: number[];
  step8: number[];
  step9: number[];
  step10: number[];
}

const Step7to10Table: React.FC<Step7to10TableProps> = ({ step7, step8, step9, step10 }) => {
  if (!step7 || !step8 || !step9 || !step10) return null;
  const n = Math.min(step7.length, step8.length, step9.length, step10.length);
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ color: '#b4befe', fontWeight: 700, mb: 2 }}>
        Steps 7-10: The mean values, preference variation values, and deviation preference values.
      </Typography>
      <TableContainer component={Paper} sx={{ background: '#232136', borderRadius: 2, boxShadow: '0 2px 16px 0 #18182588', border: '1.5px solid #313244', width: '100%', maxWidth: 900, mx: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>Criteria</TableCell>
              <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>Mean</TableCell>
              <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>Ω</TableCell>
              <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>Φ</TableCell>
              <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>Weight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: n }).map((_, i) => (
              <TableRow key={i}>
                <TableCell sx={{ color: '#cdd6f4' }}>{i + 1}</TableCell>
                <TableCell sx={{ color: '#cdd6f4' }}>{formatNumberSmart(step7[i])}</TableCell>
                <TableCell sx={{ color: '#cdd6f4' }}>{formatNumberSmart(step8[i])}</TableCell>
                <TableCell sx={{ color: '#cdd6f4' }}>{formatNumberSmart(step9[i])}</TableCell>
                <TableCell sx={{ color: '#cdd6f4' }}>{formatNumberSmart(step10[i])}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Step7to10Table; 