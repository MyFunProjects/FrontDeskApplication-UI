import React from "react";

const SelectedSlotContext = React.createContext([]);

export const FrontDeskContextProvider = props => {
    const [selectedSlot, setSelectedSlot] = React.useState([]);
  
    return (
      <MyContext.Provider value={{ username, setUsername }}>
        {props.children}
      </MyContext.Provider>
    );
  };