import { Button, TextField, Grid } from '@mui/material';
import { useState } from 'react';

export default function CalculatorForm({ onCalculate }) {
  const [amount, setAmount] = useState();
  const [rate, setRate] = useState();
  const [term, setTerm] = useState();

  const handleSubmit = () => {
    onCalculate({ amount: +amount, rate: +rate, term: +term });
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={3}>
        <TextField label="Loan Amount" fullWidth value={amount} onChange={e => setAmount(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField label="Interest Rate (%)" fullWidth value={rate} onChange={e => setRate(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField label="Term (Years)" fullWidth value={term} onChange={e => setTerm(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Button variant="contained" onClick={handleSubmit}>Calculate</Button>
      </Grid>
    </Grid>
  );
}
