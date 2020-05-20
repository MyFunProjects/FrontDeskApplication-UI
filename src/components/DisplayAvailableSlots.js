import React from "react";

export const DisplayAvailableSlots = React.memo((props) => {
  const [selectedSlot, setSelectedSlot] = React.useState([]);

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
                    onClick={() => setSelectedSlot(specialistEntry)}
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
        <div>Selected entry is : {selectedSlot.firstName}</div>
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
