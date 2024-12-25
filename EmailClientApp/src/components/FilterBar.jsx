import React from 'react';

const FilterBar = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <nav className="p-4  flex gap-7 items-center">
      <h1>Filter By:</h1>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-3 rounded-xl ${
            activeFilter === filter ? 'bg-[#E1E4EA] text-[#636363] border-1 ' : '' 
          }`}
        >
          {filter}
        </button>
      ))}
    </nav>
  );
};

export default FilterBar;
