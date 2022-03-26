// components/Spinner.tsx
interface Props {
  text?: string;
  size?: string;
}

export default function Spinner({ text = "", size = "5em" }: Props) {
  const header = text ? <h4>{text}</h4> : null;

  return (
    <div className="spinner">
      {header}
      <div className="loader" style={{ height: size, width: size }} />
    </div>
  );
}
