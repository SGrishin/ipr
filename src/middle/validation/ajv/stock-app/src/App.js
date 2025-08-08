import { useState } from 'react';
import { StockForm } from './components/StockForm';
import { StockTable } from './components/StockTable';
import { ErrorDisplay } from './components/ErrorDisplay';
import { fetchStockData } from './services/stockApi';
import './styles.css';

function App() {
  const [stockData, setStockData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      const data = await fetchStockData(formData.symbol, formData.interval);
      setStockData(data);
    } catch (err) {
      setApiError(err);
      setStockData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Stock Data Viewer</h1>
      <StockForm onSubmit={handleSubmit} isLoading={isLoading} />
      <ErrorDisplay error={apiError} />
      <StockTable data={stockData} />
    </div>
  );
}

export default App;