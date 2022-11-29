import { useQuery } from "@apollo/client";
import { Edit } from "@mui/icons-material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import {
  FormControlLabel,
  Typography,
  Snackbar,
  Alert,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import {
  DataGrid,
  esES,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import React, { useEffect, useState } from "react";
import { getEquipos } from "../grapqhql/Queries";
import AMEquipo from "../components/equipo/AMEquipo";
import CustomizedDialogs from "../components/dialogs/Dialog";
import DialogHDV from "../components/dialogs/DialogHDV";
import EquipoDetails from "../components/equipo/EquipoDetails";
import Popover from "@mui/material/Popover";
import Switch from "@mui/material/Switch";
import BEquipo from "../components/equipo/BEquipo";

const equipo = getEquipos();

export default function PageEquipo() {
  // Tabla
  const [pageSize, setPageSize] = React.useState(5);
  const { loading, data, refetch } = useQuery(equipo, {
    fetchPolicy: "no-cache",
  });
  const [reload, setReload] = useState(false);
  const [rows, setRows] = useState([]);

  // Agregar equipo
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // Edit equipo
  const [editEquipo, setEditEquipo] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Eliminacion de equipo
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [deleteEquipo, setDeleteEquipo] = useState([]);

  // Hoja de vida
  const [dialogHDV, setDialogHDVOpen] = useState(false);
  const [HDVid, setHDVid] = useState(0);

  // Detalles de equipo
  const [detailsData, setDetailsData] = useState([]);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  //PopOver
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");

  //Filter rotos
  const [show, setShow] = useState(false);

  //Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // Boton Refresh
  const onRefresh = () => {
    refetch();
    setOpenSnackbar(true);
    setSnackbarSeverity("success");
    setSnackbarText("Datos Actualizados");
  };

  // useEffect Tabla
  useEffect(() => {
    if (reload) {
      refetch();
      setReload(false);
    }
  }, [reload, refetch]);

  useEffect(() => {
    if (!loading && data) {
      if (!show) {
        const filtered_data = data.data_equipo.filter(
          (d) => d.estado_funcional !== "Inactivo"
        );
        setRows(filtered_data);
      } else {
        const filtered_data = data.data_equipo;
        setRows(filtered_data);
      }
    }
  }, [data, loading, show]);

  function CustomToolBar() {
    return (
      <GridToolbarContainer>
        <Grid container marginTop={1} marginBottom={-1}>
          <Grid item xs={4}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item marginLeft={2} marginTop={0.5}>
                <Typography
                  sx={{ flex: "1 1 100%" }}
                  variant="h5"
                  id="tableTitle"
                  component="div"
                >
                  Equipos
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item xs={4}>
                <GridToolbarQuickFilter fullWidth />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e) => {
                        setShow(!show);
                      }}
                      checked={show}
                    />
                  }
                  label="Mostrar inactivos"
                  labelPlacement="start"
                />
              </Grid>
              <Grid item xs={2}>
                <GridToolbarExport
                  csvOptions={{ allColumns: true }}
                  printOptions={{
                    allColumns: true,
                    hideFooter: true,
                    hideToolbar: true,
                    disableToolbarButton: true,
                  }}
                />
              </Grid>
              <Grid item xs={1} paddingLeft={2}>
                <IconButton
                  onClick={() => {
                    setAddDialogOpen(true);
                  }}
                >
                  <AddBoxIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={onRefresh}>
                  <RefreshIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </GridToolbarContainer>
    );
  }

  const calculatePrioridad = (data) => {
    if (data.prioridad === 3) {
      return "Alta";
    }
    if (data.prioridad === 2) {
      return "Media";
    }
    if (data.prioridad === 1) {
      return "Baja";
    }
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      getActions: (params) => [
        <>
          <Grid container>
            <IconButton
              title="Modificar equipo"
              onClick={() => {
                setEditDialogOpen(true);
                setEditEquipo(params.row);
              }}
            >
              <Edit color="primary" />
            </IconButton>
            <IconButton
              title="Mostrar detalles"
              onClick={() => {
                setDetailsDialogOpen(true);
                setDetailsData(params.row);
              }}
            >
              <ZoomInIcon color="primary" />
            </IconButton>
            <IconButton
              title="Hoja de Vida"
              onClick={() => {
                setHDVid(params.row.hoja_de_vida);
                setDialogHDVOpen(true);
              }}
            >
              <AutoStoriesIcon color="primary" />
            </IconButton>
            <IconButton
              title="Eliminar Equipo"
              onClick={() => {
                setDeleteEquipo(params.row);
                setDialogDeleteOpen(true);
              }}
            >
              <DeleteIcon color="primary" />
            </IconButton>
          </Grid>
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
        return calculatePrioridad(params.row);
      },
    },
    // {
    //   field: "action1",
    //   type: "actions",
    //   headerName: "Detalles",
    //   minWidth: 70,
    //   flex: 1,
    //   headerAlign: "left",
    //   align: "left",
    //   getActions: (params) => [
    //     <>
    //       <IconButton
    //         title="Mostrar detalles"
    //         onClick={() => {
    //           setDetailsDialogOpen(true);
    //           setDetailsData(params.row);
    //         }}
    //       >
    //         <ZoomInIcon />
    //       </IconButton>
    //     </>,
    //   ],
    // },
    // {
    //   field: "action",
    //   type: "actions",
    //   headerName: "Hoja de vida",
    //   minWidth: 70,
    //   flex: 1,
    //   headerAlign: "left",
    //   align: "left",
    //   getActions: (params) => [
    //     <>
    //       <Button
    //         onClick={() => {
    //           setHDVid(params.row.hoja_de_vida);
    //           setDialogHDVOpen(true);
    //         }}
    //       >
    //         <AutoStoriesIcon />
    //       </Button>
    //     </>,
    //   ],
    // },
  ];

  const handlePopoverOpen = (event) => {
    const dataCell = event.target.textContent;
    if (!dataCell) {
      return;
    }
    setValue(dataCell);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {/* Tabla */}
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          loading={loading || reload}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          autoHeight
          {...rows}
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns
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
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          pagination
          disableSelectionOnClick
          components={{ Toolbar: CustomToolBar }}
          componentsProps={{
            cell: {
              onMouseEnter: handlePopoverOpen,
              onMouseLeave: handlePopoverClose,
            },
          }}
          sx={{
            boxShadow: 2,
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
            backgroundColor: "white",
          }}
        />
        <Popover
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>{`${value}`}</Typography>
        </Popover>
      </Box>
      {/* Dialogs */}
      <CustomizedDialogs
        modalTitle="Registro de Equipo"
        dialogOpen={addDialogOpen}
        setDialogOpen={setAddDialogOpen}
      >
        <AMEquipo
          setDialogOpen={setAddDialogOpen}
          submitButtonText="Registrar"
          setReload={setReload}
          setSnackbarSeverity={setSnackbarSeverity}
          setSnackbarText={setSnackbarText}
          setOpenSnackbar={setOpenSnackbar}
        />
      </CustomizedDialogs>
      <CustomizedDialogs
        modalTitle="Detalles"
        dialogOpen={detailsDialogOpen}
        setDialogOpen={setDetailsDialogOpen}
      >
        <EquipoDetails data={detailsData} />
      </CustomizedDialogs>
      <DialogHDV
        id={HDVid}
        dialogOpen={dialogHDV}
        setDialogOpen={setDialogHDVOpen}
        setSnackbarSeverity={setSnackbarSeverity}
        setSnackbarText={setSnackbarText}
        setOpenSnackbar={setOpenSnackbar}
      ></DialogHDV>
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
          setSnackbarSeverity={setSnackbarSeverity}
          setSnackbarText={setSnackbarText}
          setOpenSnackbar={setOpenSnackbar}
        />
      </CustomizedDialogs>
      <CustomizedDialogs
        modalTitle="Eliminación de equipo"
        dialogOpen={dialogDeleteOpen}
        setDialogOpen={setDialogDeleteOpen}
      >
        <BEquipo
          deleteEquipoData={deleteEquipo}
          setDialogOpen={setDialogDeleteOpen}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarText={setSnackbarText}
          setSnackbarSeverity={setSnackbarSeverity}
          setReload={setReload}
        />
      </CustomizedDialogs>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </>
  );
}
