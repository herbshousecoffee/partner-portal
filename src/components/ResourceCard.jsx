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

const fileTypeColors = {
  pdf: 'text-red-600',
  zip: 'text-yellow-600',
  png: 'text-blue-600',
  jpg: 'text-blue-600',
  link: 'text-gray-600',
  video: 'text-purple-600',
  folder: 'text-amber-600'
};

function ResourceCard({ resource, onNavigate }) {
  const {
    title,
    description,
    dateUpdated,
    previewImage,
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

  return (
    <div
      onClick={handleClick}
      className={`bg-surface border border-border rounded-md overflow-hidden ${
        isComingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer card-hover'
      }`}
    >
      {/* Preview Image */}
      <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center relative">
        <span className="text-6xl">{fileTypeIcons[fileType] || '📁'}</span>
        {isComingSoon && (
          <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded">
            Coming Soon
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* File Type & External Indicator */}
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-medium uppercase ${fileTypeColors[fileType] || 'text-gray-600'}`}>
            {fileType}
          </span>
          {isExternal && !isComingSoon && (
            <span className="text-gray-400 text-sm">↗</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-medium text-text-primary mb-1 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {description}
        </p>

        {/* Updated Date */}
        <p className="text-xs text-text-muted">
          Updated: {formattedDate}
        </p>
      </div>
    </div>
  );
}

export default ResourceCard;
