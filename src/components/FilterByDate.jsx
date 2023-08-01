import React, { useState } from 'react';

const FilterByDate = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFilterClick = () => {
    // Check if both start date and end date are selected before applying the filter
    if (startDate && endDate) {
      onFilter(startDate, endDate);
    }
  setEndDate('');
  setStartDate('')
  };

  return (
    
    <div className='form-row form-date'>
 <div>
 <label className='form-label'>Start Date:</label>
      <input
      className='form-input'
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
      />
 </div>
      <div>
      <label className='form-label'>End Date:</label>
      <input
      className='form-input'
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
      />
      </div>
      <div className='btn-filter-box'>
      <button onClick={handleFilterClick} className='btn-filter'>Filter Date</button>

      </div>
    </div>
  );
};

export default FilterByDate;
