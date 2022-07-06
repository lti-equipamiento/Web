import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { useQuery } from "@apollo/client";
import { getTickets } from "../../grapqhql/Queries";
import CustomizedDialogs from "../dialogs/dialog";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import AMTicket from "../AMTicket";
import AMantenimiento from "../AMantenimiento";
import { Edit } from "@mui/icons-material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ticket = getTickets();

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "n_ticket",
    label: "Nº Ticket",
  },
  {
    id: "equipo",
    label: "Equipo",
  },
  {
    id: "servicio",
    label: "Servicio",
  },
  {
    id: "ubicacion",
    label: "Ubicación",
  },
  {
    id: "usuario",
    label: "Usuario",
  },
  {
    id: "tipo",
    label: "Tipo",
  },
  {
    id: "prioridad",
    label: "Prioridad",
  },
  {
    id: "fecha",
    label: "Fecha",
  },
  {
    id: "descripcion",
    label: "Descripción",
  },
  {
    id: "asignar",
    label: "Asignar",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "seleccionar todos los tickets",
            }}
          />
        </TableCell>
        <TableCell>Editar</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, setReload } = props;
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} seleccionados
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Tickets
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Eliminar Ticket">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Registrar Ticket">
          <div>
            <Button onClick={handleClickOpenDialog}>
              <PersonAddAltRoundedIcon />
            </Button>
            <CustomizedDialogs
              modalTitle="Registro de Ticket"
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
            >
              <AMTicket
                setDialogOpen={setDialogOpen}
                submitButtonText="Registrar"
                setReload={setReload}
              />
            </CustomizedDialogs>
          </div>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TablaTickets() {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("tipo");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMantOpen, setDialogMantOpen] = useState(false);
  const [editTicket, setEditTicket] = useState([]);
  const [reload, setReload] = useState(false);
  const { loading, data, refetch } = useQuery(ticket);
  const [rows, setRows] = useState([]);

  const [copyList, setCopyList] = useState(rows);

  const cargando = useMemo(() => {
    if (loading) {
      return true;
    }
    return false;
  }, [loading]);

  useEffect(() => {
    if (data) {
      let temp = [];
      data.data_ticket.forEach((da) => temp.push(da));
      setRows(temp);
    }
  }, [data]);

  useEffect(() => {
    if (reload) {
      setReload(false);
      refetch();
    }
  }, [reload]);

  // const requestSearch = (searched) => {
  //   setCopyList(rows.filter((item) => item.mail.includes(searched)));
  // };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleEdit = (ticket) => {
    setDialogOpen(true);
    setEditTicket(ticket);
  };

  const handleMantAssign = (ticket) => {
    setDialogMantOpen(true);
    setEditTicket(ticket);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  if (cargando) {
    return "Cargando datos, por favor espere...";
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* <TextField
          variant="outlined"
          placeholder="search..."
          type="search"
          onInput={(e) => requestSearch(e.target.value)}
        />
        {copyList.length > 0 ? (rows = copyList) : rows} */}
        <EnhancedTableToolbar
          setReload={setReload}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          title="Modificar ticket"
                          onClick={() => handleEdit(row)}
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
                      </TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.equipoByEquipo.nombre}
                      </TableCell>
                      <TableCell align="center">
                        {row.equipoByEquipo.servicio}
                      </TableCell>
                      <TableCell align="center">
                        {row.equipoByEquipo.ubicacion}
                      </TableCell>
                      <TableCell align="center">
                        {row.usuarioByUsuario.nombre}
                      </TableCell>
                      <TableCell align="center">{row.tipo}</TableCell>
                      <TableCell label="prioridad" align="center">
                        {
                          ~~(
                            (row.equipoByEquipo.prioridad +
                              row.equipoByEquipo.ubicacionByUbicacionServicio
                                .servicioByServicio.prioridad) /
                            2
                          )
                        }
                      </TableCell>
                      <TableCell align="center">{row.fecha}</TableCell>
                      <TableCell align="center">{row.descripcion}</TableCell>
                      <TableCell align="center">
                        {row.hoja_de_vida}
                        <Button
                          title="Asignar ticket"
                          onClick={() => handleMantAssign(row)}
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
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelDisplayedRows={({ from, to, count }) => {
            return "" + from + "-" + to + " de " + count;
          }}
          labelRowsPerPage="Filas por página:"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
