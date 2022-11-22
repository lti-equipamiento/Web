import { useQuery } from "@apollo/client";
import { Edit } from "@mui/icons-material";
import { Typography, FormControlLabel, Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  DataGrid,
  esES,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { getMantenimientos, getUsuarioNombreRol } from "../grapqhql/Queries";
import CustomizedDialogs from "../components/dialogs/Dialog";
import MMantenimiento from "../components/mantenimiento/MMantenimiento";
import Popover from "@mui/material/Popover";
import Switch from "@mui/material/Switch";
import { useAuth0 } from "@auth0/auth0-react";

export default function PageMantenimiento() {
  //auth0
  const { user } = useAuth0();
  //queries
  const mantenimientos = getMantenimientos();
  const userMant = getUsuarioNombreRol();
  // tabla
  const [pageSize, setPageSize] = useState(5);
  const { loading, data, refetch } = useQuery(mantenimientos);
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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  //Filter asignados
  const [show, setShow] = useState(false);

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
      <GridToolbarContainer sx={{ justifyContent: "right" }}>
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
        <GridToolbarExport
          csvOptions={{ allColumns: true }}
          printOptions={{
            allColumns: true,
            hideFooter: true,
            hideToolbar: true,
            disableToolbarButton: true,
          }}
        />
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }

  const columns = [
    {
      field: "editar",
      type: "actions",
      headerName: "Modificar",
      minWidth: 70,
      flex: 1,
      headerAlign: "left",
      align: "left",
      getActions: (params) => [
        <>
          <Button
            title="Modificar mantenimiento"
            onClick={() => {
              setDialogOpen(true);
              setEditMantenimiento(params.row);
            }}
          >
            <Edit color="primary" />
          </Button>
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

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Mantenimientos
        </Typography>
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
