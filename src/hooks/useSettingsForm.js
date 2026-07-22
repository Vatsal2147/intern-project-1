import { useCallback, useRef, useState } from 'react';
import { PROFILE_FIELDS } from '../constants/formFields.js';
import {
  createAllTouchedState,
  getLinkedValidationFields,
} from '../utils/formHelpers.js';
import { saveSettings } from '../utils/saveSettings.js';
import {
  buildSettingsPayload,
  initialSettings,
  isSettingsValid,
  SETTINGS_FIELD_NAMES,
  validateField,
  validateSettings,
} from '../utils/validation.js';

/**
 * Encapsulates all form state, validation, and async submit logic.
 * Keeps SettingsForm focused on layout and rendering.
 */
export default function useSettingsForm() {
  const [values, setValues] = useState(initialSettings);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(null);

  // Ref ensures blur handlers always validate the latest input values.
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const isLoading = status?.type === 'loading';
  const canSubmit = isSettingsValid(values);

  const applyFieldValidation = useCallback((nextValues, fields) => {
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      fields.forEach((field) => {
        if (touched[field]) {
          nextErrors[field] = validateField(field, nextValues);
        }
      });
      return nextErrors;
    });
  }, [touched]);

  const updateValue = useCallback((name, value) => {
    setValues((current) => {
      const next = { ...current, [name]: value };
      const fieldsToValidate = getLinkedValidationFields(name);
      applyFieldValidation(next, fieldsToValidate);
      return next;
    });
    setStatus(null);
  }, [applyFieldValidation]);

  const handleBlur = useCallback((name) => {
    setTouched((current) => ({ ...current, [name]: true }));

    const fieldsToValidate = getLinkedValidationFields(name);
    setErrors((current) => {
      const nextErrors = { ...current };
      fieldsToValidate.forEach((field) => {
        nextErrors[field] = validateField(field, valuesRef.current);
      });
      return nextErrors;
    });
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    const nextErrors = validateSettings(values);
    setErrors(nextErrors);
    setTouched(createAllTouchedState(SETTINGS_FIELD_NAMES));

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: 'error',
        message: 'Fix the highlighted fields and try again.',
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Saving your settings…' });

    try {
      const payload = buildSettingsPayload(values);
      await saveSettings(payload);
      setStatus({ type: 'success', message: 'Settings saved successfully.' });
      console.log('Saved settings:', payload);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message ?? 'Something went wrong. Please try again.',
      });
    }
  }, [values]);

  const handleReset = useCallback(() => {
    setValues(initialSettings);
    setErrors({});
    setTouched({});
    setStatus(null);
  }, []);

  const getFieldProps = useCallback((field) => ({
    id: field.name,
    name: field.name,
    label: field.label,
    type: field.type,
    hint: field.hint,
    autoComplete: field.autoComplete,
    required: field.required,
    value: values[field.name],
    error: touched[field.name] ? errors[field.name] : '',
    disabled: isLoading,
    onChange: (event) => updateValue(field.name, event.target.value),
    onBlur: () => handleBlur(field.name),
  }), [errors, handleBlur, isLoading, touched, updateValue, values]);

  return {
    fields: PROFILE_FIELDS,
    status,
    isLoading,
    canSubmit,
    handleSubmit,
    handleReset,
    getFieldProps,
  };
}
