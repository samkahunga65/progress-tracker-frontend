import React, { createContext, useReducer } from "react";
export const CTX = createContext();

const initState = {
  authenticated: false,
  user: "",
  goals: [],
  trackers: [],
  goAgain: 0,
  tracker: null,
  ratio: 0,
};
let reducer = (state, action) => {
  switch (action.type) {
    case "SET_RATIO":
      let anc = (action.payload + state.ratio) / 2;
      console.log({ pp: action.payload, r: state.ratio });
      console.log(anc);
      return {
        ...state,
        ratio: anc,
      };
    case "DEL":
      return {
        authenticated: false,
        user: "",
        goals: [],
        trackers: [],
        goAgain: 0,
        tracker: null,
        ratio: 0,
      };
    case "REMOVE_TRACKER":
      return {
        ...state,
        tracker: null,
      };
    case "ADD_TRACKER":
      return {
        ...state,
        tracker: action.payload,
      };
    case "GO_AGAIN":
      console.log("went again");
      console.log(state.goAgain + 1);
      return {
        ...state,
        goAgain: state.goAgain + 1,
      };
    case "Authenticated":
      return {
        ...state,
        authenticated: true,
      };
    case "ADD_USER":
      return {
        ...state,
        user: action.payload.data,
      };
    case "ADD_GOALS":
      return {
        ...state,
        goals: action.payload,
      };
    case "ADD_TRACKERS":
      return {
        ...state,
        trackers: [...state.trackers, ...action.payload],
      };
    default:
      return state;
  }
};
export default function Store(props) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <CTX.Provider value={[state, dispatch]}>{props.children}</CTX.Provider>
  );
}
