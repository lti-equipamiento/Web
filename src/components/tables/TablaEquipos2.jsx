import { useLazyQuery, useQuery } from "@apollo/client";
import { Edit } from "@mui/icons-material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import { getEquipos, getHojaDeVida } from "../../grapqhql/Queries";
import AMEquipo from "../AMEquipo";
import HDVContext from "../context/HDVContext";
import CustomizedDialogs from "../dialogs/dialog";
import DialogHDV from "../dialogs/DialogHDV";

const equipo = getEquipos();

export default function TablaEquipos2() {
  const [pageSize, setPageSize] = React.useState(5);
  const { loading, data, refetch } = useQuery(equipo);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
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

  const handleOpenHDV = (id) => {
    setHDVid(id);
    getHDV();
    setDialogHDVOpen(true);
  };

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
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "marca",
      headerName: "Marca",
      minWidth: 100,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "modelo",
      headerName: "Modelo",
      minWidth: 100,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "n_serie",
      headerName: "N_serie",
      minWidth: 100,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "n_activo_fijo",
      headerName: "N_activo_fijo",
      type: "number",
      minWidth: 100,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "garantia",
      headerName: "Garantia",
      minWidth: 70,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "servicio",
      headerName: "Servicio",
      minWidth: 70,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "ubicacion",
      headerName: "Ubicacion",
      minWidth: 70,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "estado_funcional",
      headerName: "Estado Funcional",
      minWidth: 70,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "estado_fisico",
      headerName: "Estado fisico",
      minWidth: 70,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "clasificacion_riesgo",
      headerName: "Clsificacion de riesgo",
      minWidth: 70,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Observaciones",
      headerName: "Observaciones",
      minWidth: 70,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "prioridad",
      headerName: "Prioridad",
      minWidth: 70,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
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
      </Typography>
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={data.data_equipo}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        // componentsProps={{
        //   toolbar: { showQuickFilter: true },
        // }}
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
