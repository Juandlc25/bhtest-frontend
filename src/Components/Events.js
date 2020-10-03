import React from "react";
import { useStateValue } from "../StateProvider";
import "./Events.css";
import StarBorderIcon from "@material-ui/icons/StarBorder";

function Events({ id, language, description, name, removeBtn }) {
  const [{}, dispatch] = useStateValue();
  const addToFav = () => {
    dispatch({
      type: "ADD_TO_EVENTS",
      item: {
        id: id,
        name: name,
        description: description,
        language: language,
      },
    });
  };
  const remove = () => {
    dispatch({
      type: "REMOVE_FROM_EVENTS",
      id: id,
    });
  };
  return (
    <>
      {removeBtn ? (
        <div className="github__repo">
          <div className="github__singleRepo">
            <h2>{name}</h2>
            <h4>{description}</h4>
            <p>{language}</p>
          </div>
          <button onClick={remove}> REMOVE</button>
        </div>
      ) : (
        <div className="github__repo">
          <div className="github__singleRepo">
            <h2>{name}</h2>
            <h4>{description}</h4>
            <p>{language}</p>
          </div>
          <button onClick={addToFav}>
            {" "}
            <StarBorderIcon /> Star
          </button>
        </div>
      )}
    </>
  );
}

export default Events;
