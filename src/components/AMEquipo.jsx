import React, { useState, useEffect, useMemo } from "react";
import { TextField, Button } from "@mui/material";
import {
  addEquipo,
  editEquipo,
  getAllEquipoDetails,
} from "../grapqhql/Queries";
import Grid from "@mui/material/Grid";
import { useMutation, useQuery } from "@apollo/client";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function AMEquipo({
  setReload,
  setDialogOpen,
  equipo,
  submitButtonText,
}) {
  const [equipoData, setEquipoData] = useState([]);
  const { loading: load, data: allEquipoDetails } = useQuery(
    getAllEquipoDetails(),
    {
      fetchPolicy: "no-cache",
    }
  );
  const [equipoMutation] = useMutation(equipo ? editEquipo() : addEquipo());
  const [servicios, setServicios] = useState([]);
  const [allUbicaciones, setAllUbicaciones] = useState([]);
  const [clasif_riesgo, setClasif_riesgo] = useState([]);
  const [estado_funcional, setEstado_funcional] = useState([]);
  const [estado_fisico, setEstado_fisico] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [ubicacionesDisabled, setUbicacionesDisabled] = useState(true);
  const [selectedDate, handleDateChange] = useState(new Date());

  const prio = [1, 2, 3];
  const prioridades = [
    { label: "Baja", value: 1 },
    { label: "Media", value: 2 },
    { label: "Alta", value: 3 },
  ];

  const cargando = useMemo(() => {
    if (load) {
      return true;
    }
    return false;
  }, [load]);

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
    }
  }, [equipo]);

  const onSubmit = () => {
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
      },
    });
    setDialogOpen(false);
    setReload(true);
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

  if (cargando) {
    return "Cargando datos, por favor espere...";
  }

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

  return (
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
      <Grid item xs={12}>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
               label="Garantia"
               value={selectedDate}
               onChange={handleDateChange}

               showTodayButton
     />
      </MuiPickersUtilsProvider>

        {/* 
        <TextField
          label="Garantia"
          value={equipoData["garantia"]}
          onChange={(e) =>
            setEquipoData({ ...equipoData, garantia: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
        */}  
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
          renderInput={(params) => <TextField {...params} label="Servicios" />}
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
          renderInput={(params) => <TextField {...params} label="Ubicación" />}
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
            <TextField {...params}  label="Estado funcional" />
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
            <TextField {...params}  label="Estado fisico" />
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
            <TextField {...params}  label="Clasificación de riesgo" />
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
  );
}
