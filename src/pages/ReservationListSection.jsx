import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ReservationList from './ReservationList';
function ReservationListSection() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State to handle errors
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios('http://localhost:5000/reservations');
      setReservations(response.data)
      setLoading(false)
      setError(null); 
    } catch (error) {
      setError(error.response.data);
      setLoading(false)
    }
  };

  useEffect(() => {

    fetchData()
  }, []);

  const ErrorFallbackUI = () => {
    return (
      <div>
        <h2>Oops! Something went wrong.</h2>
        <p>Please try again later or contact support.</p>
      </div>
    );
  };

  return (
    <>
    {loading &&  <div className="spinner"></div>}
    {error &&  <div>Error: {error.message}</div>}
      {!loading && !error &&   <>
        <h1>Reservation List</h1>
        <ReservationList reservations={reservations}/>
        </>}
</>
  )
}

export default ReservationListSection