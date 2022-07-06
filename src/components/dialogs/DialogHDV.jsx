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
import { useMutation, useQuery } from "@apollo/client";
import { editHojaDeVida } from "../../grapqhql/Queries";

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
    HDVData,
    disabledMode,
    setDisabledMode,
    setFuenteAlimentacionData,
    fuenteAlimentacionData,
    tipoAlimentacionData,
    setTipoAlimentacionData,
    docTecnicaData,
    setDocTecnicaData,
    setMantenimientosData,
    setAccesoriosData,
    setReload,
  } = useContext(HDVContextProvider);
  const [editButtonText, setEditButtonText] = useState("");
  const [HojaDeVidaMutation] = useMutation(editHojaDeVida());

  useEffect(() => {
    setHDVData(datos);
    setEditButtonText("Editar");
    setDisabledMode(true);
    setFuenteAlimentacionData(datos.fuenteAlimentacionByFuenteAlimentacion);
    setTipoAlimentacionData(datos.tipoAlimentacionByTipoAlimentacion);
    // TRAER LOS DATOS DE LA DOC TECNICA Y ASIGNARLO
    setDocTecnicaData(datos.docTecnicaByDocTecnica);
    setMantenimientosData(datos.mantenimientos);
    setAccesoriosData(datos.accesorios_componentes);
    console.log(docTecnicaData);
  }, [
    datos,
    setHDVData,
    setDisabledMode,
    setFuenteAlimentacionData,
    setTipoAlimentacionData,
    setMantenimientosData,
    setAccesoriosData,
    setDocTecnicaData,
  ]);

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
      HojaDeVidaMutation({
        variables: {
          id: HDVData.id,
          corriente: fuenteAlimentacionData.corriente,
          frecuencia: fuenteAlimentacionData.frecuencia,
          potencia: fuenteAlimentacionData.potencia,
          presion: fuenteAlimentacionData.presion,
          temperatura: fuenteAlimentacionData.temperatura,
          voltaje: fuenteAlimentacionData.voltaje,
          agua: tipoAlimentacionData.agua,
          aire: tipoAlimentacionData.aire,
          bateria: tipoAlimentacionData.bateria,
          electricidad: tipoAlimentacionData.electricidad,
          emergencia: tipoAlimentacionData.emergencia,
          estandar: tipoAlimentacionData.estandar,
          otrosAlimentacion: tipoAlimentacionData.otros,
          oxigeno: tipoAlimentacionData.oxigeno,
          regulada: tipoAlimentacionData.regulada,
          servicio: tipoAlimentacionData.servicio,
          vacio: tipoAlimentacionData.vacio,
          vapor: tipoAlimentacionData.vapor,
          diagrama_partes: docTecnicaData.diagrama_partes,
          manual_operacion: docTecnicaData.manual_operacion,
          manual_servicio: docTecnicaData.manual_servicio,
          otrosDocumentacion: docTecnicaData.otros,
          planos: docTecnicaData.planos,
          autorizacion_msp: HDVData.autorizacion_msp,
          ciudad_distribuidor: HDVData.ciudad_distribuidor,
          ciudad_fabricante: HDVData.ciudad_fabricante,
          clasif_biomedica: HDVData.clasif_biomedica,
          clasif_inter_proteccion: HDVData.clasif_inter_proteccion,
          clasif_riesgo_clinico: HDVData.clasif_riesgo_clinico,
          clasif_riesgo_electrico: HDVData.clasif_riesgo_electrico,
          clasif_riesgo_sanitario: HDVData.clasif_riesgo_sanitario,
          distribuidor: HDVData.distribuidor,
          doc_tecnica: HDVData.doc_tecnica,
          fabricante: HDVData.fabricante,
          fecha_adquisicion: HDVData.fecha_adquisicion,
          fecha_instalacion: HDVData.fecha_instalacion,
          forma_adquisicion: HDVData.forma_adquisicion,
          fuente_alimentacion: HDVData.fuente_alimentacion,
          guia_limpieza: HDVData.guia_limpieza,
          period_calibracion: HDVData.period_calibracion,
          period_mantenimiento: HDVData.period_mantenimiento,
          recom_fabricante: HDVData.recom_fabricante,
          rut: HDVData.rut,
          tecnologia_predominante: HDVData.tecnologia_predominante,
          telefono: HDVData.telefono,
          tipo_alimentacion: HDVData.tipo_alimentacion,
        },
      });
      setReload(true);
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
