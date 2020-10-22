import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CTX } from "../Store";

function Home() {
  let [state, dispatch] = useContext(CTX);
  let history = useHistory();
  useEffect(() => {
    if (!state.authorised) {
      history.push("/signin");
    }
  }, []);
  return <div className="home"></div>;
}

export default Home;
