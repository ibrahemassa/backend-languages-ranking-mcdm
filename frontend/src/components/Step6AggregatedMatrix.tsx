import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function formatNumberSmart(num: number) {
  if (typeof num !== 'number') return num;
  return parseFloat(num.toFixed(3)).toString();
}

interface Step6AggregatedMatrixProps {
  data: number[][];
}

const Step6AggregatedMatrix: React.FC<Step6AggregatedMatrixProps> = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ color: '#b4befe', fontWeight: 700, mb: 2 }}>
        Step 6: Normalized Aggregated Matrix
      </Typography>
      <TableContainer component={Paper} sx={{ background: '#232136', borderRadius: 2, boxShadow: '0 2px 16px 0 #18182588', border: '1.5px solid #313244' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>#</TableCell>
              {data[0].map((_, j) => (
                <TableCell key={j} sx={{ color: '#a6adc8', fontWeight: 700 }}>C{j + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>A{i + 1}</TableCell>
                {row.map((val, j) => (
                  <TableCell key={j} sx={{ color: '#cdd6f4' }}>{formatNumberSmart(val)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Step6AggregatedMatrix; 
