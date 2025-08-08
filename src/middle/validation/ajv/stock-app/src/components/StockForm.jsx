import { useState } from 'react';
import { validateRequest, getValidationErrors } from '../validation/validator';

export const StockForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    symbol: 'AAPL',
    interval: '5min'
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'symbol' ? value.toUpperCase() : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Валидация данных формы
    const isValid = validateRequest(formData);
    if (!isValid) {
      setErrors(getValidationErrors(validateRequest.errors));
      return;
    }
    
    setErrors([]);
    onSubmit(formData);
  };

  const getError = (fieldName) => 
    errors.find(e => e.field === fieldName)?.message;

  return (
    <form onSubmit={handleSubmit} className="stock-form">
      <div className="form-group">
        <label htmlFor="symbol">Stock Symbol:</label>
        <input
          id="symbol"
          type="text"
          value={formData.symbol}
          onChange={handleChange}
          placeholder="e.g. AAPL"
          className={getError('symbol') ? 'error-field' : ''}
        />
        {getError('symbol') && (
          <span className="error-message">{getError('symbol')}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="interval">Interval:</label>
        <select
          id="interval"
          value={formData.interval}
          onChange={handleChange}
          className={getError('interval') ? 'error-field' : ''}
        >
          <option value="1min">1 Minute</option>
          <option value="5min">5 Minutes</option>
          <option value="15min">15 Minutes</option>
          <option value="30min">30 Minutes</option>
          <option value="60min">60 Minutes</option>
        </select>
        {getError('interval') && (
          <span className="error-message">{getError('interval')}</span>
        )}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Stock Data'}
      </button>
    </form>
  );
};