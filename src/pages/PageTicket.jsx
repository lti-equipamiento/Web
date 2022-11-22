import React, { useEffect, useState } from "react";
import {
  DataGrid,
  esES,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Typography, FormControlLabel, Button, Box } from "@mui/material";
import { Edit } from "@mui/icons-material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { getTickets, getUsuarioNombreRol } from "../grapqhql/Queries";
import { useQuery } from "@apollo/client";
import AMTicket from "../components/ticket/AMTicket";
import AMantenimiento from "../components/mantenimiento/AMantenimiento";
import CustomizedDialogs from "../components/dialogs/Dialog";
import Popover from "@mui/material/Popover";
import Switch from "@mui/material/Switch";
import { useAuth0 } from "@auth0/auth0-react";

export default function PageTicket() {
  //auth0
  const { user } = useAuth0();
  //queries
  const ticket = getTickets();
  const userTicket = getUsuarioNombreRol();
  // tabla
  const { loading, data, refetch } = useQuery(ticket);
  const { loading: loadingUser, data: dataUser } = useQuery(userTicket, {
    variables: { id: user.sub },
  });
  const [pageSize, setPageSize] = useState(5);
  const [reload, setReload] = useState(false);
  const [rows, setRows] = useState([]);

  // modificacion de ticket
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modTicket, setModTicket] = useState([]);

  // registro de ticket
  const [dialogAddOpen, setDialogAddOpen] = useState(false);

  // mantenimiento de ticket
  const [dialogMantOpen, setDialogMantOpen] = useState(false);
  const [mant, setMant] = useState([]);
  const [hide, setHide] = useState(false);

  //PopOver
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");

  //Filter asignados
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reload) {
      refetch();
      setReload(false);
    }
  }, [refetch, reload]);

  useEffect(() => {
    if (data && dataUser) {
      let data_rol = data.data_ticket;

      if (
        dataUser.data_usuario_by_pk.rol === "mantenimiento" ||
        dataUser.data_usuario_by_pk.rol === "normal"
      ) {
        setHide(true);
      }

      // if ( //Si se muestran solo los propios, no saben si ya esta reportado o no un equipo
      //   dataUser.data_usuario_by_pk.rol === "mantenimiento" ||
      //   dataUser.data_usuario_by_pk.rol === "normal"
      // ) {
      //   data_rol = data_rol.filter(
      //     (d) => d.usuario === user.sub || d.asignado === user.sub
      //   );
      // }
      if (!show) {
        const filtered_data = data_rol.filter((d) => d.asignado === null);
        setRows(filtered_data);
      } else {
        const filtered_data = data_rol;
        setRows(filtered_data);
      }
    }
  }, [data, loading, show, loadingUser]);

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
          label="Mostrar ya asignados"
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
        <div>
          <Button onClick={() => setDialogAddOpen(true)}>
            <PostAddIcon />
          </Button>
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
          <Button
            title="Modificar ticket"
            onClick={() => {
              setDialogOpen(true);
              setModTicket(params.row);
            }}
          >
            <Edit color="primary" />
          </Button>
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
            onClick={() => {
              setDialogMantOpen(true);
              setMant(params.row);
            }}
          >
            Asignar
          </Button>
        </>,
      ],
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
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          pagination
          disableSelectionOnClick
          columnVisibilityModel={{ Asignar: !hide }}
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
        modalTitle="Asignar ticket"
        dialogOpen={dialogMantOpen}
        setDialogOpen={setDialogMantOpen}
      >
        <AMantenimiento
          setDialogMantOpen={setDialogMantOpen}
          setReload={setReload}
          ticket={mant}
          submitButtonText="Asignar"
        />
      </CustomizedDialogs>
      <CustomizedDialogs
        modalTitle="Edición de Ticket"
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      >
        <AMTicket
          setDialogOpen={setDialogOpen}
          setReload={setReload}
          ticket={modTicket}
          submitButtonText="Editar"
        />
      </CustomizedDialogs>
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
    </>
  );
}
