import ResourceCard from './ResourceCard';

const coBrandedAssets = [
  {
    id: "cb-001",
    section: "cobranded",
    title: "Herb's Logo",
    description: "Official Herb's House Coffee logo assets.",
    dateUpdated: "2026-01-17",
    previewImage: "/assets/previews/herbs-logo.png",
    fileType: "zip",
    url: "#",
    isExternal: false,
    isComingSoon: true
  },
  {
    id: "cb-002",
    section: "cobranded",
    title: "Melissa's Logo",
    description: "Official Melissa's Creamery logo assets.",
    dateUpdated: "2026-01-17",
    previewImage: "/assets/previews/melissas-logo.png",
    fileType: "zip",
    url: "#",
    isExternal: false,
    isComingSoon: true
  },
  {
    id: "cb-003",
    section: "cobranded",
    title: "Grower Series Packaging",
    description: "Packaging design assets for Grower Series products.",
    dateUpdated: "2026-01-17",
    previewImage: "/assets/previews/grower-packaging.png",
    fileType: "zip",
    url: "#",
    isExternal: false,
    isComingSoon: true
  },
  {
    id: "cb-004",
    section: "cobranded",
    title: "Grower Series Labels",
    description: "Label design assets for Grower Series products.",
    dateUpdated: "2026-01-17",
    previewImage: "/assets/previews/grower-labels.png",
    fileType: "zip",
    url: "#",
    isExternal: false,
    isComingSoon: true
  }
];

function CoBrandedAssets({ onBack }) {
  return (
    <div>
      {/* Back Navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-secondary hover:text-primary mb-6 transition-colors"
      >
        <span>←</span>
        <span>Back to Marketing</span>
      </button>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-section-title text-primary">Co-Branded Design Assets</h1>
        <p className="text-secondary mt-1">Logo and packaging assets for partner use.</p>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {coBrandedAssets.map(asset => (
          <ResourceCard key={asset.id} resource={asset} />
        ))}
      </div>
    </div>
  );
}

export default CoBrandedAssets;
