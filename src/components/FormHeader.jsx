export default function FormHeader({ id, title, description }) {
  return (
    <header className="form-header">
      <h1 id={id}>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}
