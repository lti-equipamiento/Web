import React, { useState, createContext } from "react";

export const TicketContextProvider = createContext();
const TicketContext = (props) => {
  const [reload, setReload] = useState(false);

  return (
    <div>
      <TicketContextProvider.Provider
        value={{
          reload,
          setReload,
        }}
      >
        {props.children}
      </TicketContextProvider.Provider>
    </div>
  );
};

export default TicketContext;
