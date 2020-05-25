import React from "react";
import { GetExistingBookingbyID } from "../service/BookingService";

export const ExistingBookingModel = React.memo((props) => {
  const {
    bookingData,
    getExistingBooking,
    bookingID,
    setBookingID,
  } = GetExistingBookingbyID();

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
    getExistingBooking();
  }, [bookingID]);

  return (
    <div className="ExistingBookingFrame">
      <div>
        <img
          onClick={props.onClose}
          align="right"
          width="50"
          height="50"
          src={require("../images/close.png")}
        />
      </div>
      <div className="ExistingBookingContent">
        <table>
          <tr>
            <td>Booking ID : </td>
            <td>
              <input
                style={{ borderColor: "blue" }}
                maxLength="2"
                size="4"
                type="text"
                onChange={(e) => setBookingID(e.target.value)}
              ></input>
            </td>
          </tr>
        </table>
        <div>
          {bookingData.map((bookingEntry, index) => (
            <div>
              <b>Patient Details:</b>
              <table>
                <tr>
                  <td>
                    {" "}
                    <input
                      size="2"
                      style={{ border: 0 }}
                      type="label"
                      value="Name :"
                    />
                  </td>
                  <td>
                    {bookingEntry.patientDetails &&
                      bookingEntry.patientDetails.firstName}
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      size="2"
                      style={{ border: 0 }}
                      type="label"
                      value="Age :"
                    />
                  </td>
                  <td>
                    {bookingEntry.patientDetails &&
                      bookingEntry.patientDetails.age}
                  </td>
                </tr>
              </table>
              <b>Doctor Details:</b>
              <table>
                <tr>
                  <td>
                    <input
                      size="2"
                      style={{ border: 0 }}
                      type="label"
                      value="Name :"
                    />
                  </td>
                  <td>
                    {bookingEntry.doctorDetails &&
                      bookingEntry.doctorDetails.firstName}
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      size="10"
                      style={{ border: 0 }}
                      type="label"
                      value="Specialization :"
                    />
                  </td>
                  <td>
                    {bookingEntry.doctorDetails &&
                      bookingEntry.doctorDetails.specialist}
                  </td>
                </tr>
              </table>
              <b>Booking Details:</b>
              <table>
                <tr>
                  <td>
                    <input
                      size="8"
                      style={{ border: 0 }}
                      type="label"
                      value="Booked Slot :"
                    />
                  </td>
                  <td>
                    <b>{bookingEntry.bookedSlot}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      size="6"
                      style={{ border: 0 }}
                      type="label"
                      value="Comments :"
                    />
                  </td>
                  <td>{bookingEntry.comments}</td>
                </tr>
                <tr>
                  <td>
                    <input
                      size="2"
                      style={{ border: 0 }}
                      type="label"
                      value="Status :"
                    />
                  </td>
                  <td>{bookingEntry.status}</td>
                </tr>
              </table>
              {bookingEntry.status == "UPCOMING" && (
                <DisplayActionsSection
                  bookingDataID={bookingID}
                  handleClose={props.onClose}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const DisplayActionsSection = React.memo((props) => {
  const [updateBookingData, setUpdateBookingData] = React.useState({
    booking_id: "",
    bookingStatus: "",
  });
  const [response, setResponse] = React.useState("");

  React.useEffect(() => {
    console.log("Entered Update Status");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBookingData),
    };

    fetch(
      `https://frontdesk-app-engine.herokuapp.com/frontdesk/updatestatus`,
      requestOptions
    )
      .then((response) => response.status)
      .then((data) => setResponse(data));
  }, [updateBookingData]);

  return (
    <>
      <table>
        <tr>
          <td className="ConfirmButton">
            <img
              onClick={() =>
                setUpdateBookingData({
                  ...updateBookingData,
                  booking_id: props.bookingDataID,
                  bookingStatus: "COMPLETE",
                })
              }
              align="right"
              width="30"
              height="30"
              src={require("../images/ConfirmUpdateStatus.png")}
            />
          </td>
          <td className="CancelButton">
            <img
              onClick={() =>
                setUpdateBookingData({
                  ...updateBookingData,
                  booking_id: props.bookingDataID,
                  bookingStatus: "CANCELED",
                })
              }
              align="left"
              width="30"
              height="30"
              src={require("../images/CancelUpdateStatus.png")}
            />
          </td>
          <td>
            {response && response == "200" && (
              <div>
                <input
                  size="14"
                  style={{ border: 0, color: "green" }}
                  type="label"
                  value="Updated Successful ! :"
                />
              </div>
            )}
          </td>
        </tr>
      </table>
    </>
  );
});
