import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "20/10/2022",
    "Desfibrilador (55f21cmfw4) ",
    "Juana",
    "4",
    0
  ),
  createData(
    1,
    "21/10/2022",
    "Bomba 2 (v16126uxzsf)",
    "Nicolas",
    "12",
    1.813
  ),
  createData(
    2,
    "22/10/2022",
    "Respirador (cxb21eq12a1)",
    "Juana",
    "7",
    2.022
  ),
 
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Mantenimientos recientes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha de cierre mantenimiento</TableCell>
            <TableCell>Equipo</TableCell>
            <TableCell>Tecnico</TableCell>
            <TableCell>Ticket</TableCell>
            <TableCell align="right">Costo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Ver mas mantenimientos
      </Link>
    </React.Fragment>
  );
}
