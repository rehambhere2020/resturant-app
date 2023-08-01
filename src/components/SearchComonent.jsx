import { debounce } from '../utils/debonce';

import React, { useState } from 'react';

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');


  // Debounce the onSearch function with a delay of 500 milliseconds
  const debouncedSearch = debounce(onSearch, 500);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  // Function to handle search input blur (losing focus)
  const handleSearchInputBlur = () => {
    if (searchTerm === '') {
      debouncedSearch('');
    }
    setSearchTerm('')
  };

  return (
    <div className='form-row'>
      <label className='form-label'>Name:-</label>
      <input
      className='form-input'
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange}
        onBlur={handleSearchInputBlur} // This will trigger the search reset when the input loses focus
        placeholder="Search by name"
      />
    </div>
  );
};

export default SearchComponent;
