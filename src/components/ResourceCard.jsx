// File type icon mappings
const fileTypeIcons = {
  pdf: '📄',
  zip: '📦',
  png: '🖼️',
  jpg: '🖼️',
  link: '🔗',
  video: '🎬',
  folder: '📁'
};

// Category color mapping for accent stripe
const getCategoryAccentClass = (section) => {
  switch (section) {
    case 'marketing':
    case 'cobranded':
      return 'bg-category-marketing';
    case 'sales':
      return 'bg-category-sales';
    case 'projects':
      return 'bg-category-projects';
    default:
      return 'bg-category-marketing';
  }
};

function ResourceCard({ resource, onNavigate }) {
  const {
    title,
    description,
    dateUpdated,
    section,
    fileType,
    url,
    isExternal,
    isComingSoon,
    navigateTo
  } = resource;

  const handleClick = () => {
    if (isComingSoon) return;
    // Handle internal navigation for folder type
    if (navigateTo && onNavigate) {
      onNavigate(navigateTo);
      return;
    }
    if (isExternal) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Trigger download with BASE_URL for GitHub Pages compatibility
      const fullUrl = `${import.meta.env.BASE_URL}${url.startsWith('/') ? url.slice(1) : url}`;
      window.location.href = fullUrl;
    }
  };

  // Format date
  const formattedDate = new Date(dateUpdated).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const accentClass = getCategoryAccentClass(section);

  return (
    <div
      onClick={handleClick}
      className={`relative bg-surface-1 border border-default rounded-lg overflow-hidden ${
        isComingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer card-hover'
      }`}
    >
      {/* Category accent stripe */}
      <div className={`accent-stripe ${accentClass}`} />

      {/* Preview Image */}
      <div className="aspect-[4/3] bg-surface-3 flex items-center justify-center relative ml-1">
        <span className="text-6xl">{fileTypeIcons[fileType] || '📁'}</span>
        {isComingSoon && (
          <div className="absolute top-2 right-2 bg-surface-4 text-primary text-xs font-medium px-2 py-1 rounded">
            Coming Soon
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 pl-5">
        {/* Title */}
        <h3 className="font-medium text-primary mb-1 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-secondary mb-3 line-clamp-2">
          {description}
        </p>

        {/* Updated Date & External Indicator */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-tertiary">
            Updated: {formattedDate}
          </p>
          {isExternal && !isComingSoon && (
            <span className="text-tertiary text-sm">↗</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
