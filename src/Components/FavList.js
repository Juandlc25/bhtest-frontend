import React from "react";
import { useStateValue } from "../StateProvider";
import Header from "./Header";
import Repo from "./Repo";
import "./FavList.css";
import Events from "./Events";

function FavList() {
  const [{ user, repoId, events }, dispatch] = useStateValue();
  return (
    <div>
      <Header fav />
      {repoId?.length === 0 ? (
        <div className="favlist">
          <h2> Your list of favorite repositories is empty</h2>
          <p>
            You have no items in your list. To put some repo here, you have to
            click the star button next to the repo title
          </p>
        </div>
      ) : (
        <div className="favlist">
          <h2>
            Hello {user?.username}, this is your favorite list of repositories
          </h2>
          {repoId.map((item) => (
            <Repo
              removeBtn
              id={item.id}
              description={item.description}
              name={item.name}
              language={item.language}
            />
          ))}
        </div>
      )}
      {events?.length !== 0 && (
        <div className="favlist">
          <h2> {user?.username} this is your upcoming events</h2>
          {events.map((item) => (
            <Events
              removeBtn
              id={item.id}
              description={item.description}
              name={item.name}
              language={item.language}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavList;
