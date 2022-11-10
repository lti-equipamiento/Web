import { useLazyQuery, useQuery } from "@apollo/client";
import { Edit } from "@mui/icons-material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  DataGrid,
  esES,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { getEquipos, getHojaDeVida } from "../grapqhql/Queries";
import AMEquipo from "../components/equipo/AMEquipo";
import HDVContext from "../context/HDVContext";
import CustomizedDialogs from "../components/dialogs/dialog";
import DialogHDV from "../components/dialogs/DialogHDV";
import EquipoDetails from "../components/equipo/EquipoDetails";

const equipo = getEquipos();

export default function PageEquipo() {
  // Tabla
  const [pageSize, setPageSize] = React.useState(5);
  const { loading, data, refetch } = useQuery(equipo);
  const [reload, setReload] = useState(false);
  const [rows, setRows] = useState([]);

  // Agregar equipo
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // Edit equipo
  const [editEquipo, setEditEquipo] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Hoja de vida
  const [hoja, setHoja] = useState([]);
  const [dialogHDV, setDialogHDVOpen] = useState(false);
  const [HDVid, setHDVid] = useState(0);
  const [getHDV, { data: dataHDV }] = useLazyQuery(getHojaDeVida(HDVid));

  // Detalles de equipo
  const [detailsData, setDetailsData] = useState([]);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // useEffect Tabla
  useEffect(() => {
    if (reload) {
      refetch();
      setReload(false);
    }
  }, [reload, refetch]);

  useEffect(() => {
    if (!loading && data) {
      setRows(data.data_equipo);
    }
  }, [data, loading]);

  // useEffect HDV
  useEffect(() => {
    if (dataHDV) {
      setHoja(dataHDV.data_hoja_de_vida_by_pk);
    }
  }, [dataHDV]);

  function CustomToolBar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: "right" }}>
        <GridToolbarExport />
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button
            onClick={() => {
              setAddDialogOpen(true);
            }}
          >
            <AddBoxIcon />
          </Button>
        </div>
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
      headerName: "Modificar",
      minWidth: 70,
      flex: 1,
      headerAlign: "left",
      align: "left",
      getActions: (params) => [
        <>
          <Button
            title="Modificar equipo"
            onClick={() => {
              setEditDialogOpen(true);
              setEditEquipo(params.row);
            }}
          >
            <Edit color="primary" />
          </Button>
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
    {
      field: "action1",
      type: "actions",
      headerName: "Detalles",
      minWidth: 70,
      flex: 1,
      headerAlign: "left",
      align: "left",
      getActions: (params) => [
        <>
          <Button
            title="Mostrar detalles"
            onClick={() => {
              setDetailsDialogOpen(true);
              setDetailsData(params.row);
            }}
          >
            ...
          </Button>
        </>,
      ],
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
          <Button
            onClick={() => {
              setHDVid(params.row.hoja_de_vida);
              getHDV();
              setDialogHDVOpen(true);
            }}
          >
            <AutoStoriesIcon />
          </Button>
        </>,
      ],
    },
  ];

  return (
    <>
      {/* Tabla */}
      <Box sx={{ height: 400, width: "100%" }}>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Equipos
        </Typography>
        <DataGrid
          loading={loading}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          autoHeight
          {...rows}
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
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
        />
      </CustomizedDialogs>
      <CustomizedDialogs
        modalTitle="Detalles"
        dialogOpen={detailsDialogOpen}
        setDialogOpen={setDetailsDialogOpen}
      >
        <EquipoDetails data={detailsData} />
      </CustomizedDialogs>
      <HDVContext>
        <DialogHDV
          dialogOpen={dialogHDV}
          setDialogOpen={setDialogHDVOpen}
          datos={hoja}
        ></DialogHDV>
      </HDVContext>
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
    </>
  );
}
