import React, { useEffect, useState } from "react";
import {
  DataGrid,
  esES,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Typography, Box, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { getUsuarios } from "../grapqhql/Queries";
import { useQuery } from "@apollo/client";
import CustomizedDialogs from "../components/dialogs/dialog";
import MUsuarioRol from "../components/usuario/MUsuarioRol";

const usuario = getUsuarios();

export default function PageUsuario() {
  // tabla
  const [pageSize, setPageSize] = useState(5);
  const { loading, data, refetch } = useQuery(usuario);
  const [reload, setReload] = useState(false);
  const [rows, setRows] = useState([]);

  // edicion rol
  const [user, setUser] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

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
      <GridToolbarContainer sx={{ justifyContent: "right" }}>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

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
            title="Modificar Rol"
            onClick={() => {
              setDialogOpen(true);
              setUser(params.row);
            }}
          >
            <Edit color="primary" />
          </Button>
        </>,
      ],
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Usuarios
        </Typography>
        <DataGrid
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
      <CustomizedDialogs
        modalTitle="Edición de Rol"
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      >
        <MUsuarioRol
          setDialogOpen={setDialogOpen}
          setReload={setReload}
          user={user}
        />
      </CustomizedDialogs>
    </>
  );
}
