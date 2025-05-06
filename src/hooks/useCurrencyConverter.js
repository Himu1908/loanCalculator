// src/hooks/useCurrencyConverter.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // 🔁 Replace with your actual key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/INR`;

const useCurrencyConverter = (amountInINR) => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(BASE_URL);
        setRates(res.data.conversion_rates);
      } catch (err) {
        setError('Error fetching exchange rates');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const convertTo = (currencyCode) => {
    if (!rates[currencyCode]) return null;
    return (amountInINR * rates[currencyCode]).toFixed(2);
  };

  return { rates, loading, error, convertTo };
};

export default useCurrencyConverter;
