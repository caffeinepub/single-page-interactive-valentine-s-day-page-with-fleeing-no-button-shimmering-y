import { useState } from 'react';
import ParallaxHeartsBackground from './features/valentine/components/ParallaxHeartsBackground';
import CTAButtons from './features/valentine/components/CTAButtons';
import MemeReveal from './features/valentine/components/MemeReveal';
import NoConfirmationOverlay from './features/valentine/components/NoConfirmationOverlay';
import { DeploymentDomainDialog } from './features/deployment/DeploymentDomainDialog';

function App() {
  const [showMeme, setShowMeme] = useState(false);
  const [showNoOverlay, setShowNoOverlay] = useState(false);

  const handleYesClick = () => {
    setShowMeme(true);
  };

  const handleNoClick = () => {
    setShowNoOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowNoOverlay(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParallaxHeartsBackground />
      
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
        {!showMeme ? (
          <div className="flex flex-col items-center gap-8 text-center">
            <h1 className="valentine-title text-5xl font-bold leading-tight md:text-7xl">
              Will you be my
              <br />
              <span className="valentine-gradient">Valentine?</span>
            </h1>
            <p className="max-w-md text-lg text-valentine-text md:text-xl">
              Choose wisely... 💕
            </p>
            <CTAButtons onYesClick={handleYesClick} onNoClick={handleNoClick} />
          </div>
        ) : (
          <MemeReveal />
        )}
      </main>

      {showNoOverlay && <NoConfirmationOverlay onClose={handleCloseOverlay} />}

      <footer className="relative z-10 py-6 text-center text-sm text-valentine-text/70">
        <p>
          Built with <span className="text-valentine-accent">❤️</span> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-valentine-accent transition-colors"
          >
            caffeine.ai
          </a>
        </p>
        <p className="mt-1">© {new Date().getFullYear()}</p>
        <div className="mt-2">
          <DeploymentDomainDialog />
        </div>
      </footer>
    </div>
  );
}

export default App;
