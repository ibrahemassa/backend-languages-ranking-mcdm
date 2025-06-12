import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Step1PairwiseMatrixProps {
  data: number[][];
}

const Step1PairwiseMatrix: React.FC<Step1PairwiseMatrixProps> = ({ data }) => {
  if (!data || data.length === 0 || !data[0]) return null;

  // Transpose the matrix
  const numRows = data.length;
  const numCols = data[0].length;

  const transposedData: number[][] = [];
  for (let j = 0; j < numCols; j++) {
    const newRow: number[] = [];
    for (let i = 0; i < numRows; i++) {
      newRow.push(data[i][j]);
    }
    transposedData.push(newRow);
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ color: '#b4befe', fontWeight: 700, mb: 2 }}>
        Step 1: FFYWA
      </Typography>
      <TableContainer component={Paper} sx={{ background: '#232136', borderRadius: 2, boxShadow: '0 2px 16px 0 #18182588', border: '1.5px solid #313244', overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>#</TableCell>
              {/* Headers for original rows */}
              {Array.from({ length: numRows }).map((_, j) => (
                <TableCell key={j} sx={{ color: '#a6adc8', fontWeight: 700 }}>{j + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transposedData.map((row, i) => (
              <TableRow key={i}>
                {/* Labels for original columns */}
                <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>
                  {i === 0 ? 'X' : i === 1 ? 'Y' : i + 1}
                </TableCell>
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

export default Step1PairwiseMatrix; 
