import React from "react";

export const NewBookingModel  = React.memo(props => {   
   return(  
    <div className="NewBookingFrame">   
    <img  onClick={props.onClose} align ="right" width="50" height ="50" src={require('../images/close.png')} />
     <div className="NewBookingContent">This is a New Booking Frame</div>
    </div>
    );
   });