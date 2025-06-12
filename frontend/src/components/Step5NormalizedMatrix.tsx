import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from '@mui/material';

function formatNumberSmart(num: number) {
  if (typeof num !== 'number') return num;
  return parseFloat(num.toFixed(3)).toString();
}

interface Step5NormalizedMatrixProps {
  data: number[][][];
}

const Step5NormalizedMatrix: React.FC<Step5NormalizedMatrixProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ color: '#b4befe', fontWeight: 700, mb: 2 }}>
        Step 5: Aggregated Normalized Matrices (per Alternative)
      </Typography>
      <Stack spacing={4}>
        {data.map((matrix, idx) => {
          if (!matrix || matrix.length === 0 || !matrix[0]) return null;

          const numRows = matrix.length;
          const numCols = matrix[0].length;

          const transposedMatrix: number[][] = [];
          for (let j = 0; j < numCols; j++) {
            const newRow: number[] = [];
            for (let i = 0; i < numRows; i++) {
              newRow.push(matrix[i][j]);
            }
            transposedMatrix.push(newRow);
          }

          return (
            <Box key={idx}>
              <Typography variant="h6" sx={{ color: '#b4befe', fontWeight: 700, mb: 2 }}>
                Alternative {idx + 1}
              </Typography>
              <TableContainer component={Paper} sx={{ background: '#232136', borderRadius: 2, boxShadow: '0 2px 16px 0 #18182588', border: '1.5px solid #313244', overflowX: 'auto' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>#</TableCell>
                      {/* Headers for original rows */}
                      {Array.from({ length: numRows }).map((_, j) => (
                        <TableCell key={j} sx={{ color: '#a6adc8', fontWeight: 700 }}>C{j + 1}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transposedMatrix.map((row, i) => (
                      <TableRow key={i}>
                        {/* Labels for original columns */}
                        <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>
                          {i === 0 ? 'X' : i === 1 ? 'Y' : i + 1}
                        </TableCell>
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
        })}
      </Stack>
    </Box>
  );
};

export default Step5NormalizedMatrix; 
