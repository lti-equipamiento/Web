import React, { useContext } from "react";
import {
  Grid,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { HDVContextProvider } from "./../context/HDVContext";

export default function PageMantenimiento() {
  const { HDVData, setHDVData, disabledMode, mantenimientosData } =
    useContext(HDVContextProvider);

  return (
    <Grid container rowSpacing={0} columnSpacing={1}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 400 }}
            size="small"
            aria-label="Accesorios Table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Fecha de Ingreso</TableCell>
                <TableCell align="right">Estado</TableCell>
                <TableCell align="right">Usuario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mantenimientosData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.fecha_ingreso}
                  </TableCell>
                  <TableCell align="right">{row.estado}</TableCell>
                  <TableCell align="right">
                    {row.usuarioByUsuario.nombre}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
