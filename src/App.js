import React from "react";
import "./App.css";
import SignIn from "./Components/SignIn";
import Login from "./Components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useStateValue } from "./StateProvider";
import Home from "./Components/Home";
import Github from "./Components/Github";
import FavList from "./Components/FavList";
import Calendar from "./Components/Calendar";

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:9000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:9000/users", {
          headers: { "x-auth-token": token },
        });
        dispatch({
          type: "SET_USER",
          user: userRes.data,
          token,
        });
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/home/github" component={Github} />
          <Route exact path="/home/github/fav" component={FavList} />
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={SignIn} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/home/calendar" component={Calendar} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
