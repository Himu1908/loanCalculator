import { useState, useEffect } from 'react';
import axios from 'axios';

const useExchangeRates = (baseCurrency = 'INR') => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        setRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  return { rates, loading };
};

export default useExchangeRates;
