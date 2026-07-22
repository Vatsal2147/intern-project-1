import LoadingSpinner from './LoadingSpinner.jsx';

const STATUS_CONFIG = {
  success: { role: 'status', live: 'polite' },
  error: { role: 'alert', live: 'assertive' },
  loading: { role: 'status', live: 'polite' },
};

/**
 * Unified banner for loading, success, and error feedback.
 * Uses assertive live region for errors so screen readers announce them immediately.
 */
export default function StatusBanner({ type, message }) {
  if (!message) return null;

  const config = STATUS_CONFIG[type] ?? STATUS_CONFIG.success;

  return (
    <div
      className={`status-banner status-banner--${type}`}
      role={config.role}
      aria-live={config.live}
      aria-atomic="true"
    >
      {type === 'loading' && <LoadingSpinner label="Saving settings" />}
      <p className="status-banner__message">{message}</p>
    </div>
  );
}
