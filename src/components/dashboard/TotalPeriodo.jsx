import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { getCostos } from "../../grapqhql/Queries";
import { useQuery } from "@apollo/client";
import { Grid, IconButton, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function Deposits(props) {
  const { setYear, year } = props;
  const chart = getCostos();

  const [costoData, setCostoData] = useState(0);
  const [textFieldYear, setTextFieldYear] = useState(2022);
  const { data } = useQuery(chart, {
    variables: { fecha_inicio: "2022/01/01", fecha_fin: "2023/01/01" },
  });

  useEffect(() => {
    if (data) {
      let cost = 0;
      for (let d = 0; d < data.data_mantenimiento.length; d++) {
        cost += data.data_mantenimiento[d].costo;
      }
      setCostoData(cost);
    }
  }, [data]);
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <TextField
                fullWidth
                type="number"
                value={textFieldYear}
                label="Año"
                onChange={(e) => {
                  setTextFieldYear(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={() => {
                  setYear(textFieldYear);
                }}
              >
                <CheckIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Title>Costos totales de {year}</Title>
          <Typography component="p" variant="h4">
            {"$ " + costoData}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
