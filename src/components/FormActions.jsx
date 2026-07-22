import LoadingSpinner from './LoadingSpinner.jsx';

export default function FormActions({
  onReset,
  isSubmitDisabled,
  isLoading,
}) {
  return (
    <div className="form-actions">
      <button
        type="button"
        className="button button--secondary"
        onClick={onReset}
        disabled={isLoading}
        aria-disabled={isLoading}
      >
        Reset
      </button>
      <button
        type="submit"
        className="button button--primary"
        disabled={isSubmitDisabled || isLoading}
        aria-disabled={isSubmitDisabled || isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <LoadingSpinner label="Saving settings" />
            <span>Saving…</span>
          </>
        ) : (
          'Save settings'
        )}
      </button>
    </div>
  );
}
