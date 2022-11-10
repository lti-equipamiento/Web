import React, { useState, createContext } from "react";

export const UsuarioContextProvider = createContext();
const UsuarioContext = (props) => {
  const [reload, setReload] = useState(false);

  return (
    <div>
      <UsuarioContextProvider.Provider
        value={{
          reload,
          setReload,
        }}
      >
        {props.children}
      </UsuarioContextProvider.Provider>
    </div>
  );
};

export default UsuarioContext;
