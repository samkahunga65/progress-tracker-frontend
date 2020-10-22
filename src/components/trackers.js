import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Kard from "./Card2";
import Button from "@material-ui/core/Button";
import NativeSelects from "./select";
import { CTX } from "../Store";
import "../App.css";
function Trackers() {
  const [state, dispatch] = useContext(CTX);
  let props = state.tracker;

  let history = useHistory();
  console.log({ props });
  const goBack = () => {
    dispatch({ type: "REMOVE_TRACKER" });
    history.push("/dashboard");
  };
  return (
    <div className="trackers">
      <div className="div1">
        <h1>{props.name}</h1>
      </div>
      <div className="div2">
        <Button className="button1" onClick={goBack}>
          go back
        </Button>
      </div>
      <div className="div3">
        {props.trackers.map((tracker) => {
          return <Kard props={tracker} />;
        })}
      </div>
    </div>
  );
}

export default Trackers;
