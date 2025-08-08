export const StockTable = ({ data }) => {
  if (!data) return null;

  return (
    <div className="stock-data">
      <h3>{data.meta.symbol} Stock Data ({data.meta.interval})</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {data.values.map((item, index) => (
            <tr key={index}>
              <td>{item.datetime}</td>
              <td>{item.open}</td>
              <td>{item.high}</td>
              <td>{item.low}</td>
              <td>{item.close}</td>
              <td>{item.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};