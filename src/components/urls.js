import axios from "axios";
const instance = axios.create({
  // baseURL: "http://127.0.0.1:8000",
  baseURL: "https://progresstrackerdjango.herokuapp.com",
});

export const login = (username, password, callback) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });
  instance
    .post("api/auth/login", body, config)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      callback(err);
    });
};
export const register = (
  username,
  password,
  first_Name,
  last_Name,
  email,
  callback
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    username,
    password,
    first_Name,
    last_Name,
    email,
  });
  instance
    .post("api/auth/register", body, config)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      callback(err);
    });
};
export const trackers_for_goal = (goalId, callback) => {
  let auth = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["Authorization"] = `Token ${auth}`;
  const body = JSON.stringify({ goal: goalId });
  instance
    .post("api/trackers_for_goal", body, config)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      callback(err);
    });
};
export const goals_for_user1 = (userId, auth, callback) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["Authorization"] = `Token ${auth}`;
  const body = JSON.stringify({ user: userId });
  instance
    .post("api/goals_for_user", body, config)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      callback(err);
    });
};
export const goals_for_user = (userId, callback) => {
  let auth = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["Authorization"] = `Token ${auth}`;
  const body = JSON.stringify({ user: userId });
  instance
    .post("api/goals_for_user", body, config)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      callback(err);
    });
};
export const addGoal = (
  user,
  Name,
  details,
  description,
  frequency,
  startDate,
  endDate,
  callback
) => {
  let auth = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["Authorization"] = `Token ${auth}`;
  let body = JSON.stringify({
    user,
    name: Name,
    startDate,
    endDate,
    details,
    description,
    frequency,
  });
  // if (details) {
  //   body.push(JSON.stringify({ details }));
  // }
  // if (description) {
  //   body.push(JSON.stringify({ description }));
  // }
  instance
    .post("api/add_goals", body, config)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      callback(err);
    });
};
export const add_tracker = (notes, goal, callback) => {
  let auth = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["Authorization"] = `Token ${auth}`;
  let body = JSON.stringify({ notes, goal });

  instance
    .post("api/add_tracker", body, config)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      callback(err);
    });
};
export const logout = (callback) => {
  let auth = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["Authorization"] = `Token ${auth}`;
  instance
    .post("api/auth/logout", config)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      callback(err);
    });
};
export default instance;
