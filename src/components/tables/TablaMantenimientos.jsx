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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { useQuery } from "@apollo/client";
import { getMantenimientos } from "../../grapqhql/Queries";
import CustomizedDialogs from "../dialogs/dialog";
import MMantenimiento from "../MMantenimiento";
import { Edit } from "@mui/icons-material";
import Button from "@mui/material/Button";

const mantenimientos = getMantenimientos();

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
    id: "equipo",
    label: "Equipo",
  },
  {
    id: "prioridad",
    label: "Prioridad",
  },
  {
    id: "usuario",
    label: "Usuario",
  },
  {
    id: "fecha_ingreso",
    label: "Fecha ingreso",
  },
  {
    id: "fecha_egreso",
    label: "Fecha egreso",
  },
  {
    id: "costo",
    label: "Costo",
  },
  {
    id: "estado",
    label: "Estado",
  },
  {
    id: "procedimiento",
    label: "Procedimiento",
  },
  {
    id: "piezas",
    label: "Piezas",
  },
  {
    id: "resultado",
    label: "Resultado",
  },
  {
    id: "tiempo_empleado",
    label: "Tiempo empleado",
  },
  {
    id: "ticket",
    label: "Ticket",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>Editar</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
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
  const [dialogOpen, setDialogOpen] = useState(false);
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
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Mantenimientos
      </Typography>

      {numSelected > 0 ? (
        <Tooltip title="Eliminar mantenimiento">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip>
          <></>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TablaMantenimientos() {
  const [reload, setReload] = useState(false);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("prioridad");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMantenimiento, setEditMantenimiento] = useState([]);
  const { loading, data, refetch } = useQuery(mantenimientos);
  const [rows, setRows] = useState([]);

  const cargando = useMemo(() => {
    if (loading) {
      return true;
    }
    return false;
  }, [loading]);

  const getMant = () => {
    let temp = [];
    data.data_mantenimiento.forEach((da) => {
      if (!da.equipo) {
        da["equipo"] = da.ticketByTicket.equipoByEquipo.id;
      }
      temp.push(da);
    });

    return initSelect(temp);
  };

  const initSelect = (datos) => {
    return datos.map((da) => ({
      ...da,
      prioridad: ~~(
        (da.equipoByEquipo.prioridad +
          da.equipoByEquipo.ubicacionByUbicacionServicio.servicioByServicio
            .prioridad) /
        2
      ),
    }));
  };

  useEffect(() => {
    if (data) {
      setRows(getMant());
    }
  }, [data]);

  useEffect(() => {
    if (reload) {
      setReload(false);
      refetch();
    }
  }, [reload]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.ticket);
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
  const handleEdit = (equipo) => {
    handleClickOpenDialog();
    setEditMantenimiento(equipo);
  };
  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleChangePage = (event, newPage) => {
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
        <EnhancedTableToolbar
          numSelected={selected.length}
          setReload={setReload}
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
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.ticket);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.ticket}
                      selected={isItemSelected}
                    >
                      <TableCell>
                        <Button
                          title="Modificar mantenimiento"
                          onClick={() => handleEdit(row)}
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
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.equipoByEquipo.nombre +
                          " (" +
                          row.equipoByEquipo.n_serie +
                          ")"}
                      </TableCell>
                      {(() => {
                        if (row.prioridad === 1) {
                          return <TableCell align="left">Baja</TableCell>;
                        } else if (row.prioridad === 2) {
                          return <TableCell align="left">Media</TableCell>;
                        } else {
                          return <TableCell align="left">Alta</TableCell>;
                        }
                      })()}
                      <TableCell align="left">
                        {row.usuarioByUsuario.nombre}
                      </TableCell>
                      <TableCell align="left">{row.fecha_ingreso}</TableCell>
                      <TableCell align="left">{row.fecha_egreso}</TableCell>
                      <TableCell align="left">{row.costo}</TableCell>
                      <TableCell align="left">{row.estado}</TableCell>
                      <TableCell align="left">{row.procedimiento}</TableCell>
                      <TableCell align="left">{row.piezas}</TableCell>
                      <TableCell align="left">{row.resultado}</TableCell>
                      <TableCell align="left">{row.tiempo_empleado}</TableCell>
                      <TableCell align="left">{row.ticket}</TableCell>
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
