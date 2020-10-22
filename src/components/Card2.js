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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function Kard2({ props }) {
  const classes = useStyles();
  const [ratio, setRatio] = useState("");
  let year = props.doneday.split("-")[0];
  let month = props.doneday.split("-")[1];
  let day = props.doneday.split("-")[2].split("T")[0];
  var dt = new Date(`${year}-${month}-${day}`);
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dotw = week[dt.getDay()];

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
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.notes}
          </Typography>
          {/* <Typography gutterBottom variant="h5" component="h2">
            {ratio ? `${Math.round(ratio)} % done` : null}
          </Typography> */}
          <Typography variant="body2" color="textSecondary" component="p">
            {dotw}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button
          size="small"
          color="primary"
          style={{
            marginLeft: "auto",
          }}
          onClick={(e) => {
            e.preventDefault();
            console.log("pressed track");
            addTracker(props.props.id);
          }}
        >
          Track
        </Button>
      </CardActions> */}
    </Card>
  );
}
