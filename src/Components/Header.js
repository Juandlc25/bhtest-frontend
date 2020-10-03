import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import "./Header.css";
import { Avatar } from "@material-ui/core";

function Header({ fav }) {
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();

  const logout = () => {
    history.push("/");
    localStorage.setItem("auth-token", "");
    dispatch({
      type: "SET_USER",
      token: undefined,
      user: undefined,
    });
  };

  useEffect(() => {
    if (!user) history.push("/");
  }, []);
  return (
    <>
      {fav ? (
        <div className="header">
          <Link to="/home">
            <img
              className="header__logo"
              src="https://miro.medium.com/fit/c/160/160/1*XiD5JOp6absv-lmwPP3B6w.jpeg"
              alt=""
            />
          </Link>

          <div className="header__titles">
            <Avatar />
            <h4 className="header__titles1">{user?.username}</h4>

            <h3 className="header__titlesLogout" onClick={logout}>
              Log out
            </h3>
          </div>
        </div>
      ) : (
        <div className="header">
          <Link to="/home">
            <img
              className="header__logo"
              src="https://miro.medium.com/fit/c/160/160/1*XiD5JOp6absv-lmwPP3B6w.jpeg"
              alt=""
            />
          </Link>
          <div className="header__titles">
            <Link to="/home/github/fav">
              <h3 className="header__titles1">Profile</h3>
            </Link>
            <h3 className="header__titlesLogout" onClick={logout}>
              Log out
            </h3>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
