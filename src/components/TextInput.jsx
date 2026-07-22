import FormField from './FormField.jsx';

/**
 * Text-based input wired to FormField for consistent labeling and ARIA.
 */
export default function TextInput({
  id,
  name,
  label,
  type = 'text',
  value,
  hint,
  error,
  autoComplete,
  required = false,
  disabled = false,
  onChange,
  onBlur,
}) {
  return (
    <FormField id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
    </FormField>
  );
}
