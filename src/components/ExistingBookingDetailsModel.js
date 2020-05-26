import React from "react";

export const DisplayActionsSection = React.memo((props) => {
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
