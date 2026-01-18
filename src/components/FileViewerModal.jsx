import { useEffect, useCallback } from 'react';

function FileViewerModal({ file, onClose }) {
  const { title, url, fileType } = file;

  // Build full URL for the file
  const fullUrl = `${import.meta.env.BASE_URL}${url.startsWith('/') ? url.slice(1) : url}`;

  // Extract filename from URL for download
  const filename = url.split('/').pop() || `${title}.${fileType}`;

  // Handle programmatic download without redirect
  const handleDownload = async () => {
    try {
      const response = await fetch(fullUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      // Fallback to direct download if fetch fails
      window.location.href = fullUrl;
    }
  };

  // Close on escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Close when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="file-viewer-overlay"
      onClick={handleBackdropClick}
    >
      <div className="file-viewer-modal">
        {/* Header */}
        <div className="file-viewer-header">
          <h2 className="text-primary font-medium truncate flex-1 mr-4">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-accent-primary text-white text-sm font-medium rounded-md hover:bg-accent-primary-hover transition-colors focus-ring"
            >
              Download
            </button>
            <button
              onClick={onClose}
              className="p-2 text-secondary hover:text-primary hover:bg-surface-3 rounded-md transition-colors focus-ring"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="file-viewer-content">
          {fileType === 'pdf' ? (
            <object
              data={fullUrl}
              type="application/pdf"
              className="w-full h-full"
            >
              <div className="flex flex-col items-center justify-center h-full text-secondary">
                <p className="mb-4">Unable to display PDF in browser.</p>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-accent-primary text-white text-sm font-medium rounded-md hover:bg-accent-primary-hover transition-colors"
                >
                  Download PDF
                </button>
              </div>
            </object>
          ) : (
            <div className="flex items-center justify-center h-full text-secondary">
              <p>Preview not available for this file type.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileViewerModal;
