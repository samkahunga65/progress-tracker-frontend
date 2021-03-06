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
import { login, goals_for_user1, goals_for_user } from "./urls";
import { CTX } from "../Store";
import { Redirect } from "react-router-dom";

function Copyright() {
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

export default function SignIn() {
  const [state, dispatch] = useContext(CTX);
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [logedIn, setLogedIn] = useState(false);
  const [logedInrnow, setLogedInrnow] = useState(false);

  const Login = () => {
    login(username, password, function (result) {
      goals_for_user1(result.data.user.id, result.data.token, function (
        response
      ) {
        if (response.status === 200) {
          dispatch({ type: "Authenticated" });
          dispatch({
            type: "ADD_USER",
            payload: {
              data: { user: result.data.user, token: result.data.token },
            },
          });
          dispatch({
            type: "ADD_GOALS",
            payload: response.data,
          });
          setLogedIn(true);
        }
      });
      if (result.hasOwnProperty("data")) {
        dispatch({ type: "Authenticated" });
        dispatch({ type: "ADD_USER", payload: result });
        setLogedIn(true);
        setLogedInrnow(true);
        if (remember) {
          let use = JSON.stringify(result.data.user);
          localStorage.setItem("token", result.data.token);
          sessionStorage.setItem("token", result.data.token);
          localStorage.setItem("user", use);
          sessionStorage.setItem("user", use);
        } else {
          sessionStorage.setItem("token", result.data.token);
        }
      }
      console.log({ state });
    });
  };
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      //pass
    } else {
      let use = JSON.parse(localStorage.getItem("user"));
      let token = localStorage.getItem("token");
      if (logedInrnow) {
        token = state.user.token;
        use = state.user.user;
      }

      goals_for_user(use.id, function (response) {
        if (response.status === 200) {
          dispatch({ type: "Authenticated" });
          dispatch({
            type: "ADD_USER",
            payload: { data: { user: use, token } },
          });
          dispatch({
            type: "ADD_GOALS",
            payload: response.data,
          });
          setLogedIn(true);
        }
      });
    }
  }, [state]);

  return (
    <div
      className="marzia"
      style={{
        height: "100vh",
        backgroundColor: "#d3c2c9",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        style={{
          marginTop: "10vh",
          bottom: "0",
        }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              onClick={(e) => {
                e.preventDefault();
                setRemember(true);
              }}
              label="Remember me"
            />
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                Login();
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
        {logedIn ? <Redirect push to="/dashboard" /> : null}
      </Container>
    </div>
  );
}
