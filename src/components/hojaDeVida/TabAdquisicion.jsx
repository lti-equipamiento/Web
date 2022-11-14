import React from "react";
import { Grid, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export default function TabAdquisicion(props) {
  const { disabledMode, HDVData, setHDVData } = props;

  return (
    <Grid container rowSpacing={0} columnSpacing={1}>
      <Grid item xs={6} paddingRight={1.5}>
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
      <Grid item xs={6} paddingRight={1.5}>
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
      <Grid item xs={6} paddingRight={1.5}>
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
      <Grid item xs={6} marginTop={2} marginRight={-2}>
        <LocalizationProvider adapterLocale={"es"} dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            fullWidth
            disabled={disabledMode}
            label="Fecha de Adquisición"
            value={HDVData.fecha_adquisicion}
            onChange={(e) =>
              setHDVData({ ...HDVData, fecha_adquisicion: e.format("L") })
            }
            renderInput={(params) => <TextField {...params} />}
            margin="normal"
            variant="outlined"
            color="secondary"
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6} paddingRight={1.5}>
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
      <Grid item xs={6} paddingRight={1.5}>
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
      <Grid item xs={6} paddingRight={1.5}>
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
      <Grid item xs={6} paddingRight={1.5}>
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
      <Grid item xs={6} marginTop={2}>
        <LocalizationProvider adapterLocale={"es"} dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            fullWidth
            disabled={disabledMode}
            label="Fecha de instalación"
            value={HDVData.fecha_instalacion}
            onChange={(e) =>
              setHDVData({ ...HDVData, fecha_instalacion: e.format("L") })
            }
            renderInput={(params) => <TextField {...params} />}
            margin="normal"
            variant="outlined"
            color="secondary"
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6} paddingRight={1.5}>
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
    </Grid>
  );
}
