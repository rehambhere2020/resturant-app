
import SelectedComponent from "./SelectedComponent";
const FilterByArea = ({ areas, selectedArea, onAreaChange }) => {
    return (

     <SelectedComponent label="Filter by Area:-" 
      options={areas}
      onSelect={onAreaChange}
      selectedValue={selectedArea}/>
    );
  };
  export default FilterByArea