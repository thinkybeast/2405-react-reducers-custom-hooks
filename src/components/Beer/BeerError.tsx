interface BeerErrorProps {
  onRetry: () => void;
}

const BeerError = ({ onRetry }: BeerErrorProps) => {
  return (
    <div
      style={{
        backgroundColor: "brown",
        color: "white",
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      <h2>😔 Our deepest apologies. 😔</h2>
      <p>We seem to have some trouble finding a cold beer at the moment.</p>
      <button onClick={onRetry} style={{ backgroundColor: "white" }}>
        I demand refreshment
      </button>
    </div>
  );
};

export default BeerError;
