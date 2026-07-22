export default function FormSection({ id, title, description, children }) {
  return (
    <section className="form-section" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {description && <p className="form-section__description">{description}</p>}
      {children}
    </section>
  );
}
