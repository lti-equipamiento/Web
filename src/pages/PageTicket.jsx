import React, { useEffect, useState } from "react";
import {
  DataGrid,
  esES,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
  gridNumberComparator,
} from "@mui/x-data-grid";
import {
  Typography,
  FormControlLabel,
  Button,
  Box,
  Snackbar,
  Alert,
  IconButton,
  Grid,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { Edit } from "@mui/icons-material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { getTickets, getUsuarioNombreRol } from "../grapqhql/Queries";
import { useQuery } from "@apollo/client";
import AMTicket from "../components/ticket/AMTicket";
import AMantenimiento from "../components/mantenimiento/AMantenimiento";
import CustomizedDialogs from "../components/dialogs/Dialog";
import Popover from "@mui/material/Popover";
import Switch from "@mui/material/Switch";
import { useAuth0 } from "@auth0/auth0-react";
import BTicket from "../components/ticket/BTicket";
import clsx from "clsx";

export default function PageTicket() {
  //auth0
  const { user } = useAuth0();
  //queries
  const ticket = getTickets();
  const userTicket = getUsuarioNombreRol();
  // tabla
  const { loading, data, refetch } = useQuery(ticket);
  const { loading: loadingUser, data: dataUser } = useQuery(userTicket, {
    variables: { id: user.sub },
  });
  const [pageSize, setPageSize] = useState(10);
  const [reload, setReload] = useState(false);
  const [rows, setRows] = useState([]);

  // modificacion de ticket
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modTicket, setModTicket] = useState([]);

  // Eliminacion de ticket
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [deleteTicket, setDeleteTicket] = useState([]);

  // registro de ticket
  const [dialogAddOpen, setDialogAddOpen] = useState(false);

  // mantenimiento de ticket
  const [dialogMantOpen, setDialogMantOpen] = useState(false);
  const [mant, setMant] = useState([]);
  const [hide, setHide] = useState(false);

  //PopOver
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");

  //Filter asignados
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

  useEffect(() => {
    if (reload) {
      refetch();
      setReload(false);
    }
  }, [refetch, reload]);

  useEffect(() => {
    if (data && dataUser) {
      let data_rol = data.data_ticket;

      if (
        dataUser.data_usuario_by_pk.rol === "mantenimiento" ||
        dataUser.data_usuario_by_pk.rol === "normal"
      ) {
        setHide(true);
      }

      // if ( //Si se muestran solo los propios, no saben si ya esta reportado o no un equipo
      //   dataUser.data_usuario_by_pk.rol === "mantenimiento" ||
      //   dataUser.data_usuario_by_pk.rol === "normal"
      // ) {
      //   data_rol = data_rol.filter(
      //     (d) => d.usuario === user.sub || d.asignado === user.sub
      //   );
      // }
      if (!show) {
        const filtered_data = data_rol.filter((d) => d.asignado === null);
        setRows(filtered_data);
      } else {
        const filtered_data = data_rol;
        setRows(filtered_data);
      }
    }
  }, [data, loading, show, loadingUser]);

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
                  Tickets
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
                  label="Mostrar asignados"
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
                <IconButton onClick={() => setDialogAddOpen(true)}>
                  <PostAddIcon color="primary" />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={onRefresh}>
                  <RefreshIcon color="primary" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </GridToolbarContainer>
    );
  }

  const prioridadComparator = (v1, v2) => {
    const comparatorResult = gridNumberComparator(v1.result, v2.result);
    return comparatorResult;
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      getActions: (params) => [
        <>
          {params.row.asignado ? (
            <></>
          ) : (
            <Grid>
              <IconButton
                title="Modificar ticket"
                onClick={() => {
                  setDialogOpen(true);
                  setModTicket(params.row);
                }}
              >
                <Edit color="primary" />
              </IconButton>
              <IconButton
                title="Asignar ticket"
                onClick={() => {
                  setDialogMantOpen(true);
                  setMant(params.row);
                }}
              >
                <CallMadeIcon color="primary"></CallMadeIcon>
              </IconButton>
              <IconButton
                title="Eliminar Ticket"
                onClick={() => {
                  setDeleteTicket(params.row);
                  setDialogDeleteOpen(true);
                }}
              >
                <DeleteIcon color="primary" />
              </IconButton>
            </Grid>
          )}
        </>,
      ],
    },
    {
      field: "id",
      headerName: "Nº Ticket",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
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
        return params.row.equipoByEquipo.nombre;
      },
    },
    {
      field: "servicio",
      headerName: "Servicio",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
      valueGetter: (params) => {
        return params.row.equipoByEquipo.servicio;
      },
    },
    {
      field: "ubicacion",
      headerName: "Ubicación",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
      valueGetter: (params) => {
        return params.row.equipoByEquipo.ubicacion;
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
      field: "tipo",
      headerName: "Tipo",
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
      align: "center",
      sortComparator: prioridadComparator,
      valueGetter: (params) => ({
        result: ~~(
          (params.row.equipoByEquipo.prioridad +
            params.row.equipoByEquipo.ubicacionByUbicacionServicio
              .servicioByServicio.prioridad) /
          2
        ),
      }),
      valueFormatter: (params) => {
        if (params.value.result === 3) {
          return "Alta";
        }
        if (params.value.result === 2) {
          return "Media";
        }
        if (params.value.result === 1) {
          return "Baja";
        }
      },
      cellClassName: (params) => {
        return clsx("prioridad", {
          alta: params.value.result === 3,
          media: params.value.result === 2,
          baja: params.value.result === 1,
        });
      },
    },
    {
      field: "fecha",
      headerName: "Fecha",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      minWidth: 70,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
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
      <Box
        sx={{
          height: 400,
          width: "100%",

          "& .prioridad.baja": {
            backgroundColor: "rgba(157, 255, 118, 0.49)",
            color: "#252525",
            fontWeight: "600",
          },
          "& .prioridad.media": {
            backgroundColor: "#e6d928",
            color: "#252525",
            fontWeight: "600",
          },
          "& .prioridad.alta": {
            backgroundColor: "#d47483",
            color: "#252525",
            fontWeight: "600",
          },
        }}
      >
        <DataGrid
          loading={loading}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          autoHeight
          {...rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50, 100]}
          pagination
          disableSelectionOnClick
          initialState={{
            sorting: {
              sortModel: [{ field: "prioridad", sort: "desc" }],
            },
          }}
          columnVisibilityModel={{ Asignar: !hide }}
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
        modalTitle="Asignar ticket"
        dialogOpen={dialogMantOpen}
        setDialogOpen={setDialogMantOpen}
      >
        <AMantenimiento
          setDialogMantOpen={setDialogMantOpen}
          setReload={setReload}
          ticket={mant}
          submitButtonText="Asignar"
          setSnackbarSeverity={setSnackbarSeverity}
          setSnackbarText={setSnackbarText}
          setOpenSnackbar={setOpenSnackbar}
        />
      </CustomizedDialogs>
      <CustomizedDialogs
        modalTitle="Edición de Ticket"
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      >
        <AMTicket
          setDialogOpen={setDialogOpen}
          setReload={setReload}
          ticket={modTicket}
          submitButtonText="Editar"
          setSnackbarSeverity={setSnackbarSeverity}
          setSnackbarText={setSnackbarText}
          setOpenSnackbar={setOpenSnackbar}
        />
      </CustomizedDialogs>
      <CustomizedDialogs
        modalTitle="Registro de Ticket"
        dialogOpen={dialogAddOpen}
        setDialogOpen={setDialogAddOpen}
      >
        <AMTicket
          setDialogOpen={setDialogAddOpen}
          submitButtonText="Registrar"
          setReload={setReload}
          setSnackbarSeverity={setSnackbarSeverity}
          setSnackbarText={setSnackbarText}
          setOpenSnackbar={setOpenSnackbar}
        />
      </CustomizedDialogs>
      <CustomizedDialogs
        modalTitle="Eliminación de ticket"
        dialogOpen={dialogDeleteOpen}
        setDialogOpen={setDialogDeleteOpen}
      >
        <BTicket
          deleteTicketData={deleteTicket}
          setReload={setReload}
          setDialogOpen={setDialogDeleteOpen}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarText={setSnackbarText}
          setSnackbarSeverity={setSnackbarSeverity}
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
