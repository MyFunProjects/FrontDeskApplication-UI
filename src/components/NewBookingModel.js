import React from "react";

import { CheckSpecialistAvailability } from "../service/BookingService";
import { DisplayAvailableSlots } from "../components/DisplayAvailableSlots";
export const NewBookingModel = React.memo((props) => {
  const [showAvailability, setShowAvailability] = React.useState(false);
  const hideAvailabilityPopUpModel = React.useCallback(
    () => hideAvailabilityModel(),
    []
  );
  const {
    specialistData,
    CheckAvailability,
    specialization,
    setSpecialization,
  } = CheckSpecialistAvailability();
  const [bookingInfo, setBookingInfo] = React.useState({
    name: "",
    age: "",
  });
  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
    CheckAvailability();
  }, [specialization]);

  function ShowAvailabilityFrame(event) {
    setSpecialization(event.target.value);
    setShowAvailability(true);
  }
  function hideAvailabilityModel() {
    setShowAvailability(false);
  }
  return (
    <div className="NewBookingFrame">
      <img
        onClick={props.onClose}
        align="right"
        width="50"
        height="50"
        src={require("../images/close.png")}
      />
      <div className="NewBookingContent">
        <div>
          <table>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  style={{ borderColor: "blue" }}
                  maxLength="15"
                  size="15"
                  value={bookingInfo.name}
                  onChange={(e) =>
                    setBookingInfo({
                      ...bookingInfo,
                      name: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>
                <input
                  style={{ borderColor: "blue" }}
                  maxLength="2"
                  size="3"
                  value={bookingInfo.age}
                  onChange={(e) =>
                    setBookingInfo({
                      ...bookingInfo,
                      age: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <select
                  id="specialization"
                  name="specialization"
                  onChange={(e) => ShowAvailabilityFrame(e)}
                >
                  <option>--specialization--</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Gynacologist">Gynacologist</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Cardiologist">Cardiologist</option>
                </select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        {showAvailability && specialistData && (
          <DisplayAvailableSlots
            specialistData={specialistData}
            handleClose={hideAvailabilityPopUpModel}
          />
        )}
      </div>
    </div>
  );
});
