import React, { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { getUsuarios } from "../../grapqhql/Queries";
import { useQuery } from "@apollo/client";

const usuario = getUsuarios();

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
  //   {
  //     field: "direccion",
  //     headerName: "Direccion",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
];

export default function TablaUsuarios2() {
  const [pageSize, setPageSize] = React.useState(5);
  const { loading, data, refetch } = useQuery(usuario);

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
        Usuarios
      </Typography>
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={data.data_usuario}
        autoHeight
        {...data.data_usuario}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
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
