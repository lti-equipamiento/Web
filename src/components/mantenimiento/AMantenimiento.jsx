import React, { useState, useEffect, useMemo } from "react";
import { TextField, Button } from "@mui/material";
import { getUsuarios } from "../../grapqhql/Queries";
import { addMantenimiento } from "../../grapqhql/Queries";
import Grid from "@mui/material/Grid";
import { useMutation, useQuery } from "@apollo/client";
import Autocomplete from "@mui/material/Autocomplete";

export default function AMantenimiento(props) {
  const {
    setReload,
    setDialogMantOpen,
    ticket,
    submitButtonText,
    setSnackbarSeverity,
    setSnackbarText,
    setOpenSnackbar,
  } = props;
  const { loading, data } = useQuery(getUsuarios());
  const [mantenimientoMutation] = useMutation(addMantenimiento());

  const [mantData, setMantData] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const cargando = useMemo(() => {
    if (loading) {
      return true;
    }
    return false;
  }, [loading]);

  useEffect(() => {
    if (data) {
      let usu = [];
      data.data_usuario.forEach((usuario) => {
        if (
          usuario.rol == "mantenimiento" ||
          usuario.rol == "jefe-mantenimiento"
        ) {
          usuario.nombre != null && usu.push(usuario.nombre);
        }
      });
      setUsuarios(usu);
    }
  }, [data]);

  const onSubmit = () => {
    try {
      mantenimientoMutation({
        variables: {
          ticket: ticket.id,
          usuario: data.data_usuario.find(
            (usuario) => usuario.nombre === mantData.usuario
          ).id,
          equipo: ticket.equipo,
          hoja_de_vida: ticket.equipoByEquipo.hoja_de_vida,
        },
      });
      setSnackbarSeverity("success");
      setSnackbarText("Edicion exitosa.");
      setOpenSnackbar(true);
      setDialogMantOpen(false);
      setReload(true);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarText("Error en edición");
      setOpenSnackbar(true);
    }
  };

  if (cargando) {
    return "Cargando datos, por favor espere...";
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          label="Ticket"
          inputProps={{ maxLength: 50 }}
          value={ticket.equipoByEquipo.nombre}
          disabled="true"
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          fullWidth
          id="usuario"
          options={usuarios}
          // value={ticket.usuarioByUsuario.nombre}
          renderInput={(params) => <TextField {...params} label="Usuario" />}
          onChange={(e, newValue) => setMantData({ usuario: newValue })}
        />
      </Grid>
      <Grid container justifyContent="flex-end">
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
