import { Label } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      console.log(initialDailyData);

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  // const barChart = confirmed ? (
  //   <Bar
  //     data={{
  //       labels: ["Infected", "Recovered", "Deaths"],
  //       datasets: [
  //         {
  //           label: "People",
  //           backgroundColor: [
  //             "rgba(0, 0, 255, 0.5)",
  //             "rgba(0, 255, 0, 0.5)",
  //             "rgba(255, 0, 0, 0.5)",
  //           ],
  //           data: [confirmed.value, recovered.value, deaths.value],
  //         },
  //       ],
  //     }}
  //     options={{
  //       legend: { display: false },
  //       title: { display: true, text: `Current state in ${country}` },
  //     }}
  //   />
  // ) : null;

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "red",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "blue",
            backgroundColor: "yellow",
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  return (
    //<div className={styles.container}>{country ? barChart : lineChart}</div>
    //<h1>Hello world</h1>
    <div className={styles.container}> {country ? lineChart : null}</div>
  );
};

export default Chart;
