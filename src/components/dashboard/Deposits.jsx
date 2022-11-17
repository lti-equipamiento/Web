import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Costo total del mes hasta la fecha</Title>
      <Typography component="p" variant="h4">
        $3.835
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      08/08/2022
      </Typography>
      
    </React.Fragment>
  );
}
