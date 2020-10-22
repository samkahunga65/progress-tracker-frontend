import React, { useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { Line, Doughnut } from "react-chartjs-2";
import { goals_for_user, trackers_for_goal } from "./urls";
import { CTX } from "../Store";

export default function SimplePaper() {
  const [chartData, setChartData] = useState({});
  const [goals, setGoals] = useState([]);
  const [once, setOnce] = useState(0);
  const [state, dispatch] = useContext(CTX);
  //
  const chart = (one) => {
    let uno = one;
    let dos = 100 - one;
    console.log({ one });
    setChartData({
      labels: ["done", "waiting"],
      datasets: [
        {
          label: "thiccness",
          data: [uno, dos],
          backgroundColor: ["rgba(30, 139, 195, 1)", " rgba(207, 0, 15, 1)"],
        },
      ],
    });
  };
  useEffect(() => {
    let r = state.ratio;
    chart(r);
  }, [state.ratio]);
  return (
    <div
      style={{
        marginBottom: "auto",
        paddingRight: "10px",
      }}
    >
      <Paper elevation={3}>
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
          }}
        />
      </Paper>
    </div>
  );
}
