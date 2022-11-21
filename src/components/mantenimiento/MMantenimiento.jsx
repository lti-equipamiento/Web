import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import {
  editMantenimiento,
  getEstadosMantenimiento,
} from "../../grapqhql/Queries";
import Grid from "@mui/material/Grid";
import { useMutation, useQuery } from "@apollo/client";
import Autocomplete from "@mui/material/Autocomplete";

export default function MMantenimiento({
  setReload,
  setDialogOpen,
  mant,
  submitButtonText,
}) {
  const [mantData, setMantData] = useState([]);
  const { loading, data } = useQuery(getEstadosMantenimiento());
  const [mantMutation] = useMutation(editMantenimiento());
  const [estados, setEstados] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [tiempo, setTiempo] = useState([{ horas: 0, minutos: 0 }]);

  const [mensajeError, setMensajeError] = useState("");
  const [errorCosto, setErrorCosto] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const regexDecimalInput = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
  const regexDecimalResult = /(^[0-9]*\.[0-9]{2}$)|(^[0-9]*$)/;

  useEffect(() => {
    if (data) {
      let est = [];
      let eq = [];
      data.data_e_estado.forEach((estado) => est.push(estado.nombre));
      data.data_equipo.forEach((equipo) =>
        eq.push(equipo.nombre + " (" + equipo.n_serie + ")")
      );
      setEstados(est);
      setEquipos(eq);
    }
  }, [data]);

  useEffect(() => {
    if (mant) {
      console.log(mant);
      setMantData(mant);
      setMantData({ ...mant, fecha_egreso: new Date() });
    }
  }, [mant]);

  const onSubmit = () => {
    try {
      mantMutation({
        variables: {
          id: mantData.id,
          costo: mantData.costo,
          equipo: data.data_equipo.find(
            (equipo) =>
              equipo.nombre + " (" + equipo.n_serie + ")" ===
              mantData.equipoByEquipo.nombre +
                " (" +
                mantData.equipoByEquipo.n_serie +
                ")"
          ).id,
          estado: mantData.estado,
          fecha_egreso: mantData.fecha_egreso,
          piezas: mantData.piezas,
          procedimiento: mantData.procedimiento,
          resultado: mantData.resultado,
          tiempo_empleado: tiempo.horas + ":" + tiempo.minutos,
        },
      });
      setDialogOpen(false);
      setReload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        "Cargando datos, por favor espere..."
      ) : (
        <Grid container columnSpacing={1}>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              id="servicio-autocomplete"
              options={equipos}
              value={
                mant.equipoByEquipo.nombre +
                " (" +
                mant.equipoByEquipo.n_serie +
                ")"
              }
              onChange={(e, newValue) => {
                setMantData({ ...mantData, equipo: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Equipos" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputProps={{ maxLength: 50 }}
              label="Costo"
              value={mant.costo}
              onChange={(e) => {
                if (!e.target.value.match(regexDecimalResult)) {
                  setErrorCosto(true);
                  setMensajeError(
                    "El costo debe de ser un número. Ej: 1342 o 1342.42"
                  );
                  setBtnDisabled(true);
                } else {
                  setMantData({ ...mantData, costo: e.target.value });
                  setErrorCosto(false);
                  setMensajeError("");
                  setBtnDisabled(false);
                }
              }}
              error={errorCosto}
              helperText={mensajeError}
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} marginTop={2} marginBottom={1}>
            <Autocomplete
              fullWidth
              id="estado"
              options={estados}
              value={mant.estado}
              onChange={(e, newValue) => {
                setMantData({ ...mantData, estado: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Estados" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Procedimiento"
              inputProps={{ maxLength: 5000 }}
              value={mant.procedimiento}
              onChange={(e) =>
                setMantData({ ...mantData, procedimiento: e.target.value })
              }
              margin="normal"
              multiline
              rows={2}
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Piezas"
              value={mant.piezas}
              onChange={(e) =>
                setMantData({ ...mantData, piezas: e.target.value })
              }
              margin="normal"
              multiline
              rows={2}
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Resultado"
              inputProps={{ maxLength: 50 }}
              value={mant.resultado}
              onChange={(e) =>
                setMantData({ ...mantData, resultado: e.target.value })
              }
              margin="normal"
              multiline
              rows={2}
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Tiempo empleado</Typography>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="horas"
              value={mant.tiempo_empleado?.split(":")[0]}
              onChange={(e) => setTiempo({ ...tiempo, horas: e.target.value })}
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="minutos"
              value={mant.tiempo_empleado?.split(":")[1]}
              onChange={(e) =>
                setTiempo({ ...tiempo, minutos: e.target.value })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button
              disabled={btnDisabled}
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
