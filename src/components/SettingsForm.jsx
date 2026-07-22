import { useState } from 'react';
import FormField from './FormField.jsx';
import {
  initialSettings,
  isSettingsValid,
  validateField,
  validateSettings,
} from '../validation/settingsValidation.js';
import './SettingsForm.css';

export default function SettingsForm() {
  const [values, setValues] = useState(initialSettings);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(null);

  // Recompute submit availability on every change — no need to wait for blur.
  const canSubmit = isSettingsValid(values);

  const applyFieldValidation = (nextValues, fields) => {
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      fields.forEach((field) => {
        if (touched[field]) {
          nextErrors[field] = validateField(field, nextValues);
        }
      });
      return nextErrors;
    });
  };

  const updateValue = (name, value) => {
    setValues((current) => {
      const next = { ...current, [name]: value };

      // Password fields depend on each other — revalidate both when either changes.
      const fieldsToValidate = [name];
      if (name === 'password' || name === 'confirmPassword') {
        fieldsToValidate.push('password', 'confirmPassword');
      }
      applyFieldValidation(next, [...new Set(fieldsToValidate)]);

      return next;
    });
    setStatus(null);
  };

  const handleBlur = (name) => {
    setTouched((current) => ({ ...current, [name]: true }));

    const fieldsToValidate = [name];
    if (name === 'password' || name === 'confirmPassword') {
      fieldsToValidate.push('password', 'confirmPassword');
    }

    setErrors((current) => {
      const nextErrors = { ...current };
      [...new Set(fieldsToValidate)].forEach((field) => {
        nextErrors[field] = validateField(field, values);
      });
      return nextErrors;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateSettings(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: 'error', message: 'Fix the highlighted fields and try again.' });
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
    };

    setStatus({ type: 'success', message: 'Settings saved successfully.' });
    console.log('Saved settings:', payload);
  };

  const handleReset = () => {
    setValues(initialSettings);
    setErrors({});
    setTouched({});
    setStatus(null);
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <header className="settings-form__header">
        <h1>Account Settings</h1>
        <p>Update your profile information.</p>
      </header>

      <section className="settings-form__section" aria-labelledby="profile-heading">
        <h2 id="profile-heading">Profile</h2>

        <FormField
          id="name"
          label="Name"
          error={touched.name ? errors.name : ''}
        >
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => updateValue('name', event.target.value)}
            onBlur={() => handleBlur('name')}
          />
        </FormField>

        <FormField
          id="email"
          label="Email"
          error={touched.email ? errors.email : ''}
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => updateValue('email', event.target.value)}
            onBlur={() => handleBlur('email')}
          />
        </FormField>

        <FormField
          id="password"
          label="Password"
          hint="Must be at least 8 characters."
          error={touched.password ? errors.password : ''}
        >
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={values.password}
            onChange={(event) => updateValue('password', event.target.value)}
            onBlur={() => handleBlur('password')}
          />
        </FormField>

        <FormField
          id="confirmPassword"
          label="Confirm password"
          error={touched.confirmPassword ? errors.confirmPassword : ''}
        >
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={values.confirmPassword}
            onChange={(event) => updateValue('confirmPassword', event.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
          />
        </FormField>
      </section>

      {status && (
        <p
          className={`settings-form__status settings-form__status--${status.type}`}
          role="status"
        >
          {status.message}
        </p>
      )}

      <div className="settings-form__actions">
        <button type="button" className="button button--secondary" onClick={handleReset}>
          Reset
        </button>
        <button
          type="submit"
          className="button button--primary"
          disabled={!canSubmit}
        >
          Save settings
        </button>
      </div>
    </form>
  );
}
