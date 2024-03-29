import React, { useState, useEffect } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import {
  addEquipo,
  editEquipo,
  getAllEquipoDetails,
} from "../../grapqhql/Queries";
import Grid from "@mui/material/Grid";
import { useMutation, useQuery } from "@apollo/client";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/es";

export default function AMEquipo(props) {
  const {
    setReload,
    setDialogOpen,
    equipo,
    submitButtonText,
    setSnackbarSeverity,
    setSnackbarText,
    setOpenSnackbar,
  } = props;
  const [equipoData, setEquipoData] = useState({
    prioridad: 1,
    garantia: new Date(),
  });
  const { loading, data: allEquipoDetails } = useQuery(getAllEquipoDetails(), {
    fetchPolicy: "no-cache",
  });
  const [equipoMutation] = useMutation(equipo ? editEquipo() : addEquipo());
  const [servicios, setServicios] = useState([]);
  const [allUbicaciones, setAllUbicaciones] = useState([]);
  const [clasif_riesgo, setClasif_riesgo] = useState([]);
  const [estado_funcional, setEstado_funcional] = useState([]);
  const [estado_fisico, setEstado_fisico] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [ubicacionesDisabled, setUbicacionesDisabled] = useState(true);
  const [fechaGarantia, setFechaGarantia] = useState(new Date());
  const handleClearClick = () => {
    setEquipoData({ ...equipoData, url: "" });
  };

  const marks = [
    {
      value: 1,
      label: "Baja",
    },
    {
      value: 2,
      label: "Media",
    },
    {
      value: 3,
      label: "Alta",
    },
  ];

  useEffect(() => {
    if (allEquipoDetails) {
      let serv = [];
      let ubi = [];
      let ries = [];
      let fun = [];
      let fis = [];
      allEquipoDetails.data_servicio.forEach((servicio) =>
        serv.push(servicio.nombre)
      );
      allEquipoDetails.data_ubicacion.forEach((ubicacion) =>
        ubi.push({ label: ubicacion.nombre, servicio: ubicacion.servicio })
      );
      allEquipoDetails.data_e_clasificacion_riesgo.forEach((riesgo) =>
        ries.push(riesgo.nombre)
      );
      allEquipoDetails.data_e_estado_funcional.forEach((funcional) =>
        fun.push(funcional.nombre)
      );
      allEquipoDetails.data_e_estado_fisico.forEach((fisico) =>
        fis.push(fisico.nombre)
      );
      setServicios(serv);
      setAllUbicaciones(ubi);
      setClasif_riesgo(ries);
      setEstado_fisico(fis);
      setEstado_funcional(fun);
    }
  }, [allEquipoDetails]);

  useEffect(() => {
    if (equipo) {
      setEquipoData(equipo);
      setUbicacionesDisabled(false);
      getUbicaciones(equipo.servicio);
      setFechaGarantia(new Date(equipo.garantia));
    }
  }, [equipo]);

  const onSubmit = () => {
    try {
      equipoMutation({
        variables: {
          id: equipoData.id,
          Observaciones: equipoData.Observaciones,
          clasificacion_riesgo: equipoData.clasificacion_riesgo,
          estado_fisico: equipoData.estado_fisico,
          estado_funcional: equipoData.estado_funcional,
          garantia: equipoData.garantia,
          hoja_de_vida: equipoData.hoja_de_vida,
          n_activo_fijo: equipoData.n_activo_fijo,
          modelo: equipoData.modelo,
          marca: equipoData.marca,
          n_serie: equipoData.n_serie,
          nombre: equipoData.nombre,
          prioridad: equipoData.prioridad,
          servicio: equipoData.servicio,
          ubicacion: equipoData.ubicacion,
          url: equipoData.url,
        },
      });
      setDialogOpen(false);
      setReload(true);
      setSnackbarSeverity("success");
      if (equipo) {
        setSnackbarText("Edicion exitosa.");
      } else {
        setSnackbarText("Creacion exitosa.");
      }

      setOpenSnackbar(true);
    } catch (error) {
      console.log(error);
      setSnackbarSeverity("error");
      setSnackbarText("Error en edición");
      setOpenSnackbar(true);
    }
  };

  const getUbicaciones = (servicio) => {
    let ubi = [];
    allUbicaciones.forEach((ubicacion) => {
      if (ubicacion.servicio === servicio) {
        ubi.push(ubicacion.label);
      }
      setUbicaciones(ubi);
    });
  };

  return (
    <>
      {" "}
      {loading ? (
        <>Cargando datos, por favor espere...</>
      ) : (
        <Grid container rowSpacing={0}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              inputProps={{ maxLength: 50 }}
              value={equipoData["nombre"]}
              onChange={(e) =>
                setEquipoData({ ...equipoData, nombre: e.target.value })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Marca"
              inputProps={{ maxLength: 50 }}
              value={equipoData["marca"]}
              onChange={(e) =>
                setEquipoData({ ...equipoData, marca: e.target.value })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Modelo"
              inputProps={{ maxLength: 50 }}
              value={equipoData["modelo"]}
              onChange={(e) =>
                setEquipoData({ ...equipoData, modelo: e.target.value })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="N° Serie"
              inputProps={{ maxLength: 50 }}
              value={equipoData["n_serie"]}
              onChange={(e) =>
                setEquipoData({ ...equipoData, n_serie: e.target.value })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <img src={equipoData.url} alt="" width="200"></img>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Imagen"
              value={equipoData["url"]}
              helperText="Ingresar url de la imagen"
              onChange={(e) =>
                setEquipoData({ ...equipoData, url: e.target.value })
              }
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{ visibility: equipoData.url ? "visible" : "hidden" }}
                    onClick={handleClearClick}
                  >
                    <ClearIcon />
                  </IconButton>
                ),
              }}
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="N° Activo fijo"
              inputProps={{ maxLength: 100 }}
              value={equipoData["n_activo_fijo"]}
              onChange={(e) =>
                setEquipoData({ ...equipoData, n_activo_fijo: e.target.value })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} marginTop={2} marginBottom={1}>
            <LocalizationProvider
              adapterLocale={"es"}
              dateAdapter={AdapterMoment}
            >
              <DatePicker
                label="Garantía"
                value={fechaGarantia}
                onChange={(newValue) => {
                  setFechaGarantia(newValue);
                  setEquipoData({
                    ...equipoData,
                    garantia: newValue.toJSON(),
                  });
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
                margin="normal"
                variant="outlined"
                color="secondary"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} marginTop={2} marginBottom={1}>
            <Autocomplete
              fullWidth
              id="servicio-autocomplete"
              options={servicios}
              value={equipoData.servicio}
              onChange={(e, newValue) => {
                setEquipoData({ ...equipoData, servicio: newValue });
                setUbicacionesDisabled(false);
                getUbicaciones(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Servicios" />
              )}
            />
          </Grid>
          <Grid item xs={12} marginTop={2} marginBottom={1}>
            <Autocomplete
              disablePortal
              fullWidth
              disabled={ubicacionesDisabled}
              id="ubicacion-autocomplete"
              options={ubicaciones}
              value={equipoData["ubicacion"]}
              renderInput={(params) => (
                <TextField {...params} label="Ubicación" />
              )}
              onChange={(e, newValue) =>
                setEquipoData({ ...equipoData, ubicacion: newValue })
              }
            />
          </Grid>
          <Grid item xs={12} marginTop={2} marginBottom={1}>
            <Autocomplete
              disablePortal
              fullWidth
              id="estado_funcional-autocomplete"
              options={estado_funcional}
              value={equipoData["estado_funcional"]}
              renderInput={(params) => (
                <TextField {...params} label="Estado funcional" />
              )}
              onChange={(e, newValue) =>
                setEquipoData({ ...equipoData, estado_funcional: newValue })
              }
            />
          </Grid>
          <Grid item xs={12} marginTop={2} marginBottom={1}>
            <Autocomplete
              disablePortal
              fullWidth
              id="estado_fisico-autocomplete"
              options={estado_fisico}
              value={equipoData["estado_fisico"]}
              renderInput={(params) => (
                <TextField {...params} label="Estado fisico" />
              )}
              onChange={(e, newValue) =>
                setEquipoData({ ...equipoData, estado_fisico: newValue })
              }
            />
          </Grid>
          <Grid item xs={12} marginTop={2} marginBottom={1}>
            <Autocomplete
              disablePortal
              fullWidth
              id="clasificacion_riesgo-autocomplete"
              options={clasif_riesgo}
              value={equipoData["clasificacion_riesgo"]}
              renderInput={(params) => (
                <TextField {...params} label="Clasificación de riesgo" />
              )}
              onChange={(e, newValue) =>
                setEquipoData({ ...equipoData, clasificacion_riesgo: newValue })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Observaciones"
              inputProps={{ maxLength: 5000 }}
              value={equipoData["Observaciones"]}
              onChange={(e) =>
                setEquipoData({ ...equipoData, Observaciones: e.target.value })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              rows={3}
              multiline
              fullWidth
            />
          </Grid>
          <Grid container>
            <Grid item xs={12} marginLeft={2}>
              <Typography variant="h6">Prioridad</Typography>
            </Grid>
            <Grid item xs={12} marginLeft={1} marginRight={1}>
              <Slider
                aria-label="Prioridad"
                step={null}
                valueLabelDisplay="off"
                defaultValue={equipoData["prioridad"]}
                marks={marks}
                min={1}
                max={3}
                onChange={(e) =>
                  setEquipoData({ ...equipoData, prioridad: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Grid container marginTop={1} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() => {
                onSubmit();
              }}
              color="primary"
            >
              {submitButtonText}
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
