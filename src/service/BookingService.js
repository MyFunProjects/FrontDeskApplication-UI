import React from "react";

import { initialValue } from "../model/BookingModel";

const GetExistingBookingbyID = () => {
  const [bookingID, setBookingID] = React.useState("");
  const [bookingData, setBookingData] = React.useState([]);

  const getExistingBooking = () => {
    fetch(
      `https://frontdesk-app-engine.herokuapp.com/frontdesk/booking/${bookingID}`
    )
      .then((response) => response.json())
      .then((json) => setBookingData(json));
  };

  return { bookingData, getExistingBooking, bookingID, setBookingID };
};

const CheckSpecialistAvailability = () => {
  const [specialization, setSpecialization] = React.useState("");
  const [specialistData, setSpecialistData] = React.useState([]);

  const CheckAvailability = () => {
    fetch(
      `https://frontdesk-app-engine.herokuapp.com/frontdesk/checkavailability/${specialization}`
    )
      .then((response) => response.json())
      .then((json) => setSpecialistData(json));
  };

  return {
    specialistData,
    CheckAvailability,
    specialization,
    setSpecialization,
  };
};

export { GetExistingBookingbyID, CheckSpecialistAvailability };
