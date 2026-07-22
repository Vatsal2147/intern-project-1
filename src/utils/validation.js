/** Basic email format check — not exhaustive, but catches common typos. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 8;

export const initialSettings = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

/** All settings field names — used to mark every field touched on submit. */
export const SETTINGS_FIELD_NAMES = Object.keys(initialSettings);

/**
 * Validates every field and returns an object keyed by field name.
 * An empty object means the form is valid.
 */
export function validateSettings(values) {
  const errors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = 'Name is required.';
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required.';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

/** Validates a single field by reusing the full-form validator. */
export function validateField(name, values) {
  return validateSettings(values)[name] ?? '';
}

/** Returns true when every field passes validation — used to enable the submit button. */
export function isSettingsValid(values) {
  return Object.keys(validateSettings(values)).length === 0;
}

/** Builds a trimmed payload safe to send to the server (passwords excluded). */
export function buildSettingsPayload(values) {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
  };
}
