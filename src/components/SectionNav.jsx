const sections = [
  { id: 'marketing', label: 'Marketing', colorClass: 'text-category-marketing border-category-marketing' },
  { id: 'sales', label: 'Sales', colorClass: 'text-category-sales border-category-sales' },
  { id: 'projects', label: 'Projects', colorClass: 'text-category-projects border-category-projects' }
];

function SectionNav({ activeSection, onSectionChange }) {
  return (
    <nav className="mb-6 border-b border-default overflow-x-auto">
      <div className="flex gap-1 min-w-max sm:min-w-0">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`
              px-4 py-3 font-medium text-sm sm:text-base whitespace-nowrap transition-colors
              ${activeSection === section.id
                ? `${section.colorClass} border-b-2`
                : 'text-secondary hover:text-primary'
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
