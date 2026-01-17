import { useState } from 'react';

function LoginScreen({ onLogin }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!passcode.trim()) {
      setError('Please enter passcode');
      return;
    }

    const success = onLogin(passcode);
    if (!success) {
      setError('Incorrect passcode');
      setPasscode('');
    }
  };

  return (
    <main className="min-h-screen bg-surface-0 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card with accent stripe */}
        <section className="relative bg-surface-1 rounded-lg border border-default overflow-hidden" aria-labelledby="login-heading">
          {/* Accent stripe */}
          <div className="accent-stripe bg-accent-primary" />

          {/* Card header area */}
          <div className="pt-12 pb-6 px-8 ml-1">
            {/* Branding: Logo | Partner */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <img
                src={`${import.meta.env.BASE_URL}assets/HH-ID.svg`}
                alt="Herb's House"
                className="h-10 w-10"
              />
              <span className="text-secondary text-2xl font-light">|</span>
              <h1 className="text-2xl font-semibold text-primary">
                Partner
              </h1>
            </div>

            <p className="text-sm text-secondary text-center">
              Enter your passcode to continue
            </p>
          </div>

          {/* Form area */}
          <div className="px-8 pb-8 ml-1">
            <h2 id="login-heading" className="sr-only">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="passcode" className="block text-sm font-medium text-primary mb-2">
                  Passcode
                </label>
                <input
                  id="passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-2 border border-default rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-colors text-primary placeholder:text-tertiary"
                  placeholder="••••••••••"
                />
              </div>

              {error && (
                <div className="mb-4 text-status-overdue text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-accent-primary hover:bg-accent-primary-hover text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
              >
                Enter Portal
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginScreen;
