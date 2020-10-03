import React from "react";
import { useStateValue } from "../StateProvider";
import Header from "./Header";
import "./Home.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Link } from "react-router-dom";

function Home() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="home">
      <Header />
      <div className="home__container">
        <Link to="/home/github">
          <div className="home__github">
            <GitHubIcon /> <h1>Your Github repositories</h1>
          </div>
        </Link>
        <Link to="/home/calendar">
          <div className="home__calendar">
            <CalendarTodayIcon /> <h1>Your Google calendar</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
