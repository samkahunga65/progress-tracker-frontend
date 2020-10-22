import React, { useContext } from "react";
import Menu from "./simpleMenu";
import Add from "./Add";
import { useHistory } from "react-router-dom";
import { CTX } from "../Store";
function Navbar() {
  const [state, dispatch] = useContext(CTX);
  let history = useHistory();
  return (
    <div
      className="Navbar"
      style={{
        backgroundColor: "#2f4850",
        color: "white",
        position: "fixed",
        width: "100vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        top: "0",
      }}
    >
      <div className="add_Button">
        <Add />
      </div>
      <div className="logo">
        <h1
          onClick={() => {
            dispatch({ type: "REMOVE_TRACKER" });
            history.push("/dashboard");
          }}
        >
          My Progress
        </h1>
      </div>
      <div className="dropdown">
        <Menu />
      </div>
    </div>
  );
}

export default Navbar;
