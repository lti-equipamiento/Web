import { useQuery } from "@apollo/client";
import { Edit } from "@mui/icons-material";
import {
  Typography,
  FormControlLabel,
  Snackbar,
  Alert,
  Popover,
  Switch,
  Grid,
  IconButton,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Box from "@mui/material/Box";
import {
  DataGrid,
  esES,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, { useState, useEffect } from "react";
import { getMantenimientos, getUsuarioNombreRol } from "../grapqhql/Queries";
import CustomizedDialogs from "../components/dialogs/Dialog";
import MMantenimiento from "../components/mantenimiento/MMantenimiento";
import MantenimientoDetails from "../components/mantenimiento/MantenimientoDetails";
import { useAuth0 } from "@auth0/auth0-react";

export default function PageMantenimiento() {
  //auth0
  const { user } = useAuth0();
  //queries
  const mantenimientos = getMantenimientos();
  const userMant = getUsuarioNombreRol();
  // tabla
  const [pageSize, setPageSize] = useState(5);
  const { loading, data, refetch } = useQuery(mantenimientos, {
    fetchPolicy: "no-cache",
  });
  const { data: dataMant } = useQuery(userMant, {
    variables: { id: user.sub },
  });
  const [rows, setRows] = useState([]);
  const [reload, setReload] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");

  // Edit Mantenimiento
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMantenimiento, setEditMantenimiento] = useState([]);

  // Detalles de mantenimiento
  const [detailsData, setDetailsData] = useState([]);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  //Filter asignados
  const [show, setShow] = useState(false);

  // SnackBar
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

  useEffect(() => {
    if (reload) {
      refetch();
      setReload(false);
    }
  }, [reload, refetch]);

  useEffect(() => {
    if (data && dataMant) {
      let data_rol = data.data_mantenimiento;
      if (dataMant.data_usuario_by_pk.rol === "mantenimiento") {
        data_rol = data_rol.filter((d) => d.usuario === user.sub);
      }
      if (!show) {
        const filtered_data = data_rol.filter((d) => d.estado !== "Cerrado");
        setRows(filtered_data);
      } else {
        const filtered_data = data_rol;
        setRows(filtered_data);
      }
    }
  }, [data, dataMant, show, user.sub]);

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
                  Mantenimientos
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
              <Grid item xs={5}>
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
                  label="Mostrar realizados"
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

  const columns = [
    {
      field: "editar",
      type: "actions",
      headerName: "Acciones",
      minWidth: 70,
      flex: 1,
      headerAlign: "center",
      align: "center",
      getActions: (params) => [
        <>
          {params.row.estado === "Cerrado" ? (
            <></>
          ) : (
            <IconButton
              title="Modificar mantenimiento"
              onClick={() => {
                setDialogOpen(true);
                setEditMantenimiento(params.row);
              }}
            >
              <Edit color="primary" />
            </IconButton>
          )}

          <IconButton
            title="Mostrar detalles"
            onClick={() => {
              setDetailsDialogOpen(true);
              setDetailsData(params.row);
            }}
          >
            <ZoomInIcon color="primary" />
          </IconButton>
        </>,
      ],
    },
    {
      field: "equipo",
      headerName: "Equipo",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
      valueGetter: (params) => {
        return (
          params.row.equipoByEquipo.nombre +
          " (" +
          params.row.equipoByEquipo.n_serie +
          ")"
        );
      },
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
        let result = ~~(
          (params.row.equipoByEquipo.prioridad +
            params.row.equipoByEquipo.ubicacionByUbicacionServicio
              .servicioByServicio.prioridad) /
          2
        );
        return result;
      },
    },
    {
      field: "nombre",
      headerName: "Usuario",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
      valueGetter: (params) => {
        return params.row.usuarioByUsuario.nombre;
      },
    },
    {
      field: "fecha_ingreso",
      headerName: "Fecha de Ingreso",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "fecha_egreso",
      headerName: "Fecha de Egreso",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "costo",
      type: "number",
      headerName: "Costo",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "estado",
      headerName: "Estado",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "procedimiento",
      headerName: "Procedimiento",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "piezas",
      headerName: "Piezas",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "resultado",
      headerName: "Resultado",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "tiempo_empleado",
      headerName: "Tiempo empleado",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "ticket",
      headerName: "Ticket",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
  ];

  //On Hover
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
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          loading={loading}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          autoHeight
          {...rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
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
      <CustomizedDialogs
        modalTitle="Edición de mantenimiento"
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      >
        <MMantenimiento
          setDialogOpen={setDialogOpen}
          setReload={setReload}
          mant={editMantenimiento}
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
        <MantenimientoDetails data={detailsData} />
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
