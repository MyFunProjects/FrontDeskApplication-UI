import React from "react";
import {ExistingBookingModel} from "./ExistingBookingModel";
import {NewBookingModel} from "./NewBookingModel"

export const HomePage = () => {

  const [showNewBooking, setShowNewBooking] = React.useState(false);  
  const [showExistingBooking, setShowExistingBooking] = React.useState(false);
  const [showHomePage ,setShowHomePage] = React.useState(true);

  const hidePopUpModel = React.useCallback(() => hideModel(), []); 
  const showNewBookingModel = React.useCallback(() => showNewBookingFrame(), []); 
  const ShowExistingBookingModel = React.useCallback(() => showExistingBookingFrame(), []); 

  function showNewBookingFrame() {
    setShowNewBooking(true);
    setShowExistingBooking(false)
    setShowHomePage(false);
  }
  function showExistingBookingFrame() {
    setShowNewBooking(false);
    setShowExistingBooking(true);
    setShowHomePage(false);
  }
  function hideModel() {
    setShowNewBooking(false);
    setShowExistingBooking(false);
    setShowHomePage(true);
  }

  return (
    <>
<div>
{showHomePage && <HomePageContent showNewBooking={showNewBookingModel} showExistingBooking={ShowExistingBookingModel}/>}
{showNewBooking && <NewBookingModel onClose={hidePopUpModel}/>}
{showExistingBooking && <ExistingBookingModel onClose={hidePopUpModel}/>}
</div>
 </>
  );
}
export const HomePageContent = React.memo(props => {
  return (    
    <div className="HomePageContent">
      <table border="0">
        <tr><a onClick={props.showNewBooking}><div className="FontHomePageContent">New Booking</div></a><td></td></tr>
        <tr><td><br/></td></tr>
        <tr><td><a onClick={props.showExistingBooking}><div className="FontHomePageContent">Existing Booking</div></a></td></tr>
        </table>   
    </div>
    );
  });





