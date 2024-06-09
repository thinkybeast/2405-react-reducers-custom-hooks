interface ErrorProps {
  onRetry: () => void;
  children?: React.ReactNode;
}

const Error = ({ onRetry, children }: ErrorProps) => {
  return (
    <div
      style={{
        backgroundColor: "crimson",
        color: "white",
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      <h2>😔 Our deepest apologies. 😔</h2>
      <p>{children}</p>
      <button onClick={onRetry} style={{ backgroundColor: "white" }}>
        It is okay. Try again.
      </button>
    </div>
  );
};

export default Error;
