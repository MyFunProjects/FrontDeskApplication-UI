import React from "react";

import { CheckSpecialistAvailability } from "../service/BookingService";
import { DisplayAvailableSlots } from "../components/DisplayAvailableSlots";
import { NewBookingDetailsModel } from "../components/NewBookingDetailsModel";
import { initialValue } from "../model/BookingModel";

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
  const [bookingInfo, setBookingInfo] = React.useState(initialValue);
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
          Patient Details :
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
                <input
                  style={{ borderColor: "blue" }}
                  maxLength="15"
                  size="15"
                  onChange={(e) =>
                    setBookingInfo({
                      ...bookingInfo,
                      patientDetails: {
                        ...bookingInfo.patientDetails,
                        firstName: e.target.value,
                      },
                    })
                  }
                />
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
                <input
                  style={{ borderColor: "blue" }}
                  maxLength="2"
                  size="3"
                  value={bookingInfo.age}
                  onChange={(e) =>
                    setBookingInfo({
                      ...bookingInfo,
                      patientDetails: {
                        ...bookingInfo.patientDetails,
                        age: e.target.value,
                      },
                    })
                  }
                />
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td>
                <input style={{ border: 0 }} type="label" value="Comments :" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  style={{ borderColor: "green" }}
                  maxLength="15"
                  size="15"
                  onChange={(e) =>
                    setBookingInfo({
                      ...bookingInfo,
                      comments: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <table>
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
              </table>
            </tr>
            <tr>
              {bookingInfo.bookedSlot && (
                <NewBookingDetailsModel
                  bookingInfoData={bookingInfo}
                  setBookingInfoFunction={setBookingInfo}
                />
              )}
            </tr>
          </table>
        </div>
      </div>
      <div>
        {showAvailability && specialistData && (
          <DisplayAvailableSlots
            specialistData={specialistData}
            bookingInfoData={bookingInfo}
            bookingInfoFunction={setBookingInfo}
            handleClose={hideAvailabilityPopUpModel}
          />
        )}
      </div>
    </div>
  );
});
