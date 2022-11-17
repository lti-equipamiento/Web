import React, { useState } from "react";
import {
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

import ZoomInIcon from "@mui/icons-material/ZoomIn";
import DialogShowMantenimiento from "../dialogs/DialogShowMantenimiento";

export default function TabMantenimiento(props) {
  const { mantenimientosData } = props;
  const [openShowMantenimientoDialog, setOpenShowMantenimientoDialog] =
    useState(false);
  const handleShowMantenimiento = () => {
    setOpenShowMantenimientoDialog(true);
  };

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
                <TableCell align="right">Acción</TableCell>
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
                  <TableCell align="right">
                    <Button
                      title="Mostrar mantenimiento"
                      onClick={() => handleShowMantenimiento()}
                    >
                      <ZoomInIcon color="primary" />
                    </Button>
                    <DialogShowMantenimiento
                      dialogOpen={openShowMantenimientoDialog}
                      setDialogOpen={setOpenShowMantenimientoDialog}
                      datos={row}
                    />
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
