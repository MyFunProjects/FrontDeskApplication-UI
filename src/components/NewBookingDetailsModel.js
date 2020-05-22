import React from "react";

export const NewBookingDetailsModel = React.memo((props) => {
  const [bookingResponse, setBookingResponse] = React.useState([]);
  React.useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.bookingInfoData),
    };
    fetch("https://frontdesk-app-engine.herokuapp.com/frontdesk/newbooking", requestOptions).then(
      function (response) {
        response.json().then(function (data) {
          setBookingResponse(data);
        });
      }
    );
  }, []);

  return (
    <div>
      Booking Details :
      <table>
        <tr>
          <table>
            <tr>
              <td>
                <input
                  size="10"
                  style={{ border: 0 }}
                  type="label"
                  value="Booking ID :"
                />
              </td>
              <td>
                {bookingResponse.map((bookingEntry, index) => (
                  <div>{bookingEntry}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td>
                <input
                  size="10"
                  style={{ border: 0 }}
                  type="label"
                  value="Doctor Name :"
                />
              </td>
              <td>
                {props.bookingInfoData.doctorDetails &&
                  props.bookingInfoData.doctorDetails.firstName}
              </td>
            </tr>
            <tr>
              <td>
                <input
                  size="10"
                  style={{ border: 0 }}
                  type="label"
                  value="Booked Slot :"
                />
              </td>
              <td>{props.bookingInfoData.bookedSlot}</td>
            </tr>
          </table>
        </tr>
      </table>
    </div>
  );
});
