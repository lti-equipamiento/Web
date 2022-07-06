import React, { useState, createContext } from "react";

export const HDVContextProvider = createContext();
const HDVContext = (props) => {
  const [HDVData, setHDVData] = useState([]);
  const [fuenteAlimentacionData, setFuenteAlimentacionData] = useState([]);
  const [docTecnicaData, setDocTecnicaData] = useState([]);
  const [accesoriosData, setAccesoriosData] = useState([]);
  const [mantenimientosData, setMantenimientosData] = useState([]);
  const [disabledMode, setDisabledMode] = useState(false);

  return (
    <div>
      <HDVContextProvider.Provider
        value={{
          HDVData,
          setHDVData,
          fuenteAlimentacionData,
          setFuenteAlimentacionData,
          docTecnicaData,
          setDocTecnicaData,
          accesoriosData,
          setAccesoriosData,
          mantenimientosData,
          setMantenimientosData,
          disabledMode,
          setDisabledMode,
        }}
      >
        {props.children}
      </HDVContextProvider.Provider>
    </div>
  );
};

export default HDVContext;
