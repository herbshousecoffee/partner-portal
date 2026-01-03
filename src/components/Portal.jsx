import { useState, useEffect } from 'react';
import Header from './Header';
import SectionNav from './SectionNav';
import ResourceGrid from './ResourceGrid';
import { resources } from '../data/resources';

function Portal({ onLogout }) {
  const [activeSection, setActiveSection] = useState('marketing');

  // Sync with URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove #
    if (hash && ['marketing', 'sales', 'projects'].includes(hash)) {
      setActiveSection(hash);
    }
  }, []);

  // Update hash when section changes
  const handleSectionChange = (section) => {
    setActiveSection(section);
    window.location.hash = section;
  };

  const filteredResources = resources.filter(
    resource => resource.section === activeSection
  );

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SectionNav
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        <ResourceGrid resources={filteredResources} />
      </main>
    </div>
  );
}

export default Portal;
