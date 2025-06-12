import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Step7AggregatedWeightsProps {
  data: number[];
}

const Step7AggregatedWeights: React.FC<Step7AggregatedWeightsProps> = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ color: '#b4befe', fontWeight: 700, mb: 2 }}>
        Step 7: Mean values
      </Typography>
      <TableContainer component={Paper} sx={{ background: '#232136', borderRadius: 2, boxShadow: '0 2px 16px 0 #18182588', border: '1.5px solid #313244', maxWidth: 500 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>#</TableCell>
              <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>Weight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((val, i) => (
              <TableRow key={i}>
                <TableCell sx={{ color: '#cdd6f4' }}>{i + 1}</TableCell>
                <TableCell sx={{ color: '#94e2d5' }}>{val}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Step7AggregatedWeights; 
