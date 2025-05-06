import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Pagination,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import useEmiCalculator from '../hooks/useEMICalculator';
import useExchangeRates from '../hooks/useExchangeRates';

const ITEMS_PER_PAGE = 6;

const Home = () => {
  const [formValues, setFormValues] = useState({
    principal: '',
    interestRate: '',
    loanTerm: '',
  });

  const [page, setPage] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const { emi, amortization, calculateEmi } = useEmiCalculator();
  const { rates, loading } = useExchangeRates('INR');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEmi(formValues);
    setPage(1);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const paginatedSchedule = amortization.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const convertedEmi = rates[selectedCurrency]
    ? (emi * rates[selectedCurrency]).toFixed(2)
    : null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Loan EMI Calculator
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="principal"
              label="Loan Amount"
              fullWidth
              type="number"
              value={formValues.principal}
              onChange={handleChange}
              required
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="interestRate"
              label="Interest Rate (%)"
              fullWidth
              type="number"
              value={formValues.interestRate}
              onChange={handleChange}
              required
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="loanTerm"
              label="Loan Term (in Years)"
              fullWidth
              type="number"
              value={formValues.loanTerm}
              onChange={handleChange}
              required
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 3 }}
        >
          Calculate EMI
        </Button>
      </form>

      {emi > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 4 }}>
            Monthly EMI: ₹{emi}
          </Typography>

          {!loading && (
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel id="currency-select-label">Currency</InputLabel>
              <Select
                labelId="currency-select-label"
                value={selectedCurrency}
                label="Currency"
                onChange={handleCurrencyChange}
              >
                {Object.keys(rates).map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {convertedEmi && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Converted EMI: {selectedCurrency} {convertedEmi}
            </Typography>
          )}

          <Paper sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedSchedule.map((item) => (
                  <TableRow key={item.month}>
                    <TableCell>{item.month}</TableCell>
                    <TableCell>₹{item.principal}</TableCell>
                    <TableCell>₹{item.interest}</TableCell>
                    <TableCell>₹{item.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {amortization.length > ITEMS_PER_PAGE && (
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={Math.ceil(amortization.length / ITEMS_PER_PAGE)}
                page={page}
                onChange={(e, value) => setPage(value)}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
