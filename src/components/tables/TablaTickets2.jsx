import React, { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { getTickets } from "../../grapqhql/Queries";
import { useQuery } from "@apollo/client";
import AMTicket from "../AMTicket";
import AMantenimiento from "../AMantenimiento";
import Button from "@mui/material/Button";
import CustomizedDialogs from "../dialogs/dialog";
import { Edit } from "@mui/icons-material";

const ticket = getTickets();



export default function TablaTickets2() {
    const [pageSize, setPageSize] = React.useState(5);
    const { loading, data, refetch } = useQuery(ticket);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editTicket, setEditTicket] = useState([]);
    const [reload, setReload] = useState(false);

    const [dialogMantOpen, setDialogMantOpen] = useState(false);


    const handleEdit = (ticket) => {
      setDialogOpen(true);
      setEditTicket(ticket);
    };
    const handleMantAssign = (ticket) => {
      setDialogMantOpen(true);
      setEditTicket(ticket);
    };
    const columns = [
      {
        field: "id",
        headerName: "Nº Ticket",
        minWidth: 100,
        flex: 1,
        editable: true,
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
                title="Modificar ticket"
                onClick={() => handleEdit(params.row)}
              >
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
              ticket={editTicket}
             submitButtonText="Editar"
            />
          </CustomizedDialogs>
        </>,
        ],
      },
      {
        field: "equipo",
        headerName: "Equipo",
        minWidth: 100,
        flex: 1,
        editable: true,
        headerAlign: "left",
        align: "left",
        valueGetter: (params) =>{
          return params.row.equipoByEquipo.nombre
       }
      },
      { 
        field: "servicio",
        headerName: "Servicio",
        minWidth: 100,
        flex: 1,
        editable: true,
        headerAlign: "left",
        align: "left",
        valueGetter: (params) =>{
          return params.row.equipoByEquipo.servicio
       }
      },
      {
        field: "ubicacion",
        headerName: "Ubicación",
        minWidth: 100,
        flex: 1,
        editable: true,
        headerAlign: "left",
        align: "left",
        valueGetter: (params) =>{
          return params.row.equipoByEquipo.ubicacion
       }
      },
      {
        field: "nombre",
        headerName: "Usuario",
        minWidth: 100,
        flex: 1,
        editable: true,
        headerAlign: "left",
        align: "left",
        valueGetter: (params) =>{
          return params.row.usuarioByUsuario.nombre
       }
      },
      {
        field: "tipo",
        headerName: "Tipo",
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
        valueGetter: (params) =>{
              let result =
              ~~(
                (params.row.equipoByEquipo.prioridad +
                  params.row.equipoByEquipo.ubicacionByUbicacionServicio
                    .servicioByServicio.prioridad) /
                2
              )
              return result
  
           }
          }, 
        {
          field: "fecha",
          headerName: "Fecha",
          minWidth: 70,
          flex: 1,
          editable: true,
          headerAlign: "left",
          align: "left",
        },
        {
          field: "descripcion",
          headerName: "Descripción",
          minWidth: 70,
          flex: 1,
          editable: true,
          headerAlign: "left",
          align: "left",
        }, {
          field: "asignar",
          headerName: "Asignar",
          minWidth: 70,
          flex: 1,
          editable: true,
          headerAlign: "left",
          align: "left",
        }/* ,{
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
              title="Asignar ticket"
              onClick={() => handleMantAssign(params.row)}
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
              ticket={editTicket}
              submitButtonText="Asignar"
            />
          </CustomizedDialogs>
        </>,
        ],
      } */
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
          Test
        </Typography>
        <DataGrid 
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={data.data_ticket}
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