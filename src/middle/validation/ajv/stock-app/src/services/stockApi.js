import axios from 'axios';
import { validateResponse, getValidationErrors } from '../validation/validator';

const API_URL = 'https://api.twelvedata.com';

export const fetchStockData = async (symbol, interval = '5min') => {
  try {
    const response = await axios.get(`${API_URL}/time_series`, {
      params: {
        symbol,
        interval,
        apikey: 'demo',
        outputsize: 10
      }
    });
    
    // Валидация ответа
    if (!validateResponse(response.data)) {
      const validationErrors = getValidationErrors(validateResponse.errors);
      throw new Error(
        `Invalid API response: ${validationErrors.map(e => e.message).join(', ')}`
      );
    }
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch stock data');
  }
};