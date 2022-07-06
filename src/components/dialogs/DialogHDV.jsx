import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TabsHDV from "../hojaDeVida/TabsHDV";
import { Button } from "@mui/material";
import { HDVContextProvider } from "./../context/HDVContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DialogHDV({ dialogOpen, setDialogOpen, datos }) {
  const {
    setHDVData,
    disabledMode,
    setDisabledMode,
    setFuenteAlimentacionData,
    setDocTecnicaData,
    setMantenimientosData,
    setAccesoriosData,
  } = useContext(HDVContextProvider);
  const [editButtonText, setEditButtonText] = useState("");

  useEffect(() => {
    setHDVData(datos);
    setEditButtonText("Editar");
    setDisabledMode(true);
    // TRAER LOS DATOS DE LA FUENTE DE ALIMENTACION Y DE LA DOC TECNICA Y ASIGNARLOS
    setFuenteAlimentacionData(datos.fuenteAlimentacionByFuenteAlimentacion);
    // setDocTecnicaData(datos.docTecnicaByDocTecnica);
    setMantenimientosData(datos.mantenimientos);
    setAccesoriosData(datos.accesorios_componentes);
  }, [datos, setHDVData, setDisabledMode, setFuenteAlimentacionData]);

  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleEdit = () => {
    if (disabledMode === true) {
      setEditButtonText("Confirmar");
      setDisabledMode(false);
    } else {
      setEditButtonText("Editar");
      setDisabledMode(true);

      // HACER UN MUTATION PARA ENVIAR LOS DATOS CONFIRMADOS SI CAMBIARON CON RESPECTO A LO QUE SE TRAJO
      // MUTATION DE FUENTE DE ALIMENTACION Y DSP ASIGNARLE EL ID DE LO RECIEN CREADO A LA HDV
      // MUTATION DE DOC TECNICA Y DSP ASIGNARLE EL ID DE LO RECIEN CREADO A LA HDV
    }
  };

  return (
    <div>
      <BootstrapDialog aria-labelledby="dialog-hdv" open={dialogOpen}>
        <BootstrapDialogTitle id="dialog-hdv" onClose={handleClose}>
          <label>Hoja de Vida</label>
          <Button onClick={() => handleEdit()}>{editButtonText}</Button>
        </BootstrapDialogTitle>
        <TabsHDV></TabsHDV>
      </BootstrapDialog>
    </div>
  );
}
