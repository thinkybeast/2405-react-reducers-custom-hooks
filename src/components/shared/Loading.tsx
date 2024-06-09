const Loading = ({ children }: { children?: React.ReactNode }) => {
  return (
    <h2 style={{ color: "rebeccapurple", fontStyle: "italic" }}>{children}</h2>
  );
};

export default Loading;
