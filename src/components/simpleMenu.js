import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import { CTX } from "../Store";
import { logout } from "./urls";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, dispatch] = useContext(CTX);
  let history = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          color: "white",
        }}
      >
        Menu
      </Button>
      {!state.authenticated ? (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              history.push("/signup");
            }}
          >
            sign up
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              history.push("/signin");
            }}
          >
            sign in
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              logout((res) => {
                dispatch({ type: "DEL" });
                localStorage.clear();
                history.push("/signup");
              });
            }}
          >
            logout
          </MenuItem>
        </Menu>
      )}
    </div>
  );
}
