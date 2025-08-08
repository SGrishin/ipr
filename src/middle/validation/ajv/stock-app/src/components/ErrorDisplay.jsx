export const ErrorDisplay = ({ error }) => {
  if (!error) return null;

  return (
    <div className="error">
      Error: {error.message || 'Something went wrong'}
    </div>
  );
};