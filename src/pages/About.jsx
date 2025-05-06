import React from 'react';
import { Container, Typography } from '@mui/material';


export default function About() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>About This App</Typography>
      <Typography>
        This Loan Calculator App is built using React and Material UI. It calculates loan EMIs,
        shows a detailed amortization schedule, and performs currency conversions using a live API.
      </Typography>
    </Container>
  );
}

