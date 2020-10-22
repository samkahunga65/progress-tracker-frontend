import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CTX } from "../Store";
import { Redirect, useHistory } from "react-router-dom";
import { addGoal, goals_for_user } from "./urls";
import Swal from "sweetalert";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function Copyright() {
  let p;
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const dateChanger = (date) => {
  let day = date[2];
  let month = date[1];
  let year = date[3];
  let month1;
  if (month === "Jan") {
    month1 = 1;
  } else if (month === "Feb") {
    month1 = 2;
  } else if (month === "Mar") {
    month1 = 3;
  } else if (month === "Apr") {
    month1 = 4;
  } else if (month === "May") {
    month1 = 5;
  } else if (month === "Jun") {
    month1 = 6;
  } else if (month === "Jul") {
    month1 = 7;
  } else if (month === "Aug") {
    month1 = 8;
  } else if (month === "Sep") {
    month1 = 9;
  } else if (month === "Oct") {
    month1 = 10;
  } else if (month === "Nov") {
    month1 = 11;
  } else if (month === "Dec") {
    month1 = 12;
  }
  return `${year}-${month1}-${day} 12:00`;
};
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Goalz() {
  const [state, dispatch] = useContext(CTX);
  const classes = useStyles();
  let history = useHistory();
  const [GoalName, setGoalName] = useState("");
  const [Frequency, setFrequency] = useState("");
  const [details, setDetails] = useState("");
  const [description, setDescription] = useState(false);
  const [logedIn, setLogedIn] = useState(true);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedDate1, setSelectedDate1] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };
  const setGoal = () => {
    let from = dateChanger(selectedDate.toDateString().split(" "));
    let until = dateChanger(selectedDate1.toDateString().split(" "));
    console.log({ state });
    addGoal(
      state.user.user.id,
      GoalName,
      details,
      description,
      Frequency,
      from,
      until,
      function (res) {
        if (res.status === 200) {
          Swal({
            title: "Goal updated!",
            // text: "",
            icon: "success",
            // buttons: true,
            dangerMode: true,
          }).then((cont) => {
            if (cont) {
              history.push("/dashboard");
            }
          });
        } else {
          Swal({
            title: "there was an error, sorry",
            // text: "",
            icon: "error",
            // buttons: true,
            dangerMode: true,
          }).then((cont) => {
            if (cont) {
              goals_for_user(state.user.user.id, function (response) {
                if (response.status === 200) {
                  console.log({ response });
                  dispatch({
                    type: "ADD_GOALS",
                    payload: response.data,
                  });
                }
              });
              history.push("/dashboard");
            }
          });
        }
      }
    );
  };
  useEffect(() => {
    // Swal({
    //   title: "Goal updated!",
    //   // text: "",
    //   icon: "success",
    //   // buttons: true,
    //   dangerMode: true,
    // }).then((cont) => {
    //   if (cont) {
    //     history.push("/dashboard");
    //   }
    // });
  }, []);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            add goal
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(e) => {
                setGoalName(e.target.value);
              }}
              id="email"
              label="GoalName"
              name="GoalName"
              autoComplete="GoalName"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Frequency"
              label="Frequency"
              type="Frequency"
              id="Frequency"
              autoComplete="current-Frequency"
              onChange={(e) => {
                setFrequency(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="description"
              label="description"
              type="description"
              id="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="details"
              label="details"
              type="details"
              id="details"
              onChange={(e) => {
                setDetails(e.target.value);
              }}
            />
            {/* <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="starting on"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            /> */}
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="starting on"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="untill"
              format="MM/dd/yyyy"
              value={selectedDate1}
              onChange={handleDateChange1}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <Button
              // type="submit"

              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                console.log(selectedDate.toDateString().split(" "));
                setGoal();
              }}
            >
              add goal
            </Button>
          </form>
        </div>
        {logedIn ? null : <Redirect push to="/signin" />}
      </Container>
    </MuiPickersUtilsProvider>
  );
}
