import React ,{useState, useMemo}from 'react'
import TableComponent from '../components/TableComponent';
import FilterByArea from '../components/FilterByArea';
import FilterByShift from '../components/FilterByShift';
import FilterByStatus from '../components/FilterByStatus';
import SearchComponent from '../components/SearchComonent';
import { debounce } from '../utils/debonce';
import FilterByDate from '../components/FilterByDate';

function ReservationList({reservations}) {
  const initialFilter= {
    date: { startDate: '', endDate: '' },
    status: '',
    shift: '',
    area: '',
  }
  const [filter, setFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const tableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'businessDate', header: 'BusinessDate' },
    { key: 'shift', header: 'Shift' },
    {key:"start", header:"Start"},
    {key:"end" , header:"End"},
    {key:"guestNumber", header:"GuestNumber"},
    {key:"guestName",header:"GuestName"},
    {key:"area", header:"area"},
    { key: 'status', header: 'Status' },

  ];
  const createReservationFilter = (condition) => {
    return (reservations) => {
      return reservations.filter((reservation) => condition(reservation));
    };
  };
  
    // Get unique values for each filter
    const statuses = [...new Set(reservations.map(reservation => reservation.status))];
    const shifts = [...new Set(reservations.map(reservation => reservation.shift))];
    const areas = [...new Set(reservations.map(reservation => reservation.area))];


  const filteredData = useMemo(() => {
    let filteredReservations = reservations;

    if (filter.status) {
   
      let filterStatus =createReservationFilter((reservation)=> reservation.status === filter.status)
      filteredReservations= filterStatus(filteredReservations)
    }

    if (filter.shift) {
      let filterShift =createReservationFilter((reservation)=>reservation.shift === filter.shift)
      filteredReservations= filterShift(filteredReservations)
    }

    if (filter.area) {
      let filterArea =createReservationFilter((reservation)=>reservation.area===filter.area)
      filteredReservations= filterArea(filteredReservations)
    }

    if (searchQuery) {
      let filterbyName= createReservationFilter((reservation)=>{
        const fullName = `${reservation.customer.firstName} ${reservation.customer.lastName}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
      })
      filteredReservations= filterbyName(filteredReservations)
    }
// Apply date filter
if (filter.date.startDate && filter.date.endDate) {
  filteredReservations = filteredReservations.filter((reservation) => {
    const startDate = filter.date.startDate;
    const endDate = filter.date.endDate;
    const reservationDate = reservation.businessDate.split('.').reverse().join('-');
    return reservationDate >= startDate && reservationDate <= endDate;
  });
}
return filteredReservations
  }, [reservations, filter, searchQuery ]);

 // Function to handle date filter changes
 const handleResetFilters = () => {
  setFilter(initialFilter);
  setSearchQuery("")
};

 const handleDateFilterChange = (startDate, endDate) => {
  setFilter((prevFilter) => ({
    ...prevFilter,
    date: { startDate, endDate },
  }));
};

const handleStatusChange = status => {
  setFilter(prevFilter => ({ ...prevFilter, status }));
};

const handleShiftChange = shift => {
  setFilter(prevFilter => ({ ...prevFilter, shift }));
};

const handleAreaChange = area => {
  setFilter(prevFilter => ({ ...prevFilter, area }));
};

const handleSearch = (searchText) => {
  setSearchQuery(searchText)
};
  return (
    <>
    <div className='form'>
      <h4>Search Form </h4>
       <div className='form-center'>
       <div className='row'>
       <SearchComponent 
       onSearch={handleSearch}
       />
       <FilterByStatus
        statuses={statuses}
        selectedStatus={filter.status}
        onStatusChange={handleStatusChange}
      />
        <FilterByShift
        shifts={shifts}
        selectedShift={filter.shift}
        onShiftChange={handleShiftChange}
      />
      <FilterByArea
        areas={areas}
        selectedArea={filter.area}
        onAreaChange={handleAreaChange}
      />
       </div>
        <div className='row'>
        <FilterByDate onFilter={handleDateFilterChange} />
                    <button onClick={handleResetFilters} className='btn-reset'>Reset Filters</button> 
        </div>

       </div>

       </div>

        <TableComponent data={filteredData} columns={tableColumns} defaultSortKey="firstname" />
        {filteredData.length===0&&<p>No Have Data yet ..</p>}

    </>
  )
}

export default ReservationList