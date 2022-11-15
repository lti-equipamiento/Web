import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Autocomplete,
  Typography,
  InputAdornment,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Tags from "./asd";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function TabCTecnica(props) {
  const {
    disabledMode,
    HDVData,
    setHDVData,
    tipoAlimentacionData,
    setTipoAlimentacionData,
    fuenteAlimentacionData,
    setFuenteAlimentacionData,
  } = props;

  const [showTipoAlimentacionData, setShowTipoAlimentacionData] = useState([]);
  const tipo_de_alimentacion = [
    { label: "electricidad", value: true },
    { label: "regulada", value: true },
    { label: "estandar", value: true },
    { label: "emergencia", value: true },
    { label: "baterias", value: true },
    { label: "servicio", value: true },
    { label: "vapor", value: true },
    { label: "oxigeno", value: true },
    { label: "aire", value: true },
    { label: "vacio", value: true },
    { label: "agua", value: true },
  ];

  const periodicidad = [
    { label: "Bimensual" },
    { label: "Trimestral" },
    { label: "Semestral" },
    { label: "Anual" },
  ];

  // --TODO: hay que acomodar el tipodealimentacioN

  //Funciona, nos coloca en true y false a las property que necesitamos en la mutation
  const setTipoAlimentacion = (tipo) => {
    setShowTipoAlimentacionData(tipo);

    // si hay tipos seleccionados
    if (tipo) {
      // creamos un newTipos que lo asignaremos dsp
      var newTipos = tipoAlimentacionData;
      // por cada tipo hacemos lo siguiente
      tipo.forEach((t) => {
        // entramos a la property de newTipos y le asignamos la value
        // ej: newTipos.electrecidad = true;
        let property = t.label;
        newTipos[property] = t.value;
      });
      // Setteamos el tipoAlimentacion con newTipos
      setTipoAlimentacionData(newTipos);
    }
  };

  // Aca traemos de la base de datos todas las property con booleanos
  // creamos una biblioteca para que lo pueda mostrar el autocomplete
  useEffect(() => {
    if (tipoAlimentacionData) {
      var tiposData = [];
      Object.keys(tipoAlimentacionData).forEach((key) => {
        if (tipoAlimentacionData[key] === true) {
          tiposData.push({ label: key, value: true });
        }
      });
      setShowTipoAlimentacionData(tiposData);
    }
  }, [tipoAlimentacionData]);

  console.log(showTipoAlimentacionData);

  return (
    <Grid container rowSpacing={0} columnSpacing={1}>
      <Grid item xs={6}>
        <TextField
          disabled={disabledMode}
          label="Clasificación biomedica"
          value={HDVData.clasif_biomedica}
          onChange={(e) =>
            setHDVData({ ...HDVData, clasif_biomedica: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          disabled={disabledMode}
          label="Tecnologia predominante"
          value={HDVData.tecnologia_predominante}
          onChange={(e) =>
            setHDVData({ ...HDVData, tecnologia_predominante: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          disabled={disabledMode}
          label="Clasificación segun el riesgo clinico"
          value={HDVData.clasif_riesgo_clinico}
          onChange={(e) =>
            setHDVData({ ...HDVData, clasif_riesgo_clinico: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          disabled={disabledMode}
          label="Clasificación segun el riesgo sanitario"
          value={HDVData.clasif_riesgo_sanitario}
          onChange={(e) =>
            setHDVData({ ...HDVData, clasif_riesgo_sanitario: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          disabled={disabledMode}
          label="Clasificación segun el riesgo electrico"
          value={HDVData.clasif_riesgo_electrico}
          onChange={(e) =>
            setHDVData({ ...HDVData, clasif_riesgo_electrico: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          disabled={disabledMode}
          label="Clasificación internacional de protección"
          value={HDVData.clasif_inter_proteccion}
          onChange={(e) =>
            setHDVData({ ...HDVData, clasif_inter_proteccion: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item marginTop={2} xs={12}>
        <Autocomplete
          multiple
          fullWidth
          disabled={disabledMode}
          id="tipo_alimentacion-autocomplete"
          options={tipo_de_alimentacion}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          value={showTipoAlimentacionData}
          renderInput={(params) => (
            <TextField {...params} label="Tipo de alimentación" />
          )}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={showTipoAlimentacionData.value}
              />
              {option.label}
            </li>
          )}
          onChange={(e, newValue) => {
            setTipoAlimentacion(newValue);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container rowSpacing={0} columnSpacing={1}>
          <Grid item marginTop={2} marginLeft={1} marginBottom={0} xs={12}>
            <Typography> Fuentes de alimentación:</Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              disabled={disabledMode}
              label="Voltaje"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">V</InputAdornment>,
              }}
              value={fuenteAlimentacionData.voltaje}
              onChange={(e) =>
                setFuenteAlimentacionData({
                  ...fuenteAlimentacionData,
                  voltaje: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              disabled={disabledMode}
              label="Corriente"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">A</InputAdornment>,
              }}
              value={fuenteAlimentacionData.corriente}
              onChange={(e) =>
                setFuenteAlimentacionData({
                  ...fuenteAlimentacionData,
                  corriente: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              disabled={disabledMode}
              label="Potencia"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">W</InputAdornment>,
              }}
              value={fuenteAlimentacionData.potencia}
              onChange={(e) =>
                setFuenteAlimentacionData({
                  ...fuenteAlimentacionData,
                  potencia: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              disabled={disabledMode}
              label="Frecuencia"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Hz</InputAdornment>
                ),
              }}
              value={fuenteAlimentacionData.frecuencia}
              onChange={(e) =>
                setFuenteAlimentacionData({
                  ...fuenteAlimentacionData,
                  frecuencia: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              disabled={disabledMode}
              label="Presión"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Bar</InputAdornment>
                ),
              }}
              value={fuenteAlimentacionData.presion}
              onChange={(e) =>
                setFuenteAlimentacionData({
                  ...fuenteAlimentacionData,
                  presion: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              disabled={disabledMode}
              label="Temperatura"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">C°</InputAdornment>
                ),
              }}
              value={fuenteAlimentacionData.temperatura}
              onChange={(e) =>
                setFuenteAlimentacionData({
                  ...fuenteAlimentacionData,
                  temperatura: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item marginTop={2} marginBottom={1} xs={12}>
        <Autocomplete
          disabled={disabledMode}
          disablePortal
          fullWidth
          id="period_mantenimiento-autocomplete"
          options={periodicidad}
          value={HDVData.period_mantenimiento}
          renderInput={(params) => (
            <TextField {...params} label="Periodicidad mantenimiento" />
          )}
          onChange={(e, newValue) =>
            setHDVData({ ...HDVData, period_mantenimiento: newValue })
          }
        />
      </Grid>
      <Grid item marginTop={2} marginBottom={1} xs={12}>
        <Autocomplete
          disabled={disabledMode}
          disablePortal
          fullWidth
          id="period_calibracion-autocomplete"
          options={periodicidad}
          value={HDVData.period_calibracion}
          renderInput={(params) => (
            <TextField {...params} label="Periodicidad calibración" />
          )}
          onChange={(e, newValue) =>
            setHDVData({ ...HDVData, period_calibracion: newValue })
          }
        />
      </Grid>
    </Grid>
  );
}
