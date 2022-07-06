import React, { useContext } from "react";
import {
  Grid,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { HDVContextProvider } from "./../context/HDVContext";

export default function PageApoyoTecnico() {
  const {
    HDVData,
    setHDVData,
    disabledMode,
    docTecnicaData,
    setDocTecnicaData,
    accesoriosData,
    setAccesoriosData,
  } = useContext(HDVContextProvider);

  return (
    <Grid container rowSpacing={0} columnSpacing={1}>
      <Grid item xs={12}>
        <Grid container rowSpacing={0} columnSpacing={1}>
          <Grid item marginTop={0} marginLeft={1} marginBottom={0} xs={12}>
            <Typography> Documentación Tecnica:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={disabledMode}
              label="Manual de Operación"
              value={docTecnicaData.manual_operacion}
              onChange={(e) =>
                setDocTecnicaData({
                  ...docTecnicaData,
                  manual_operacion: e.target.value,
                })
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
              label="Manual de Servicio"
              value={docTecnicaData.manual_servicio}
              onChange={(e) =>
                setDocTecnicaData({
                  ...docTecnicaData,
                  manual_servicio: e.target.value,
                })
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
              label="Diagrama de partes"
              value={docTecnicaData.diagrama_partes}
              onChange={(e) =>
                setDocTecnicaData({
                  ...docTecnicaData,
                  diagrama_partes: e.target.value,
                })
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
              label="Planos"
              value={docTecnicaData.planos}
              onChange={(e) =>
                setDocTecnicaData({
                  ...docTecnicaData,
                  planos: e.target.value,
                })
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
              label="Otros"
              multiline
              rows={3}
              value={docTecnicaData.otros}
              onChange={(e) =>
                setDocTecnicaData({
                  ...docTecnicaData,
                  otros: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item marginTop={0} marginLeft={1} marginBottom={1} xs={12}>
        <Typography>Accesorios</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 400 }}
            size="small"
            aria-label="Accesorios Table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Marca</TableCell>
                <TableCell align="right">Serie de Referencia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accesoriosData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nombre}
                  </TableCell>
                  <TableCell align="right">{row.marca}</TableCell>
                  <TableCell align="right">{row.serie_referencia}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <TextField
          disabled={disabledMode}
          label="Guia de limpieza"
          multiline
          rows={3}
          value={docTecnicaData.otros}
          onChange={(e) =>
            setDocTecnicaData({
              ...docTecnicaData,
              otros: e.target.value,
            })
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
          label="Recomendación del fabricante"
          value={HDVData.recom_fabricante}
          multiline
          rows={2}
          onChange={(e) =>
            setHDVData({
              ...HDVData,
              recom_fabricante: e.target.value,
            })
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
