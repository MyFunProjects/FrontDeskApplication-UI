import React from "react";

export const DisplayAvailableSlots = React.memo((props) => {
  return (
    <div className="AvailableSlotFrame">
      <div className="AvailableSlotContent">
        <table>
          <tr>
            <th align="center">Name</th>
            <th align="center">Slot</th>
          </tr>
          {props.specialistData.map((specialistEntry, index) => (
            <tr>
              <td>
                <div>
                  <input
                    id={index}
                    type="radio"
                    name="selectedSpec"
                    onClick={() =>
                      props.bookingInfoFunction({
                        ...props.bookingInfoData,
                        doctorDetails: {
                          ...props.bookingInfoData.doctorDetails,
                          id: specialistEntry.id,
                          firstName: specialistEntry.firstName,
                        },
                        bookedSlot: specialistEntry.avail_time,
                        status: "UPCOMING",
                      })
                    }
                  />
                  {specialistEntry && specialistEntry.firstName}
                </div>
              </td>
              <td align="right">
                {specialistEntry && specialistEntry.avail_time}
              </td>
            </tr>
          ))}
        </table>

        <img
          onClick={props.handleClose}
          align="right"
          width="75"
          height="50"
          src={require("../images/submitSlot.png")}
        />
      </div>
    </div>
  );
});
