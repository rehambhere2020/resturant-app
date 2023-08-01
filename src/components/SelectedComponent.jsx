import React from 'react'

function SelectedComponent({label , options , selectedValue , onSelect}) {
  return (
  <div className='form-row'>
  <label className='form-label'>{label}</label>
  <select className="form-select" value={selectedValue} onChange={(e)=>onSelect(e.target.value)}>
    <option value="">All</option>
    {options.map((option)=>(
        <option key={option} value={option}>
            {option}
        </option>
    ))}
  </select>
  </div>
  )
}

export default SelectedComponent