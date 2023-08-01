import React from 'react';
import ReservationListSection from './pages/ReservationListSection';
import { ErrorBoundary } from "react-error-boundary";
function App() {
    return (
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
         <div className='app'>
     <ReservationListSection/>

    
  </div>
      </ErrorBoundary>
   
  )
}

export default App
