import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Step14WeightsMatrixProps {
  data: number[][];
}

const Step14WeightsMatrix: React.FC<Step14WeightsMatrixProps> = ({ data }) => {
  if (!data || data.length === 0) return null;
  // Calculate mean for each column
  // const means = data[0].map((_, colIdx) => {
  //   const sum = data.reduce((acc, row) => acc + (row[colIdx] || 0), 0);
  //   return (sum / data.length).toFixed(4);
  // });
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ color: '#b4befe', fontWeight: 700, mb: 2 }}>
        Step 14: Aggregated Average Normalization
      </Typography>
      <TableContainer component={Paper} sx={{ background: '#232136', borderRadius: 2, boxShadow: '0 2px 16px 0 #18182588', border: '1.5px solid #313244' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#a6adc8', fontWeight: 700, fontStyle: 'italic' }}>#</TableCell>
              {data[0].map((_, j) => (
                <TableCell key={j} sx={{ color: '#a6adc8', fontWeight: 700 }}>{`C${j + 1}`}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ color: '#a6adc8', fontWeight: 700, fontStyle: 'italic' }}>{`A${i + 1}`}</TableCell>
                {row.map((val, j) => (
                  <TableCell key={j} sx={{ color: '#cdd6f4' }}>{val.toFixed(4)}</TableCell>
                ))}
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Step14WeightsMatrix; 
