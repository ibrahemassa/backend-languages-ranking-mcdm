import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from '@mui/material';

interface Step4ExpertMatrixProps {
  data: (number | [number, number])[][][];
}

const Step4ExpertMatrix: React.FC<Step4ExpertMatrixProps> = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <Box sx={{ my: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      <Typography variant="h6" sx={{ color: '#b4befe', fontWeight: 700, mb: 2, textAlign: 'left' }}>
        Step 4: Initial Decision Matrices (per Expert)
      </Typography>
      <Stack spacing={4} sx={{ width: '100%', alignItems: 'center' }}>
        {data.map((matrix, idx) => (
          <Box key={idx} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Typography variant="subtitle1" sx={{ color: '#a6adc8', fontWeight: 700, mb: 1, textAlign: 'left' }}>
              Expert {idx + 1}
            </Typography>
            <TableContainer component={Paper} sx={{ background: '#232136', borderRadius: 2, boxShadow: '0 2px 16px 0 #18182588', border: '1.5px solid #313244', width: '100%', maxWidth: '100%' }}>
              <Table size="small" sx={{ width: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>#</TableCell>
                    {matrix[0].map((_, j) => (
                      <TableCell key={j} sx={{ color: '#a6adc8', fontWeight: 700 }}>C{j + 1}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {matrix.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>A{i + 1}</TableCell>
                      {row.map((val, j) => (
                        <TableCell key={j} sx={{ color: '#cdd6f4' }}>
                          {Array.isArray(val) && val.length === 2 ? `${val[0]}, ${val[1]}` : val}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Step4ExpertMatrix; 
