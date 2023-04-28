import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Partidos", "Menções"],
  ["PS", 11],
  ["PSD", 2],
  ["IL", 2],
  ["CH", 2],
  ["PCP", 7],
];

export const options = {
  title: "Partidos Políticos",
  is3D: true,
};

export function PieChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"500px"}
    />
  );
}
