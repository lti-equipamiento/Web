import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { getCostos } from "../../grapqhql/Queries";
import { useQuery } from "@apollo/client";
import moment from "moment/moment";

const chart = getCostos();

export default function ChartCosto(props) {
  const { year } = props;
  const [costoData, setCostoData] = useState([]);
  const anioFin = parseInt(year) + 1;
  const { data, refetch } = useQuery(chart, {
    variables: {
      fecha_inicio: `${year}/01/01`,
      fecha_fin: `${anioFin}/01/01`,
    },
  });

  var meses = [
    { nombre: "ene", costo: 0 },
    { nombre: "feb", costo: 0 },
    { nombre: "mar", costo: 0 },
    { nombre: "abr", costo: 0 },
    { nombre: "may", costo: 0 },
    { nombre: "jun", costo: 0 },
    { nombre: "jul", costo: 0 },
    { nombre: "ago", costo: 0 },
    { nombre: "sep", costo: 0 },
    { nombre: "oct", costo: 0 },
    { nombre: "nov", costo: 0 },
    { nombre: "dic", costo: 0 },
  ];

  useEffect(() => {
    if (data) {
      refetch();
      for (let d = 0; d < data.data_mantenimiento.length; d++) {
        meses[
          data.data_mantenimiento[d]["fecha_egreso"].split("-")[1] - 1
        ].costo += data.data_mantenimiento[d]["costo"];
      }
      setCostoData(meses);
    }
  }, [year, refetch, data]);

  return (
    <React.Fragment>
      <Title>Costos mensuales</Title>
      <ResponsiveContainer>
        <BarChart
          data={costoData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="costo" fill="#2fc7b8" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
