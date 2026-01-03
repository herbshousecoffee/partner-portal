const sections = [
  { id: 'marketing', label: 'Marketing' },
  { id: 'sales', label: 'Sales' },
  { id: 'projects', label: 'Projects' }
];

function SectionNav({ activeSection, onSectionChange }) {
  return (
    <nav className="mb-6 border-b border-border overflow-x-auto">
      <div className="flex gap-1 min-w-max sm:min-w-0">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`
              px-4 py-3 font-medium text-sm sm:text-base whitespace-nowrap transition-colors
              ${activeSection === section.id
                ? 'text-herbs-blue border-b-2 border-herbs-blue'
                : 'text-text-secondary hover:text-text-primary'
              }
            `}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default SectionNav;
