import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface Step17SummaryProps {
  data: string | Record<string, any>;
}

const Step17Summary: React.FC<Step17SummaryProps> = ({ data }) => {
  if (!data) return null;
  return (
    <Box sx={{ my: 4, maxWidth: 600 }}>
      <Paper sx={{ background: '#232136', borderRadius: 2, boxShadow: '0 2px 16px 0 #18182588', border: '1.5px solid #313244', p: 3 }}>
        <Typography variant="h6" sx={{ color: '#b4befe', fontWeight: 700, mb: 1 }}>
          Step 17: Alternatives Ranking
        </Typography>
        {typeof data === 'string' ? (
          <Typography variant="body1" sx={{ color: '#cdd6f4' }}>{data}</Typography>
        ) : (
          <Box sx={{ color: '#cdd6f4' }}>
            {data.map((item: { name: string; score: number }) => (
              <Box key={item.name} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body1" sx={{ color: '#cdd6f4', fontSize: '1.1rem', fontWeight: 500 }}>
                  {item.name}:
                </Typography>
                <Typography variant="body1" sx={{ color: '#cdd6f4', fontSize: '1.1rem' }}>
                  {item.score.toFixed(5)}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Step17Summary; 
