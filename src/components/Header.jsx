import { ThemeToggle } from './ThemeToggle';

function Header({ onLogout }) {
  return (
    <header className="bg-surface-0 p-6 sm:p-8">
      <div className="max-w-full mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}assets/HH-ID.svg`}
            alt="Herb's House"
            className="h-8 w-8"
          />
          <h1 className="text-xl font-semibold text-primary">
            Partner
          </h1>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={onLogout}
            className="text-sm text-secondary hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-surface-2"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
