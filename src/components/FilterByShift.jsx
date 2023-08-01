import React from 'react'
import SelectedComponent from './SelectedComponent'
function FilterByShift({shifts, selectedShift, onShiftChange}) {
  return (
      
      <SelectedComponent label="Filter by Shift:-" 
      options={shifts}
      onSelect={onShiftChange}
      selectedValue={selectedShift}/>
   
  )
}

export default FilterByShift