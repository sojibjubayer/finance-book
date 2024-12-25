
import { useState, useEffect } from 'react';

export const useCurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Example API call to fetch exchange rates
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        setRates(data.rates);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return amount;
    const rate = rates[toCurrency] / rates[fromCurrency];
    return amount * rate;
  };

  return { convertCurrency, isLoading, error };
};
