import FormActions from './FormActions.jsx';
import FormHeader from './FormHeader.jsx';
import FormSection from './FormSection.jsx';
import StatusBanner from './StatusBanner.jsx';
import TextInput from './TextInput.jsx';
import useSettingsForm from '../hooks/useSettingsForm.js';
import './SettingsForm.css';

export default function SettingsForm() {
  const {
    fields,
    status,
    isLoading,
    canSubmit,
    handleSubmit,
    handleReset,
    getFieldProps,
  } = useSettingsForm();

  return (
    <article className="settings-card">
      <form
        className="settings-form"
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="settings-form-title"
        aria-describedby={status ? 'settings-form-status' : undefined}
        aria-busy={isLoading}
      >
        <FormHeader
          id="settings-form-title"
          title="Account Settings"
          description="Update your profile information."
        />

        <FormSection
          id="profile-heading"
          title="Profile"
          description="Your name and email appear on your account."
        >
          {fields.map((field) => (
            <TextInput key={field.name} {...getFieldProps(field)} />
          ))}
        </FormSection>

        {status && (
          <div id="settings-form-status">
            <StatusBanner type={status.type} message={status.message} />
          </div>
        )}

        <FormActions
          onReset={handleReset}
          isSubmitDisabled={!canSubmit}
          isLoading={isLoading}
        />
      </form>
    </article>
  );
}
