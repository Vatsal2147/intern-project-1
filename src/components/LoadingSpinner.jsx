import './LoadingSpinner.css';

export default function LoadingSpinner({ label = 'Loading' }) {
  return (
    <span className="loading-spinner" role="status" aria-label={label}>
      <span className="loading-spinner__ring" aria-hidden="true" />
    </span>
  );
}
