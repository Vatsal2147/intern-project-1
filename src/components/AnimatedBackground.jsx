import './AnimatedBackground.css';

/**
 * Full-viewport animated gradient backdrop.
 * Decorative only — hidden from assistive tech via aria-hidden.
 */
export default function AnimatedBackground() {
  return (
    <div className="animated-background" aria-hidden="true">
      <div className="animated-background__orb animated-background__orb--one" />
      <div className="animated-background__orb animated-background__orb--two" />
      <div className="animated-background__orb animated-background__orb--three" />
      <div className="animated-background__orb animated-background__orb--four" />
    </div>
  );
}
