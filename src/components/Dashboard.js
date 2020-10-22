import { Paper } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { CTX } from "../Store";
import Kard from "./Card";
import AddGoal from "./AddGoal";
import { goals_for_user, trackers_for_goal } from "./urls";
import SimplePaper from "./Paper";
function getWeekOfMonth(date) {
  const startWeekDayIndex = 1; // 1 MonthDay 0 Sundays
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDay = firstDate.getDay();

  let weekNumber = Math.ceil((date.getDate() + firstDay) / 7);
  if (startWeekDayIndex === 1) {
    if (date.getDay() === 0 && date.getDate() > 1) {
      weekNumber -= 1;
    }

    if (firstDate.getDate() === 1 && firstDay === 0 && date.getDate() > 1) {
      weekNumber += 1;
    }
  }
  return weekNumber;
}
function Dashboard() {
  const [state, dispatch] = useContext(CTX);
  const [goals, setGoals] = useState([]);
  const [gwt, setGwt] = useState([]);
  const [ro, setRo] = useState(0);

  let today = new Date();
  useEffect(() => {
    if (!state.user.hasOwnProperty("token")) {
      window.location.href = "/signin";
    } else {
      console.log({ state });
      if (state.goals.length > 0) {
        setGoals((goals) => state.goals);
      }
    }
  }, []);
  useState(() => {
    if (state.authenticated) {
      console.log("god up");
      goals_for_user(state.user.user.id, function (response) {
        if (response.status === 200) {
          console.log({ response });
          dispatch({
            type: "ADD_GOALS",
            payload: response.data,
          });
        }
      });

      //
    }
  }, [state.goAgain]);
  useEffect(() => {
    if (goals.length > 0) {
      goals.map((goal) => {
        trackers_for_goal(goal.id, (response) => {
          if (response.status === 200) {
            goal["trackers"] = response.data;

            setGwt((gwt) => [...gwt, goal]);
          }
        });
      });
    }
  }, [goals]);
  return (
    <div
      className="dashboard"
      style={{
        height: "90vh",
        display: "flex",
        position: "fixed",
        width: "100vw",
        backgroundColor: "#d3c2c9",
        bottom: "0",
      }}
    >
      <div
        className="todos"
        style={{
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          width: "50vw",
        }}
      >
        <h1
          style={{
            top: "0",
            height: "10vh",
            margin: "0",
            textAlign: "center",
          }}
        >
          Goals
        </h1>
        <div
          className="goals"
          style={{
            flexGrow: "1",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          {goals.length > 0 ? (
            <div>
              {gwt.map((goal) => {
                if (goal) {
                  let year = goal.endDate.split("-")[0];
                  let month = goal.endDate.split("-")[1];
                  let day = goal.endDate.split("-")[2].split("T")[0];
                  var dt = new Date(`${year}-${month}-${day}`);
                  if (goal.trackers.length > 0) {
                    let lt = goal.trackers[goal.trackers.length - 1].doneday;
                    let year1 = lt.split("-")[0];
                    let month1 = lt.split("-")[1];
                    let day1 = lt.split("-")[2].split("T")[0];
                    var dt1 = new Date(`${year1}-${month1}-${day1}`);

                    if (today.getTime() <= dt.getTime()) {
                      if (today.getTime() == dt1.getTime()) {
                        goal["addTrack"] = false;
                        return <Kard props={goal} />;
                      } else {
                        goal["addTrack"] = true;
                        return <Kard props={goal} />;
                      }
                    }
                  } else {
                    if (today.getTime() == dt.getTime()) {
                      goal["addTrack"] = true;
                      return <Kard props={goal} />;
                    }
                  }
                }
              })}
            </div>
          ) : (
            <h1>no goals</h1>
          )}
        </div>
      </div>
      <div
        className="overall"
        style={{
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <SimplePaper />
      </div>
    </div>
  );
}

export default Dashboard;
