import React, { useContext } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { multiStepContext } from "../StepContext";

export default function SecondStep() {
  const { setStep, userData, setUserData } = useContext(multiStepContext);
  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Clasificación biomedica"
          value={userData["clasif_biomedica"]}
          onChange={(e) =>
            setUserData({ ...userData, clasif_biomedica: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Tecnologia predominante"
          value={userData["tec_predominante"]}
          onChange={(e) =>
            setUserData({ ...userData, tec_predominante: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Clasificación segun el riesgo clinico"
          value={userData["clasif_riesgo_clinico"]}
          onChange={(e) =>
            setUserData({ ...userData, clasif_riesgo_clinico: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Clasificación segun el riesgo sanitario"
          value={userData["clasif_riesgo_sanitario"]}
          onChange={(e) =>
            setUserData({
              ...userData,
              clasif_riesgo_sanitario: e.target.value,
            })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Clasificación segun el riesgo electrico"
          value={userData["clasif_riesgo_electrico"]}
          onChange={(e) =>
            setUserData({
              ...userData,
              clasif_riesgo_electrico: e.target.value,
            })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Clasificación internacional de protección"
          value={userData["clasif_inter_proteccion"]}
          onChange={(e) =>
            setUserData({
              ...userData,
              clasif_inter_proteccion: e.target.value,
            })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </Grid>
      <Grid container display={"flex"} alignItems={"center"}>
        <Grid xs={10} item>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de alimentación</InputLabel>
            <Select
              label="Tipo de alimentación"
              name="tipo_alimentacion"
              value={userData["tipo_alimentacion"]}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  tipo_alimentacion: e.target.value,
                })
              }
              fullWidth
              color="primary"
            >
              <MenuItem value={"electricidad"}>Electricidad</MenuItem>
              <MenuItem value={"regulada"}>Regulada</MenuItem>
              <MenuItem value={"estandar"}>Estandar</MenuItem>
              <MenuItem value={"emergencia"}>Emergencia</MenuItem>
              <MenuItem value={"bateria"}>Bateria</MenuItem>
              <MenuItem value={"servicio"}>Servicio</MenuItem>
              <MenuItem value={"vapor"}>Vapor</MenuItem>
              <MenuItem value={"oxigeno"}>Oxigeno</MenuItem>
              <MenuItem value={"aire"}>Aire</MenuItem>
              <MenuItem value={"vacio"}>Vacio</MenuItem>
              <MenuItem value={"agua"}>Agua</MenuItem>
              <MenuItem value={"otros"}>Otros</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={2} item>
          <Button fullWidth variant="outlined" margin="normal" size="large">
            +
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Fuentes de alimentación</InputLabel>
          <Select
            label="Fuentes de alimentación"
            placeholder="Fuentes de alimentación"
            value={userData["fuente_alimentacion"]}
            onChange={(e) =>
              setUserData({
                ...userData,
                fuente_alimentacion: e.target.value,
              })
            }
            margin="none"
            variant="outlined"
            color="secondary"
            fullWidth
          >
            <MenuItem value={"voltaje"}>Voltaje</MenuItem>
            <MenuItem value={"corriente"}>Corriente</MenuItem>
            <MenuItem value={"potencia"}>Potencia</MenuItem>
            <MenuItem value={"frecuencia"}>Frecuencia</MenuItem>
            <MenuItem value={"presion"}>Presion</MenuItem>
            <MenuItem value={"temperatura"}>Temperatura</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Periodicidad de mantenimiento</InputLabel>
          <Select
            label="Periodicidad de mantenimiento"
            value={userData["period_mantenimiento"]}
            onChange={(e) =>
              setUserData({
                ...userData,
                period_mantenimiento: e.target.value,
              })
            }
            margin="normal"
            variant="outlined"
            color="secondary"
            fullWidth
          >
            <MenuItem value={"bimensual"}>Bimensual</MenuItem>
            <MenuItem value={"trimestral"}>Trimestral</MenuItem>
            <MenuItem value={"semestral"}>Semestral</MenuItem>
            <MenuItem value={"anual"}>Anual</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Periodicidad de calibración</InputLabel>
          <Select
            label="Periodicidad de calibración"
            value={userData["period_calibracion"]}
            onChange={(e) =>
              setUserData({
                ...userData,
                period_calibracion: e.target.value,
              })
            }
            margin="normal"
            variant="outlined"
            color="secondary"
            fullWidth
          >
            <MenuItem value={"bimensual"}>Bimensual</MenuItem>
            <MenuItem value={"trimestral"}>Trimestral</MenuItem>
            <MenuItem value={"semestral"}>Semestral</MenuItem>
            <MenuItem value={"anual"}>Anual</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={() => setStep(1)}
            color="secondary"
          >
            Anterior
          </Button>
        </Grid>
        <Grid container xs={6} justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={() => setStep(3)}
            color="primary"
          >
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
