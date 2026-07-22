import AnimatedBackground from './components/AnimatedBackground.jsx';
import SettingsForm from './components/SettingsForm.jsx';

export default function App() {
  return (
    <>
      <AnimatedBackground />
      <main className="app" id="main-content">
        <SettingsForm />
      </main>
    </>
  );
}
