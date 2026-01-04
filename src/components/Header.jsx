function Header({ onLogout }) {
  return (
    <header className="h-14 sm:h-16 bg-surface border-b border-border sticky top-0 z-50">
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo/Brand - Mobile First */}
        <div className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}assets/hh-logo500.png`}
            alt="Herb's House Coffee"
            className="h-8 sm:h-10"
          />
          <span className="hidden sm:inline text-text-secondary">|</span>
          <span className="hidden sm:inline text-sm text-text-secondary">
            Partner Portal
          </span>
        </div>

        {/* Logout Button - Minimum 44px touch target */}
        <button
          onClick={onLogout}
          className="text-sm text-text-secondary hover:text-text-primary transition-colors px-4 py-3 rounded hover:bg-background min-h-[44px]"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
