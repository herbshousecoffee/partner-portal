import ResourceCard from './ResourceCard';

function ResourceGrid({ resources, onNavigate }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
      {resources.map(resource => (
        <ResourceCard key={resource.id} resource={resource} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

export default ResourceGrid;
