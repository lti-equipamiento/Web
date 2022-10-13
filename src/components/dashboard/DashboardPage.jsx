import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import { LayoutContextProvider } from "../../layout/LayoutContext";

export default function Dashboard() {
  const { setHeaderTitle } = useContext(LayoutContextProvider);

  useEffect(() => {
    setHeaderTitle("Dashboard");
  }, [setHeaderTitle]);

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Deposits />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  );
}
