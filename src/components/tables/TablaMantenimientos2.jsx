import React, { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { getMantenimientos } from "../../grapqhql/Queries";
import { useQuery } from "@apollo/client";
import MMantenimiento from "../MMantenimiento";
import Button from "@mui/material/Button";
import CustomizedDialogs from "../dialogs/dialog";
import { Edit } from "@mui/icons-material";

const mantenimientos = getMantenimientos();

export default function TablaMantenimientos2() {
    const [pageSize, setPageSize] = React.useState(5);
    const { loading, data, refetch } = useQuery(mantenimientos);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editMantenimiento, setEditMantenimiento] = useState([]);
    const [reload, setReload] = useState(false);

    const [dialogMantOpen, setDialogMantOpen] = useState(false);

    const handleEdit = (equipo) => {
        handleClickOpenDialog();
        setEditMantenimiento(equipo);
      };
      
      const handleClickOpenDialog = () => {
        setDialogOpen(true);
      };
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
                          onClick={() => handleEdit(params.row)}
                        >
                          <Edit color="primary" />
                        </Button>
                        <CustomizedDialogs
                          modalTitle="Edición de mantenimiento"
                          dialogOpen={dialogOpen}
                          setDialogOpen={setDialogOpen}
                        >
                          <MMantenimiento
                            setDialogOpen={setDialogOpen}
                            setReload={setReload}
                            mant={editMantenimiento}
                            submitButtonText="Editar"
                          />
              </CustomizedDialogs>
            </>,
            ],
          },{
            field: "equipo",
            headerName: "Equipo",
            minWidth: 100,
            flex: 1,
            editable: true,
            headerAlign: "left",
            align: "left",
            valueGetter: (params) =>{
              return params.row.equipoByEquipo.nombre +
              " (" +
              params.row.equipoByEquipo.n_serie +
              ")"
           }
          },  {
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
          }, {
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
          },{
            field: "fecha_ingreso",
            headerName: "Fecha de Ingreso",
            minWidth: 70,
            flex: 1,
            editable: true,
            headerAlign: "left",
            align: "left",
          },{
            field: "fecha_egreso",
            headerName: "Fecha de Egreso",
            minWidth: 70,
            flex: 1,
            editable: true,
            headerAlign: "left",
            align: "left",
          },{
            field: "costo",
            type: "number",
            headerName: "Costo",
            minWidth: 70,
            flex: 1,
            editable: true,
            headerAlign: "left",
            align: "left",
          },{
            field: "estado",
            headerName: "Estado",
            minWidth: 70,
            flex: 1,
            editable: true,
            headerAlign: "left",
            align: "left",
          },{
            field: "procedimiento",
            headerName: "Procedimiento",
            minWidth: 70,
            flex: 1,
            editable: true,
            headerAlign: "left",
            align: "left",
          },{
            field: "piezas",
            headerName: "Piezas",
            minWidth: 70,
            flex: 1,
            editable: true,
            headerAlign: "left",
            align: "left",
          },{
            field: "resultado",
            headerName: "Resultado",
            minWidth: 70,
            flex: 1,
            editable: true,
            headerAlign: "left",
            align: "left",
          },{
            field: "tiempo_empleado",
            headerName: "Tiempo empleado",
            minWidth: 70,
            flex: 1,
            editable: true,
            headerAlign: "left",
            align: "left",
          },{
            field: "ticket",
            headerName: "Ticket",
            minWidth: 70,
            flex: 1,
            editable: true,
            headerAlign: "left",
            align: "left",
          },

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
              Mantenimientos
            </Typography>
            <DataGrid 
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              rows={data.data_mantenimiento}
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