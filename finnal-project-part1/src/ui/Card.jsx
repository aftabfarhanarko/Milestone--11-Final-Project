export function Card({ children, className }) {
  return (
    <div className={`bg-white border rounded-2xl shadow ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}
