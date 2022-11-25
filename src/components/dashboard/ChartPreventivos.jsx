import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { getMantCalibPrev } from "../../grapqhql/Queries";
import { useQuery } from "@apollo/client";

export default function ChartPreventivos(props) {
  const { year } = props;
  const [mantData, setMantData] = useState([]);
  const anioFin = parseInt(year) + 1;
  const { data, refetch } = useQuery(getMantCalibPrev(), {
    variables: {
      fecha_inicio: `${year}/01/01`,
      fecha_fin: `${anioFin}/01/01`,
    },
  });

  var meses = [
    { nombre: "ene", mantenimiento: 0, calibración: 0 },
    { nombre: "feb", mantenimiento: 0, calibración: 0 },
    { nombre: "mar", mantenimiento: 0, calibración: 0 },
    { nombre: "abr", mantenimiento: 0, calibración: 0 },
    { nombre: "may", mantenimiento: 0, calibración: 0 },
    { nombre: "jun", mantenimiento: 0, calibración: 0 },
    { nombre: "jul", mantenimiento: 0, calibración: 0 },
    { nombre: "ago", mantenimiento: 0, calibración: 0 },
    { nombre: "sep", mantenimiento: 0, calibración: 0 },
    { nombre: "oct", mantenimiento: 0, calibración: 0 },
    { nombre: "nov", mantenimiento: 0, calibración: 0 },
    { nombre: "dic", mantenimiento: 0, calibración: 0 },
  ];

  useEffect(() => {
    if (data) {
      refetch();
      for (let d = 0; d < data.data_hoja_de_vida.length; d++) {
        meses[
          data.data_hoja_de_vida[d]["prox_mant_prev"].split("-")[1] - 1
        ].mantenimiento += 1;
      }
      for (let d = 0; d < data.data_hoja_de_vida.length; d++) {
        meses[
          data.data_hoja_de_vida[d]["prox_calib_prev"].split("-")[1] - 1
        ].calibración += 1;
      }
      setMantData(meses);
    }
  }, [year, data, refetch]);

  return (
    <React.Fragment>
      <Title>Cantidad de mantenimientos por mes</Title>
      <ResponsiveContainer>
        <BarChart
          data={mantData}
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
          <Legend />
          <Tooltip />
          <Bar dataKey="mantenimiento" fill="#2fc7b8" />
          <Bar dataKey="calibración" fill="#2f8573" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
