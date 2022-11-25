import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { getLast5MantsDashB } from "../../grapqhql/Queries";
import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { Grid } from "@mui/material";

export default function Orders() {
  const { loading, data } = useQuery(getLast5MantsDashB());
  const [rows, setRows] = useState([]);

  const navLinkStyle = { textDecoration: "none", color: "#1976d2" };

  useEffect(() => {
    if (!loading && data) {
      setRows(data.data_mantenimiento);
    }
  }, [data, loading]);

  return (
    <React.Fragment>
      <Title>Mantenimientos recientes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha de cierre mantenimiento</TableCell>
            <TableCell>Equipo</TableCell>
            <TableCell>Tecnico</TableCell>
            <TableCell>Ticket</TableCell>
            <TableCell align="right">Costo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.fecha_egreso}</TableCell>
              <TableCell>{row.equipoByEquipo.nombre}</TableCell>
              <TableCell>{row.usuarioByUsuario.nombre}</TableCell>
              <TableCell>{row.ticket}</TableCell>
              <TableCell align="right">{`$${row.costo}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid marginTop={2}>
        <NavLink style={navLinkStyle} to="/mantenimiento" sx={{ mt: 3 }}>
          Ver mas mantenimientos
        </NavLink>
      </Grid>
    </React.Fragment>
  );
}
