import { cloneElement } from 'react';

/**
 * Wraps a labeled input with optional hint and inline error messaging.
 * Wires aria-invalid and aria-describedby so screen readers announce errors.
 */
export default function FormField({
  id,
  label,
  error,
  hint,
  children,
}) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint && !error ? `${id}-hint` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`form-field${error ? ' form-field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {cloneElement(children, {
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
      })}
      {hint && !error && (
        <p id={hintId} className="form-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="form-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
