import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface Step8ConsistencyIndexProps {
  data: number;
}

const Step8ConsistencyIndex: React.FC<Step8ConsistencyIndexProps> = ({ data }) => {
  if (data === undefined || data === null) return null;
  return (
    <Box sx={{ my: 4, maxWidth: 400 }}>
      <Paper sx={{ background: '#232136', borderRadius: 2, boxShadow: '0 2px 16px 0 #18182588', border: '1.5px solid #313244', p: 3 }}>
        <Typography variant="h6" sx={{ color: '#b4befe', fontWeight: 700, mb: 1 }}>
          Step 8: Preference Variation
        </Typography>
        <Typography variant="h4" sx={{ color: '#a6e3a1', fontWeight: 700 }}>
          {data}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Step8ConsistencyIndex; 
