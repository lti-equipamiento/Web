import React, { useState, useEffect } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import DialogShowMantenimiento from "../dialogs/DialogShowMantenimiento";

export default function TabMantenimiento(props) {
  const { mantenimientosData } = props;

  // tabla
  const [pageSize, setPageSize] = useState(5);

  // Dialog
  const [openShowMantDialog, setOpenShowMantDialog] = useState(false);
  const [dialogData, setDialogData] = useState([]);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (mantenimientosData) {
      setDialogData(mantenimientosData[0]);
    }
  }, [mantenimientosData]);

  const columns = [
    {
      field: "fecha_ingreso",
      headerName: "Fecha de ingreso",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "estado",
      headerName: "Estado",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "usuario",
      headerName: "Usuario",
      type: "number",
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
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      minWidth: 40,
      flex: 1,
      headerAlign: "center",
      align: "center",
      getActions: (params) => [
        <Grid>
          <Button
            title="Mostrar mantenimiento"
            onClick={() => {
              setOpenShowMantDialog(true);
              setDialogData(params.row);
              setNombre(params.row.usuarioByUsuario.nombre);
            }}
          >
            <ZoomInIcon color="primary" />
          </Button>
        </Grid>,
      ],
    },
  ];

  return (
    <>
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={mantenimientosData}
        autoHeight
        {...mantenimientosData}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
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
      <DialogShowMantenimiento
        dialogOpen={openShowMantDialog}
        setDialogOpen={setOpenShowMantDialog}
        datos={dialogData}
        nombre={nombre}
      />
    </>
  );
}
