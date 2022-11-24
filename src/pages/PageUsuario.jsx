import React, { useEffect, useState } from "react";
import {
  DataGrid,
  esES,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import { getUsuarios } from "../grapqhql/Queries";
import { useQuery } from "@apollo/client";
import CustomizedDialogs from "../components/dialogs/Dialog";
import MUsuarioRol from "../components/usuario/MUsuarioRol";
import Popover from "@mui/material/Popover";
import BUsuario from "../components/usuario/BUsuario";

const usuario = getUsuarios();

export default function PageUsuario() {
  // tabla
  const [pageSize, setPageSize] = useState(5);
  const { loading, data, refetch } = useQuery(usuario, {
    fetchPolicy: "no-cache",
  });
  const [reload, setReload] = useState(false);
  const [rows, setRows] = useState([]);

  // edicion rol
  const [user, setUser] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Eliminacion de usuario
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState([]);

  //PopOver
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");

  //Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

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
    if (!loading && data) {
      setRows(data.data_usuario);
    }
  }, [data, loading]);

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
                  Usuarios
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
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      minWidth: 40,
      flex: 1,
      headerAlign: "center",
      align: "center",
      getActions: (params) => [
        <>
          <Grid>
            <IconButton
              title="Modificar Rol"
              onClick={() => {
                setDialogOpen(true);
                setUser(params.row);
              }}
            >
              <Edit color="primary" />
            </IconButton>
            <IconButton
              title="Eliminar Usuario"
              onClick={() => {
                setDialogDeleteOpen(true);
                setDeleteUser(params.row);
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
      field: "mail",
      headerName: "Mail",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "telefono",
      headerName: "Telefono",
      type: "number",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "direccion",
      headerName: "Direccion",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "cedula",
      headerName: "Cedula",
      type: "number",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "rol",
      headerName: "Rol",
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
        modalTitle="Edición de Rol"
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      >
        <MUsuarioRol
          setDialogOpen={setDialogOpen}
          setReload={setReload}
          user={user}
          setSnackbarSeverity={setSnackbarSeverity}
          setSnackbarText={setSnackbarText}
          setOpenSnackbar={setOpenSnackbar}
        />
      </CustomizedDialogs>
      <CustomizedDialogs
        modalTitle="Eliminación de usuario"
        dialogOpen={dialogDeleteOpen}
        setDialogOpen={setDialogDeleteOpen}
        setOpenSnackbar={setOpenSnackbar}
        setSnackbarText={setSnackbarText}
        setSnackbarSeverity={setSnackbarSeverity}
      >
        <BUsuario deleteUser={deleteUser} setDialogOpen={setDialogDeleteOpen} />
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
