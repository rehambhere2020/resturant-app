import React ,{useState, useMemo}from 'react';
import '../styles/tableStyles.css'; // Import the CSS file
import Pagination from './Pagination';
function TableComponent({ data, columns ,defaultSortKey  }) {
  const itemsPerPage = 10; // Number of items per page

  const [sortKey, setSortKey] = useState(defaultSortKey);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
// Helper function to extract time from datetime string
const extractTimeFromDatetime = (datetime) => {
  const date = new Date(datetime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
  const sortedData = useMemo(() => {
    const compareFunction = (a, b) => {
      if (sortKey === 'guestNumber') {
        return sortOrder === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;

      } else if (sortKey === 'guestName') {
        const guestA = a.customer.firstName + ' ' + a.customer.lastName;
        const guestB = b.customer.firstName + ' ' + b.customer.lastName;
        return sortOrder === 'asc' ? guestA.localeCompare(guestB) : guestB.localeCompare(guestA);
      }else if(sortKey === 'start'){
        const timeA = extractTimeFromDatetime(a.start);
        const timeB = extractTimeFromDatetime(b.start);
        return sortOrder === 'asc' ? timeA.localeCompare(timeB) : timeB.localeCompare(timeA);
        }else if(sortKey === 'end'){
          const timeA = extractTimeFromDatetime(a.end);
          const timeB = extractTimeFromDatetime(b.end);
          return sortOrder === 'asc' ? timeA.localeCompare(timeB) : timeB.localeCompare(timeA);
        }else{
        // Fallback: Sort by date if the sort field is not recognized
        if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      }
    };

    return [...data].sort(compareFunction);
  }, [ data,sortKey, sortOrder]);


  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

 // Calculate total pages using useMemo
 const totalPages = useMemo(()=>Math.ceil(sortedData.length / itemsPerPage),[sortedData.length])
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

    const renderCellValue = (row, column) => {
        // Check if the column key has a nested property
        if (column.key.includes('.')) {
          const nestedKeys = column.key.split('.');
          let value = row;
          for (const key of nestedKeys) {
           
            value = value[key] ;
          }
          return value;
        }
        if(column.key === "guestNumber"){
          return row.quantity
        }
        /* add Full Name */ 
        if (column.key === 'guestName') {
          const { firstName, lastName } = row.customer;
          return `${firstName} ${lastName}`;
        }
       if(column.key==="start"){
        return extractTimeFromDatetime(row.start)
       }
      if(column.key==="end"){
        return extractTimeFromDatetime(row.end)
      }

        return row[column.key];
      };

      
  return (
  <>
  
    <table className="table">
    <thead>
      <tr>
        {columns.map((column) => (
           <th key={column.key} onClick={() => handleSort(column.key)}>
           {column.header}
           {sortKey === column.key && (sortOrder === 'asc' ? '▲' : '▼')}
         </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {paginatedData.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((column) => (
            <>
        
            {column.key==="status"?<td key={`${column.key}-${rowIndex}`}><span className='badge'>{renderCellValue(row, column)}</span></td>:
                        <td key={`${column.key}-${rowIndex}`} >{renderCellValue(row, column)}</td>
                      }

            </>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  <Pagination 
  currentPage={currentPage} 
  totalPages={totalPages} 
  onPageChange={(page) => setCurrentPage(page)}/>

  </>
  )
}

export default TableComponent