import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import {
  editMantenimiento,
  getEstadosMantenimiento,
  getUsuarioNombreRol,
} from "../../grapqhql/Queries";
import Grid from "@mui/material/Grid";
import { useMutation, useQuery } from "@apollo/client";
import Autocomplete from "@mui/material/Autocomplete";
import { useAuth0 } from "@auth0/auth0-react";

export default function MMantenimiento(props) {
  const {
    setReload,
    setDialogOpen,
    mant,
    setOpenSnackbar,
    setSnackbarText,
    setSnackbarSeverity,
  } = props;
  const userMant = getUsuarioNombreRol();
  const { user } = useAuth0();
  const [mantData, setMantData] = useState([]);
  const { loading, data } = useQuery(getEstadosMantenimiento());
  const [mantMutation] = useMutation(editMantenimiento());
  const [estados, setEstados] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const { data: dataUser } = useQuery(userMant, {
    variables: { id: user.sub },
  });
  const [mensajeError, setMensajeError] = useState("");
  const [errorCosto, setErrorCosto] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const regexDecimalInput = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
  const regexDecimalResult = /(^[0-9]*\.[0-9]{2}$)|(^[0-9]*$)/;

  useEffect(() => {
    if (data && dataUser) {
      let est = [];
      let eq = [];
      data.data_e_estado.forEach((estado) => {
        if (dataUser.data_usuario_by_pk.rol === "mantenimiento") {
          if (estado.nombre !== "Cerrado") {
            est.push(estado.nombre);
          }
        } else {
          est.push(estado.nombre);
        }
      });
      data.data_equipo.forEach((equipo) => {
        if (eq.estado_funcional !== "Inactivo") {
          eq.push(equipo.nombre + " (" + equipo.n_serie + ")");
        }
      });
      setEstados(est);
      setEquipos(eq);
    }
  }, [data, dataUser]);

  useEffect(() => {
    if (mant) {
      setMantData(mant);
      setMantData({
        ...mant,
        equipo:
          mant.equipoByEquipo.nombre + " (" + mant.equipoByEquipo.n_serie + ")",
      });
    }
  }, [mant]);

  console.log(mantData);

  const onSubmit = () => {
    setOpenSnackbar(true);
    try {
      var date = null;
      if (mantData.estado === "Cerrado") {
        date = new Date();
      }

      mantMutation({
        variables: {
          id: mantData.id,
          costo: mantData.costo,
          equipo: data.data_equipo.find(
            (equipo) =>
              equipo.nombre + " (" + equipo.n_serie + ")" === mantData.equipo
          ).id,
          estado: mantData.estado,
          fecha_egreso: date,
          piezas: mantData.piezas,
          procedimiento: mantData.procedimiento,
          resultado: mantData.resultado,
          tiempo_empleado: mantData.tiempo_empleado,
        },
      });
      setDialogOpen(false);
      setReload(true);
      setSnackbarText("Edicion exitosa.");
      setSnackbarSeverity("success");
    } catch (error) {
      console.log(error);
      setSnackbarText("Error en edición.");
      setSnackbarSeverity("error");
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
              value={mantData.equipo}
              defaultValue={
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
              value={mantData.costo}
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
              value={mantData.estado}
              defaultValue={mant.estado}
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
              value={mantData.procedimiento}
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
              value={mantData.piezas}
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
              value={mantData.resultado}
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
            <TextField
              label="Tiempo empleado"
              type={"time"}
              value={mantData.tiempo_empleado}
              onChange={(e) =>
                setMantData({ ...mantData, tiempo_empleado: e.target.value })
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
              Editar
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
