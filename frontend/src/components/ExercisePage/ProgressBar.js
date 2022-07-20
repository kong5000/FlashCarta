import * as React from 'react';
import LinearProgress, { linearProgressClasses }  from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));



export default function LinearWithValueLabel({ index, lastIndex }) {
  return (
    <Box sx={{ width: '70%', margin: '10px 0px 10px 0px' }}>
      <BorderLinearProgress variant="determinate" value={100 * (index / lastIndex)} />
    </Box>
  );
}
