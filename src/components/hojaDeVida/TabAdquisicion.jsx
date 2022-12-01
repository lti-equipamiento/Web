import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/es";

export default function TabAdquisicion(props) {
  const { disabledMode, HDVData, setHDVData } = props;

  const [fechaInstalacion, setFechaInstalacion] = useState(new Date());
  const [fechaAdquisicion, setFechaAdquisicion] = useState(new Date());

  useEffect(() => {
    if (HDVData) {
      setFechaInstalacion(new Date(HDVData.fecha_instalacion));
      setFechaAdquisicion(new Date(HDVData.fecha_adquisicion));
    }
  }, [HDVData]);

  return (
    <Grid container rowSpacing={0} columnSpacing={1}>
      <Grid item xs={12}>
        <TextField
          disabled={disabledMode}
          label="Fabricante"
          value={HDVData.fabricante}
          onChange={(e) =>
            setHDVData({ ...HDVData, fabricante: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          disabled={disabledMode}
          label="Distribuidor"
          value={HDVData.distribuidor}
          onChange={(e) =>
            setHDVData({ ...HDVData, distribuidor: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          disabled={disabledMode}
          label="RUT"
          value={HDVData.rut}
          onChange={(e) => setHDVData({ ...HDVData, rut: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          disabled={disabledMode}
          label="MSP"
          value={HDVData.autorizacion_msp}
          onChange={(e) =>
            setHDVData({ ...HDVData, autorizacion_msp: e.target.value })
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
          label="Ciudad fabricante"
          value={HDVData.ciudad_fabricante}
          onChange={(e) =>
            setHDVData({ ...HDVData, ciudad_fabricante: e.target.value })
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
          label="Ciudad distribuidor"
          value={HDVData.ciudad_distribuidor}
          onChange={(e) =>
            setHDVData({ ...HDVData, ciudad_distribuidor: e.target.value })
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
          label="Telefono"
          value={HDVData.telefono}
          onChange={(e) => setHDVData({ ...HDVData, telefono: e.target.value })}
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          disabled={disabledMode}
          label="Forma de adquisición"
          value={HDVData.forma_adquisicion}
          onChange={(e) =>
            setHDVData({ ...HDVData, forma_adquisicion: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={6} marginTop={2}>
        <LocalizationProvider adapterLocale={"es"} dateAdapter={AdapterMoment}>
          <DatePicker
            disabled={disabledMode}
            label="Fecha de instalación"
            value={fechaInstalacion}
            onChange={(newValue) => {
              setFechaInstalacion(newValue);
              setHDVData({ ...HDVData, fecha_instalacion: newValue.toJSON() });
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
            margin="normal"
            variant="outlined"
            color="secondary"
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6} marginTop={2} marginRight={-2}>
        <LocalizationProvider adapterLocale={"es"} dateAdapter={AdapterMoment}>
          <DatePicker
            disabled={disabledMode}
            label="Fecha de Adquisición"
            value={fechaAdquisicion}
            onChange={(newValue) => {
              setFechaAdquisicion(newValue);
              setHDVData({ ...HDVData, fecha_adquisicion: newValue.toJSON() });
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
            margin="normal"
            variant="outlined"
            color="secondary"
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}
