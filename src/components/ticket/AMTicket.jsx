import React, { useState, useEffect, useMemo } from "react";
import { TextField, Button } from "@mui/material";
import { addTicket, editTicket, getDDTickets } from "../../grapqhql/Queries";
import Grid from "@mui/material/Grid";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";

import Autocomplete from "@mui/material/Autocomplete";
import moment from "moment";

export default function AMTicket({
  setDialogOpen,
  ticket,
  submitButtonText,
  setReload,
}) {
  const { user } = useAuth0();
  const { loading, data } = useQuery(getDDTickets(), {
    fetchPolicy: "no-cache",
    nextFetchPolicy: "no-cache",
  });
  const [add] = useMutation(ticket ? editTicket() : addTicket());

  const [ticketData, setTicketData] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [allEquipos, setAllEquipos] = useState([]);
  const [tiposTicket, setTipoTicket] = useState([]);
  const [allUbicaciones, setAllUbicaciones] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [ubicacionesDisabled, setUbicacionesDisabled] = useState(true);
  const [equiposDisabled, setEquiposDisabled] = useState(true);

  const onSubmit = async () => {
    await add({
      variables: {
        id: ticketData.id,
        descripcion: ticketData.descripcion,
        equipo: data.data_equipo.find(
          (equipo) => equipo.nombre === ticketData.equipo
        ).id,
        fecha: moment().format("YYYY-MM-D"),
        tipo: ticketData.tipo,
        usuario: user.sub,
      },
    });
    setDialogOpen(false);
    setReload(true);
  };

  useEffect(() => {
    if (data) {
      let serv = [];
      let ubi = [];
      let eq = [];
      let ttick = [];
      data.data_servicio.forEach((servicio) => serv.push(servicio.nombre));
      data.data_ubicacion.forEach((ubicacion) =>
        ubi.push({ label: ubicacion.nombre, servicio: ubicacion.servicio })
      );
      data.data_equipo.forEach((equipo) =>
        eq.push({
          nombre: equipo.nombre,
          id: equipo.id,
          servicio: equipo.servicio,
          ubicacion: equipo.ubicacion,
        })
      );
      data.data_e_tipo_ticket.forEach((tipoTicket) =>
        ttick.push(tipoTicket.nombre)
      );
      setServicios(serv);
      setAllUbicaciones(ubi);
      setAllEquipos(eq);
      setTipoTicket(ttick);
    }
  }, [data]);

  useEffect(() => {
    if (ticket) {
      setTicketData({
        id: ticket.id,
        usuario: user.sub,
        tipo: ticket.tipo,
        fecha: ticket.fecha,
        servicio: ticket.equipoByEquipo.servicio,
        ubicacion: ticket.equipoByEquipo.ubicacion,
        equipo: ticket.equipoByEquipo.nombre,
        descripcion: ticket.descripcion,
      });
      setUbicacionesDisabled(false);
      setEquiposDisabled(false);
      getUbicaciones(ticket.equipoByEquipo.servicio);
      getEquipos(
        ticket.equipoByEquipo.servicio,
        ticket.equipoByEquipo.ubicacion
      );
    }
  }, [ticket]);

  const getUbicaciones = (servicio) => {
    let ubi = [];
    allUbicaciones.forEach((ubicacion) => {
      if (ubicacion.servicio === servicio) {
        ubi.push(ubicacion.label);
      }
    });
    setUbicaciones(ubi);
  };

  const getEquipos = (servicio, ubicacion) => {
    let eq = [];
    allEquipos.forEach((equipo) => {
      if (
        equipo.servicio === servicio &&
        equipo.ubicacion === ubicacion &&
        equipo.estado_funcional !== "Inactivo"
      ) {
        eq.push(equipo.nombre);
      }
    });
    setEquipos(eq);
  };

  const cargando = useMemo(() => {
    if (loading) {
      return true;
    }
    return false;
  }, [loading]);

  if (cargando) {
    return "Cargando datos, por favor espere...";
  }

  return (
    <Grid container>
      <Grid item xs={12} marginBottom={1}>
        <Autocomplete
          fullWidth
          id="Servicio"
          options={servicios}
          value={ticketData.servicio}
          renderInput={(params) => <TextField {...params} label="Servicios" />}
          onChange={(e, newValue) => {
            setTicketData({
              ...ticketData,
              servicio: newValue,
              ubicacion: "",
              equipo: "",
            });
            setUbicacionesDisabled(false);
            getUbicaciones(newValue);
          }}
        />
      </Grid>
      <Grid item xs={12} marginTop={2} marginBottom={1}>
        <Autocomplete
          fullWidth
          disabled={ubicacionesDisabled}
          id="Ubicacion"
          options={ubicaciones}
          value={ticketData.ubicacion}
          renderInput={(params) => (
            <TextField {...params} label="Ubicaciones" />
          )}
          onChange={(e, newValue) => {
            setTicketData({ ...ticketData, ubicacion: newValue, equipo: "" });
            setEquiposDisabled(false);
            getEquipos(ticketData.servicio, newValue);
          }}
        />
      </Grid>
      <Grid item xs={12} marginTop={2} marginBottom={1}>
        <Autocomplete
          fullWidth
          id="Equipo"
          disabled={equiposDisabled}
          options={equipos}
          value={ticketData.equipo}
          renderInput={(params) => <TextField {...params} label="Equipo" />}
          onChange={(e, newValue) => {
            setTicketData({ ...ticketData, equipo: newValue });
          }}
        />
      </Grid>
      <Grid item xs={12} marginTop={2} marginBottom={1}>
        <Autocomplete
          fullWidth
          id="Tipo"
          options={tiposTicket}
          value={ticketData.tipo}
          renderInput={(params) => <TextField {...params} label="Tipo" />}
          onChange={(e, newValue) => {
            setTicketData({ ...ticketData, tipo: newValue });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Descripcion"
          inputProps={{ maxLength: 5000 }}
          value={ticketData["descripcion"]}
          onChange={(e) =>
            setTicketData({ ...ticketData, descripcion: e.target.value })
          }
          margin="normal"
          variant="outlined"
          color="secondary"
          fullWidth
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
