import { useLazyQuery, useQuery } from "@apollo/client";
import { Edit } from "@mui/icons-material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  DataGrid,
  esES,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import { getEquipos, getHojaDeVida } from "../../grapqhql/Queries";
import AMEquipo from "../AMEquipo";
import HDVContext from "../context/HDVContext";
import CustomizedDialogs from "../dialogs/dialog";
import DialogHDV from "../dialogs/DialogHDV";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

const equipo = getEquipos();

export default function TablaEquipos2() {
  const [pageSize, setPageSize] = React.useState(5);
  const { loading, data, refetch } = useQuery(equipo);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [editEquipo, setEditEquipo] = useState([]);
  const [reload, setReload] = useState(false);
  const [hoja, setHoja] = useState([]);
  const [dialogHDV, setDialogHDVOpen] = useState(false);
  const [HDVid, setHDVid] = useState(0);
  const [getHDV, { data: dataHDV }] = useLazyQuery(getHojaDeVida(HDVid));

  useEffect(() => {
    if (reload) {
      setReload(false);
      refetch();
    }
  }, [reload]);

  useEffect(() => {
    if (dataHDV) {
      setHoja(dataHDV.data_hoja_de_vida_by_pk);
    }
  }, [dataHDV]);

  const handleEdit = (equipo) => {
    setEditDialogOpen(true);
    setEditEquipo(equipo);
  };
  const handleClickOpenDialog = () => {
    setAddDialogOpen(true);
  };

  const handleClickOpenDetailsDialog = () => {
    setDetailsDialogOpen(true);
  };

  const handleOpenHDV = (id) => {
    setHDVid(id);
    getHDV();
    setDialogHDVOpen(true);
  };

  function CustomToolBar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: "right" }}>
        <GridToolbarExport />
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button onClick={handleClickOpenDialog}>
            <AddBoxIcon />
          </Button>
          <CustomizedDialogs
            modalTitle="Registro de Equipo"
            dialogOpen={addDialogOpen}
            setDialogOpen={setAddDialogOpen}
          >
            <AMEquipo
              setDialogOpen={setAddDialogOpen}
              submitButtonText="Registrar"
              setReload={setReload}
            />
          </CustomizedDialogs>
        </div>
      </GridToolbarContainer>
    );
  }

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Modificar",
      minWidth: 70,
      flex: 1,
      headerAlign: "left",
      align: "left",
      getActions: (params) => [
        <>
          <Button
            title="Modificar equipo"
            onClick={() => handleEdit(params.row)}
          >
            <Edit color="primary" />
          </Button>
          <CustomizedDialogs
            modalTitle="Edición de Equipo"
            dialogOpen={editDialogOpen}
            setDialogOpen={setEditDialogOpen}
          >
            <AMEquipo
              setDialogOpen={setEditDialogOpen}
              setReload={setReload}
              equipo={editEquipo}
              submitButtonText="Editar"
            />
          </CustomizedDialogs>
        </>,
      ],
    },
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
      field: "modelo",
      headerName: "Modelo",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "n_activo_fijo",
      headerName: "N_activo_fijo",
      type: "number",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "garantia",
      headerName: "Garantia",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "servicio",
      headerName: "Servicio",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "ubicacion",
      headerName: "Ubicacion",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "estado_funcional",
      headerName: "Estado Funcional",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "estado_fisico",
      headerName: "Estado fisico",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "clasificacion_riesgo",
      headerName: "Clasificacion de riesgo",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Observaciones",
      headerName: "Observaciones",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "prioridad",
      headerName: "Prioridad",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
      valueGetter: (params) => {
        if (params.row.prioridad === 3) {
          return "Alta";
        }
        if (params.row.prioridad === 2) {
          return "Media";
        }
        if (params.row.prioridad === 1) {
          return "Baja";
        }
      },
    },
    {
      field: "action1",
      type: "actions",
      headerName: "Detalles",
      minWidth: 70,
      flex: 1,
      headerAlign: "left",
      align: "left",
      getActions: (params) => [
        <>
          <Button
            title="Mostrar detalles"
            onClick={handleClickOpenDetailsDialog}
          >
            ...
          </Button>
          <CustomizedDialogs
            modalTitle="Detalles"
            dialogOpen={detailsDialogOpen}
            setDialogOpen={setDetailsDialogOpen}
          >
            <Box
              sx={{
                width: 800,
                height: 300,
              }}
            >
              <List>
                <ListItem>
                  <ListItemText
                    primary="No serie"
                    secondary={params.row.n_serie}
                  />
                </ListItem>
                <Divider sx={{ my: 0 }} />
                <ListItem>
                  <ListItemText
                    primary="No activo fijo"
                    secondary={params.row.n_activo_fijo}
                  />
                </ListItem>
                <Divider sx={{ my: 0 }} />
                <ListItem>
                  <ListItemText primary="Marca" secondary={params.row.marca} />
                </ListItem>
                <Divider sx={{ my: 0 }} />
                <ListItem>
                  <ListItemText
                    primary="Modelo"
                    secondary={params.row.modelo}
                  />
                </ListItem>
                <Divider sx={{ my: 0 }} />
                <ListItem>
                  <ListItemText
                    primary="Garantia"
                    secondary={params.row.garantia}
                  />
                </ListItem>
                <Divider sx={{ my: 0 }} />
                <ListItem>
                  <ListItemText
                    primary="Clasificacion"
                    secondary={params.row.clasificacion_riesgo}
                  />
                </ListItem>
                <Divider sx={{ my: 0 }} />
                <ListItem>
                  <ListItemText
                    primary="Observaciones"
                    secondary={params.row.Observaciones}
                  />
                </ListItem>
              </List>
            </Box>
          </CustomizedDialogs>
        </>,
      ],
    },
    {
      field: "action",
      type: "actions",
      headerName: "Hoja de vida",
      minWidth: 70,
      flex: 1,
      headerAlign: "left",
      align: "left",
      getActions: (params) => [
        <>
          <Button onClick={() => handleOpenHDV(params.row.hoja_de_vida)}>
            <AutoStoriesIcon />
          </Button>
          <HDVContext>
            <DialogHDV
              dialogOpen={dialogHDV}
              setDialogOpen={setDialogHDVOpen}
              datos={hoja}
            ></DialogHDV>
          </HDVContext>
        </>,
      ],
    },
  ];

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
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h5"
        id="tableTitle"
        component="div"
      >
        Equipos
      </Typography>
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={data.data_equipo}
        autoHeight
        {...data.data_equipo}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              n_activo_fijo: false,
              marca: false,
              modelo: false,
              garantia: false,
              clasificacion_riesgo: false,
              Observaciones: false,
            },
          },
        }}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        disableSelectionOnClick
        components={{ Toolbar: CustomToolBar }}
        componentsProps={{
          toolbar: { showQuickFilter: true },
        }}
        sx={{
          boxShadow: 2,
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          backgroundColor: "white",
        }}
      />
    </Box>
  );
}
