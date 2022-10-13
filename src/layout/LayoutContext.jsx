import React, { useState, createContext } from "react";

export const LayoutContextProvider = createContext();

const LayoutContext = (props) => {
const [headerTitle, setHeaderTitle] = useState("");

  return (
    <div>
      <LayoutContextProvider.Provider
        value={{
          headerTitle,
          setHeaderTitle,
        }}
      >
        {props.children}
      </LayoutContextProvider.Provider>
    </div>
  );
};

export default LayoutContext;
