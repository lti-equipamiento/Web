import React, { useState, createContext } from "react";

export const EquipoContextProvider = createContext();
const EquipoContext = (props) => {
  const [AMDialogOpen, setAMDialogOpen] = useState(false);

  const [reload, setReload] = useState(false);

  return (
    <div>
      <EquipoContextProvider.Provider
        value={{
          AMDialogOpen,
          setAMDialogOpen,
          reload,
          setReload,
        }}
      >
        {props.children}
      </EquipoContextProvider.Provider>
    </div>
  );
};

export default EquipoContext;
