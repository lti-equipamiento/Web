import React, { useState, useEffect } from "react";
import { IconButton, Grid, TextField, Typography } from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";
import DialogAMAccesorio from "../dialogs/DialogAMAccesorio";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import CustomizedDialogs from "../dialogs/Dialog";
import BAccesorio from "./BAccesorio";
import { useLazyQuery } from "@apollo/client";
import { getComponenteHDV } from "../../grapqhql/Queries";

export default function TabApoyoTecnico(props) {
  const {
    disabledMode,
    HDVData,
    setHDVData,
    docTecnicaData,
    setDocTecnicaData,
    accesoriosData,
    setReload,
  } = props;

  //Accesorio
  const [accesorioRows, setAccesorioRows] = useState([]);
  const [addAccesorioDialog, setAddAccesorioDialog] = useState(false);
  const [editAccesorioDialog, setEditAccesorioDialog] = useState(false);
  const [deleteAccesorioDialog, setDeleteAccesorioDialog] = useState(false);
  const [deleteAccesorioData, setDeleteAccesorioData] = useState([]);
  const [editAccesorioData, setEditAccesorioData] = useState([]);
  const [getAccesorioRows] = useLazyQuery(getComponenteHDV(), {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setAccesorioRows(data.data_hoja_de_vida_by_pk.accesorios_componentes);
    },
  });

  useEffect(() => {
    if (accesoriosData) {
      setAccesorioRows(accesoriosData);
    }
  }, [accesoriosData]);

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "marca",
      headerName: "Marca",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "serie_referencia",
      headerName: "Serie de referencia",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      minWidth: 40,
      flex: 1,
      headerAlign: "center",
      align: "center",
      getActions: (params) => [
        <Grid>
          <IconButton
            title="Editar accesorio"
            onClick={() => {
              setEditAccesorioDialog(true);
              setEditAccesorioData(params.row);
            }}
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton
            title="Eliminar accesorio"
            onClick={() => {
              setDeleteAccesorioDialog(true);
              setDeleteAccesorioData(params.row);
            }}
          >
            <DeleteIcon color="primary" />
          </IconButton>
        </Grid>,
      ],
    },
  ];

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
      <Grid container>
        <Grid item marginTop={0.75} marginLeft={2} marginBottom={0} xs={1.5}>
          <Typography>Accesorios</Typography>
        </Grid>
        <Grid item marginTop={-0.25} marginLeft={1} marginBottom={1} xs={1}>
          <IconButton onClick={() => setAddAccesorioDialog(true)}>
            <AddIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item marginTop={-0.25} marginLeft={-2} marginBottom={1} xs={1}>
          <IconButton
            onClick={() => getAccesorioRows({ variables: { id: HDVData.id } })}
          >
            <RefreshIcon color="primary" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={accesorioRows}
          autoHeight
          {...accesorioRows}
          columns={columns}
          pageSize={5}
          pagination
          disableSelectionOnClick
          sx={{
            boxShadow: 2,
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
            backgroundColor: "white",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          disabled={disabledMode}
          label="Guia de limpieza"
          multiline
          rows={3}
          value={HDVData.guia_limpieza}
          onChange={(e) =>
            setHDVData({
              ...HDVData,
              guia_limpieza: e.target.value,
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
      <DialogAMAccesorio
        dialogOpen={editAccesorioDialog}
        setDialogOpen={setEditAccesorioDialog}
        HDVData={HDVData}
        setReload={setReload}
        data={editAccesorioData}
        title={"Editar accesorio"}
      />
      <DialogAMAccesorio
        dialogOpen={addAccesorioDialog}
        setDialogOpen={setAddAccesorioDialog}
        HDVData={HDVData}
        setReload={setReload}
        title={"Agregar accesorio"}
      />
      <CustomizedDialogs
        dialogOpen={deleteAccesorioDialog}
        setDialogOpen={setDeleteAccesorioDialog}
        modalTitle={"Eliminar accesorio"}
      >
        <BAccesorio
          deleteAccesorioData={deleteAccesorioData}
          setReload={setReload}
          setDialogOpen={setDeleteAccesorioDialog}
        />
      </CustomizedDialogs>
    </Grid>
  );
}
