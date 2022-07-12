import React, { useState, useEffect, useMemo, useContext } from "react";
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
import { useQuery, useLazyQuery } from "@apollo/client";
import { getEquipos, getHojaDeVida } from "../../grapqhql/Queries";
import CustomizedDialogs from "../dialogs/dialog";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AMEquipo from "../AMEquipo";
import { Edit } from "@mui/icons-material";
import Button from "@mui/material/Button";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DialogHDV from "../dialogs/DialogHDV";
import {} from "../../grapqhql/Queries";
import HDVContext from "../context/HDVContext";

const equipo = getEquipos();

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
    id: "nombre",
    label: "Nombre",
  },
  {
    id: "marca",
    label: "Marca",
  },
  {
    id: "modelo",
    label: "Modelo",
  },
  {
    id: "n_serie",
    label: "N° Serie",
  },
  {
    id: "n_activo_fijo",
    label: "N° Activo fijo",
  },
  {
    id: "garantia",
    label: "Garantia",
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
    id: "estado_funcional",
    label: "Estado funcional",
  },
  {
    id: "estado_fisico",
    label: "Estado fisico",
  },
  {
    id: "clasificacion_riesgo",
    label: "Clasificación de riesgo",
  },
  {
    id: "Observaciones",
    label: "Observaciones",
  },
  {
    id: "prioridad",
    label: "Prioridad",
  },
  {
    id: "hoja_de_vida",
    label: "Hoja de vida",
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
              "aria-label": "seleccionar todos los equipos",
            }}
          />
        </TableCell>
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
          Equipos
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Eliminar Equipo">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Registrar Equipo">
          <div>
            <Button onClick={handleClickOpenDialog}>
              <AddBoxIcon />
            </Button>
            <CustomizedDialogs
              modalTitle="Registro de Equipo"
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
            >
              <AMEquipo
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

export default function TablaEquipos() {
  const [reload, setReload] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("n_serie");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogHDV, setDialogHDVOpen] = useState(false);
  const [editEquipo, setEditEquipo] = useState([]);
  const [hoja, setHoja] = useState([]);
  const [HDVid, setHDVid] = useState(0);
  const [getHDV, { data: dataHDV }] = useLazyQuery(getHojaDeVida(HDVid));
  const { loading, data, refetch } = useQuery(equipo);
  const [rows, setRows] = useState([]);

  const cargando = useMemo(() => {
    if (loading) {
      return true;
    }
    return false;
  }, [loading]);

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

  useEffect(() => {
    if (data) {
      let temp = [];
      data.data_equipo.forEach((da) => temp.push(da));
      setRows(temp);
    }
  }, [data]);

  const handleOpenHDV = (id) => {
    setHDVid(id);
    getHDV();
    setDialogHDVOpen(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.n_serie);
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
    setEditEquipo(equipo);
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
                  const isItemSelected = isSelected(row.n_serie);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.n_serie}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.n_serie)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          title="Modificar equipo"
                          onClick={() => handleEdit(row)}
                        >
                          <Edit color="primary" />
                        </Button>
                        <CustomizedDialogs
                          modalTitle="Edición de Equipo"
                          dialogOpen={dialogOpen}
                          setDialogOpen={setDialogOpen}
                        >
                          <AMEquipo
                            setDialogOpen={setDialogOpen}
                            setReload={setReload}
                            equipo={editEquipo}
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
                        {row.nombre}
                      </TableCell>
                      <TableCell align="left">{row.marca}</TableCell>
                      <TableCell align="left">{row.modelo}</TableCell>
                      <TableCell align="left">{row.n_serie}</TableCell>
                      <TableCell align="left">{row.n_activo_fijo}</TableCell>
                      <TableCell align="left">{row.garantia}</TableCell>
                      <TableCell align="left">{row.servicio}</TableCell>
                      <TableCell align="left">{row.ubicacion}</TableCell>
                      <TableCell align="left">{row.estado_funcional}</TableCell>
                      <TableCell align="left">{row.estado_fisico}</TableCell>
                      <TableCell align="left">
                        {row.clasificacion_riesgo}
                      </TableCell>
                      <TableCell align="left">{row.Observaciones}</TableCell>
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
                        <Button onClick={() => handleOpenHDV(row.hoja_de_vida)}>
                          <AutoStoriesIcon />
                        </Button>
                        <HDVContext>
                          <DialogHDV
                            dialogOpen={dialogHDV}
                            setDialogOpen={setDialogHDVOpen}
                            datos={hoja}
                          ></DialogHDV>
                        </HDVContext>
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
