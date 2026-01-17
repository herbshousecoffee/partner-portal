import { useState, useEffect } from 'react';
import Header from './Header';
import SectionNav from './SectionNav';
import ResourceGrid from './ResourceGrid';
import CoBrandedAssets from './CoBrandedAssets';
import { resources } from '../data/resources';

function Portal({ onLogout }) {
  const [activeSection, setActiveSection] = useState('marketing');
  const [subpage, setSubpage] = useState(null);

  // Sync with URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove #
    if (hash === 'cobranded-assets') {
      setActiveSection('marketing');
      setSubpage('cobranded-assets');
    } else if (hash && ['marketing', 'sales', 'projects'].includes(hash)) {
      setActiveSection(hash);
      setSubpage(null);
    }
  }, []);

  // Update hash when section changes
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSubpage(null);
    window.location.hash = section;
  };

  // Navigate to subpage
  const handleSubpageNavigate = (page) => {
    setSubpage(page);
    window.location.hash = page;
  };

  // Go back from subpage
  const handleSubpageBack = () => {
    setSubpage(null);
    window.location.hash = activeSection;
  };

  const filteredResources = resources.filter(
    resource => resource.section === activeSection
  );

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {subpage === 'cobranded-assets' ? (
          <CoBrandedAssets onBack={handleSubpageBack} />
        ) : (
          <>
            <SectionNav
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />

            <ResourceGrid
              resources={filteredResources}
              onNavigate={handleSubpageNavigate}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default Portal;
