interface UserErrorProps {
  onRetry: () => void;
}

const UserError = ({ onRetry }: UserErrorProps) => {
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
      <p>We seem to have some trouble finding a cool user at the moment.</p>
      <button onClick={onRetry} style={{ backgroundColor: "white" }}>
        It is okay. Try again.
      </button>
    </div>
  );
};

export default UserError;
