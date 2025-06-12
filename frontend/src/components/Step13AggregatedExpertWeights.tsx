import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface Step13AggregatedExpertWeightsProps {
  data: number[][];
}

const Step13AggregatedExpertWeights: React.FC<Step13AggregatedExpertWeightsProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const numColumns = data[0]?.length || 0;

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ color: '#b4befe', fontWeight: 700, mb: 2 }}>
        Step 13: Vector Normalization
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          background: '#232136',
          borderRadius: 2,
          boxShadow: '0 2px 16px 0 #18182588',
          border: '1.5px solid #313244',
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#a6adc8', fontWeight: 700 }}>#</TableCell>
              {[...Array(numColumns)].map((_, colIndex) => (
                <TableCell key={colIndex} sx={{ color: '#a6adc8', fontWeight: 700 }}>
                  C{colIndex + 1}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell sx={{ color: '#cdd6f4' }}>A{rowIndex + 1}</TableCell>
                {row.map((val, colIndex) => (
                  <TableCell key={colIndex} sx={{ color: '#a6e3a1' }}>
                    {val.toFixed(4)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Step13AggregatedExpertWeights;
