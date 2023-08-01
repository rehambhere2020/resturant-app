import React from 'react'
import SelectedComponent from './SelectedComponent'
function FilterByStatus({ statuses, selectedStatus, onStatusChange }) {
  return (
   
    <SelectedComponent label="Filter by Status:-" 
      options={statuses}
      onSelect={onStatusChange}
      selectedValue={selectedStatus}/>
  )
}

export default FilterByStatus