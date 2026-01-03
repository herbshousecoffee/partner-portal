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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Herb's House Logo */}
        <div className="text-center mb-8">
          <img
            src="/assets/hh-logo500.png"
            alt="Herb's House Coffee"
            className="h-24 mx-auto mb-4"
          />
          <p className="text-text-secondary text-sm">Partner Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface rounded-lg shadow-medium p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="passcode" className="block text-sm font-medium text-text-primary mb-2">
                Enter Passcode
              </label>
              <input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-herbs-blue focus:border-transparent"
                placeholder="••••••••••"
              />
            </div>

            {error && (
              <div className="mb-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-herbs-blue hover:bg-herbs-blue-dark text-white font-medium py-3 px-4 rounded-sm transition-colors duration-200"
            >
              Enter Portal →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
