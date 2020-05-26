import React from "react";
import { GetExistingBookingbyID } from "../service/BookingService";
import { DisplayActionsSection } from "../components/ExistingBookingDetailsModel";
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
