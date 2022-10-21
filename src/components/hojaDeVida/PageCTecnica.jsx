import React, { useContext } from "react";
import { Grid, TextField, Autocomplete, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { HDVContextProvider } from "./../context/HDVContext";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function PageCTecnica() {
  const {
    HDVData,
    setHDVData,
    fuenteAlimentacionData,
    setFuenteAlimentacionData,
    disabledMode,
  } = useContext(HDVContextProvider);

  const tipo_de_alimentacion = [
    { label: "electricidad" },
    { label: "regulada" },
    { label: "estandar" },
    { label: "emergencia" },
    { label: "baterias" },
    { label: "servicio" },
    { label: "vapor" },
    { label: "oxigeno" },
    { label: "aire" },
    { label: "vacio" },
    { label: "agua" },
  ];

  const periodicidad = [
    { label: "Bimensual" },
    { label: "Trimestral" },
    { label: "Semestral" },
    { label: "Anual" },
  ];

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
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Tipo de alimentación" />
          )}
          onChange={(e, newValue) =>
            setHDVData({ ...HDVData, tipo_alimentacion: newValue })
          }
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
              value={
                fuenteAlimentacionData.voltaje == null
                  ? 0
                  : fuenteAlimentacionData.voltaje
              }
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
