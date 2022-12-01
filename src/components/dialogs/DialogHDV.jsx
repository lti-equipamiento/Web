import React, { useEffect, useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import CloseIcon from "@mui/icons-material/Close";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import { editHojaDeVida, getHojaDeVida } from "../../grapqhql/Queries";
import TabsHDV from "../hojaDeVida/TabsHDV";

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

export default function DialogHDV(props) {
  const {
    dialogOpen,
    setDialogOpen,
    id,
    setSnackbarSeverity,
    setSnackbarText,
    setOpenSnackbar,
  } = props;

  //Boton edit
  const [editButtonText, setEditButtonText] = useState("");
  const [disabledMode, setDisabledMode] = useState(true);

  //Datos de los tabs
  const [HDVData, setHDVData] = useState([]);
  const [fuenteAlimentacionData, setFuenteAlimentacionData] = useState([]);
  const [tipoAlimentacionData, setTipoAlimentacionData] = useState([]);
  const [docTecnicaData, setDocTecnicaData] = useState([]);
  const [mantenimientosData, setMantenimientosData] = useState([]);
  const [accesoriosData, setAccesoriosData] = useState([]);

  // Carga de datos
  const [HojaDeVidaMutation] = useMutation(editHojaDeVida());
  const [reload, setReload] = useState(true);
  const [getHDV, { loading }] = useLazyQuery(getHojaDeVida(id), {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setEditButtonText("Editar");
      setDisabledMode(true);

      // Carga los datos en los estados
      setHDVData(data.data_hoja_de_vida_by_pk);
      setFuenteAlimentacionData(
        data.data_hoja_de_vida_by_pk.fuenteAlimentacionByFuenteAlimentacion
      );
      setTipoAlimentacionData(
        data.data_hoja_de_vida_by_pk.tipoAlimentacionByTipoAlimentacion
      );
      setDocTecnicaData(data.data_hoja_de_vida_by_pk.docTecnicaByDocTecnica);
      setMantenimientosData(data.data_hoja_de_vida_by_pk.mantenimientos);
      setAccesoriosData(data.data_hoja_de_vida_by_pk.accesorios_componentes);
    },
  });

  useEffect(() => {
    if (reload) {
      try {
        getHDV();
        setReload(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, [reload, getHDV]);

  const handleEdit = () => {
    if (disabledMode === true) {
      setEditButtonText("Confirmar");
      setDisabledMode(false);
    } else {
      // Mutation de edicion de HDV - revisar
      try {
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
            prox_calib_prev: HDVData.prox_calib_prev,
            prox_mant_prev: HDVData.prox_mant_prev,
            recom_fabricante: HDVData.recom_fabricante,
            rut: HDVData.rut,
            tecnologia_predominante: HDVData.tecnologia_predominante,
            telefono: HDVData.telefono,
            tipo_alimentacion: HDVData.tipo_alimentacion,
          },
        });
        setEditButtonText("Editar");
        setDisabledMode(true);
        setReload(true);
        setSnackbarSeverity("success");
        setSnackbarText("Edicion exitosa.");
        setOpenSnackbar(true);
      } catch (error) {
        console.log(error);
        setSnackbarSeverity("error");
        setSnackbarText("Error en edición");
        setOpenSnackbar(true);
      }
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Dialog
        PaperProps={{
          sx: {
            minHeight: "80vh",
            maxHeight: "80vh",
          },
        }}
        maxWidth="md"
        fullWidth
        aria-labelledby="dialog-hdv"
        open={dialogOpen}
      >
        <BootstrapDialogTitle
          maxHeight={50}
          id="dialog-hdv"
          onClose={handleClose}
        >
          <label>Hoja de Vida</label>
          <Button onClick={() => handleEdit()}>{editButtonText}</Button>
        </BootstrapDialogTitle>
        {loading ? (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} marginTop={25}>
              <CachedIcon
                sx={{
                  height: "100px",
                  width: "100px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">
                Cargando los datos, por favor espere...
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <TabsHDV
            disabledMode={disabledMode}
            HDVData={HDVData}
            setHDVData={setHDVData}
            tipoAlimentacionData={tipoAlimentacionData}
            setTipoAlimentacionData={setTipoAlimentacionData}
            fuenteAlimentacionData={fuenteAlimentacionData}
            setFuenteAlimentacionData={setFuenteAlimentacionData}
            docTecnicaData={docTecnicaData}
            setDocTecnicaData={setDocTecnicaData}
            accesoriosData={accesoriosData}
            mantenimientosData={mantenimientosData}
            setReload={setReload}
          ></TabsHDV>
        )}
      </Dialog>
    </>
  );
}
