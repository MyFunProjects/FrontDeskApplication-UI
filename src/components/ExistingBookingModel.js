import React from "react";

 export const ExistingBookingModel = React.memo(props => {
   
   const [bookingID,seBookingID] = React.useState("");
   const [bookingData, setBookingData] = React.useState([]);

   // Load full list when the component gets mounted and filter gets updated
   React.useEffect(() => {
      fetch(`https://frontdesk-app-engine.herokuapp.com/frontdesk/booking/${bookingID}`)  
         .then(response => response.json())
         .then(json => setBookingData(json));
     }, [bookingID]);

 return( 
     <div className="ExistingBookingFrame">
     <div><img  onClick={props.onClose}  align ="right" width="50" height ="50" src={require('../images/close.png')} /></div>
     <div className="ExistingBookingContent">   
       <table>
         <tr><td>Booking ID : </td><td><input style={{borderColor: "blue"}}  maxLength="2" size="4" type="text" onChange={(e) => seBookingID(e.target.value)}></input></td></tr>
         </table>         
         <div>{bookingData.map((bookingEntry, index) => (
           <div>
           <table>
             <tr><td><b>Paetient Details:</b></td><td></td></tr>  
            <tr><td>Name : </td><td> {bookingEntry.patientDetails && bookingEntry.patientDetails.firstName}</td></tr>
            <tr><td>Age : </td><td>{bookingEntry.patientDetails && bookingEntry.patientDetails.age}</td></tr>
            <tr><td><b>Doctor Details:</b></td><td></td></tr>  
            <tr><td>Name : </td><td>{bookingEntry.doctorDetails && bookingEntry.doctorDetails.firstName}</td></tr>
            <tr><td>Specialization</td><td>{bookingEntry.doctorDetails && bookingEntry.doctorDetails.specialist}</td></tr>
            <tr><td><b>Booking Details:</b></td><td></td></tr> 
            <tr><td>BookedSlot : </td><td>{bookingEntry.bookedSlot}</td></tr>
            <tr><td>Comments : </td><td>{bookingEntry.comments}</td></tr>
            <tr><td>Status : </td><td>{bookingEntry.status}</td></tr>
             </table>         
          </div>
        ))}</div>  
     </div>
     </div>      
    );
   });

