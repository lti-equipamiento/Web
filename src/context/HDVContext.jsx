import React, { useState, createContext } from "react";

export const HDVContextProvider = createContext();
const HDVContext = (props) => {
  const [HDVData, setHDVData] = useState([]);
  const [fuenteAlimentacionData, setFuenteAlimentacionData] = useState([]);
  const [tipoAlimentacionData, setTipoAlimentacionData] = useState([]);
  const [docTecnicaData, setDocTecnicaData] = useState([]);
  const [accesoriosData, setAccesoriosData] = useState([]);
  const [mantenimientosData, setMantenimientosData] = useState([]);
  const [disabledMode, setDisabledMode] = useState(false);
  const [reload, setReload] = useState(false);

  return (
    <div>
      <HDVContextProvider.Provider
        value={{
          HDVData,
          setHDVData,
          fuenteAlimentacionData,
          setFuenteAlimentacionData,
          tipoAlimentacionData,
          setTipoAlimentacionData,
          docTecnicaData,
          setDocTecnicaData,
          accesoriosData,
          setAccesoriosData,
          mantenimientosData,
          setMantenimientosData,
          disabledMode,
          setDisabledMode,
          reload,
          setReload,
        }}
      >
        {props.children}
      </HDVContextProvider.Provider>
    </div>
  );
};

export default HDVContext;
