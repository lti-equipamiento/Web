import React, { useEffect, useState } from "react";
import {
  DataGrid,
  esES,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Typography, Button, Box } from "@mui/material";
import { Edit } from "@mui/icons-material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { getTickets } from "../../grapqhql/Queries";
import { useQuery } from "@apollo/client";
import AMTicket from "../AMTicket";
import AMantenimiento from "../AMantenimiento";
import CustomizedDialogs from "../dialogs/dialog";

const ticket = getTickets();

export default function TablaTickets2() {
  const { loading, data, refetch } = useQuery(ticket);
  const [pageSize, setPageSize] = useState(5);
  const [reload, setReload] = useState(false);
  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAddOpen, setDialogAddOpen] = useState(false);
  const [dialogMantOpen, setDialogMantOpen] = useState(false);

  useEffect(() => {
    if (reload) {
      refetch();
      setReload(false);
    }
  }, [refetch, reload]);

  useEffect(() => {
    if (!loading && data) {
      setRows(data.data_ticket);
    }
  }, [data, loading]);

  function CustomToolBar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: "right" }}>
        <GridToolbarExport />
        <div>
          <Button onClick={() => setDialogAddOpen(true)}>
            <PostAddIcon />
          </Button>
          <CustomizedDialogs
            modalTitle="Registro de Ticket"
            dialogOpen={dialogAddOpen}
            setDialogOpen={setDialogAddOpen}
          >
            <AMTicket
              setDialogOpen={setDialogAddOpen}
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
          <Button title="Modificar ticket" onClick={() => setDialogOpen(true)}>
            <Edit color="primary" />
          </Button>
          <CustomizedDialogs
            modalTitle="Edición de Ticket"
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
          >
            <AMTicket
              setDialogOpen={setDialogOpen}
              setReload={setReload}
              ticket={params.row}
              submitButtonText="Editar"
            />
          </CustomizedDialogs>
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
    {
      field: "Asignar",
      type: "actions",
      headerName: "Asignar",
      minWidth: 70,
      flex: 1,
      headerAlign: "left",
      align: "left",
      getActions: (params) => [
        <>
          <Button
            title="Asignar ticket"
            onClick={() => setDialogMantOpen(true)}
          >
            Asignar
          </Button>
          <CustomizedDialogs
            modalTitle="Asignar ticket"
            dialogOpen={dialogMantOpen}
            setDialogOpen={setDialogMantOpen}
          >
            <AMantenimiento
              setDialogMantOpen={setDialogMantOpen}
              setReload={setReload}
              ticket={params.row}
              submitButtonText="Asignar"
            />
          </CustomizedDialogs>
        </>,
      ],
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h5"
        id="tableTitle"
        component="div"
      >
        Tickets
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
