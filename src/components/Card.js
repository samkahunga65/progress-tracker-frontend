import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { add_tracker } from "./urls";
import swal from "sweetalert";
import { useState } from "react";
import { useEffect } from "react";
import { CTX } from "../Store";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function Kard({ props }) {
  const classes = useStyles();
  const [ratio, setRatio] = useState("");
  const [state, dispatch] = useContext(CTX);
  let history = useHistory();
  const addTracker = (id) => {
    swal("add short notes about your experience", {
      content: "input",
    }).then((value) => {
      add_tracker(value, id, function (response) {
        if (response.status === 200) {
          swal({
            title: "Good job!",
            text: "You updated your goal for today!",
            icon: "success",
          });
          dispatch({ type: "GO_AGAIN" });
        } else {
          swal({
            title: "There was an error!",
            icon: "error",
          });
        }
      });
    });
  };
  useEffect(() => {
    if (props.frequency) {
      let f = parseInt(props.frequency);
      let r = (props.trackers.length / f) * 100;
      if (r > 100) {
        r = 100;
      }
      setRatio((rr) => r);
      dispatch({ type: "SET_RATIO", payload: r });
    }
  }, []);
  const trackers = () => {
    dispatch({ type: "ADD_TRACKER", payload: props });
    history.push("/trackers");
  };
  return (
    <Card
      className={classes.root}
      style={{
        marginBottom: "10px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <CardActionArea>
        <CardContent onClick={trackers}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {ratio ? `${Math.round(ratio)} % done` : null}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.details}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {props.addTrack ? (
          <Button
            size="small"
            color="primary"
            style={{
              marginLeft: "auto",
            }}
            onClick={(e) => {
              e.preventDefault();
              console.log("pressed track");
              addTracker(props.id);
            }}
          >
            Track
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}
