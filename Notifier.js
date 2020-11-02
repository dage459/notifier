/*
 * Copyright(c) 2020 @dage459
 * Licensed under the Creative Commons Attribution-NonCommercial-
 * NoDerivatives 4.0 International Public License
 * You may obtain a copy of the License at:
 *    https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
 */

/*
 * --------------------------------------------------------------------------------
 * Description:
 *        ToDo:
 * --------------------------------------------------------------------------------
 */

import React from "react";
import { v4 } from "uuid";
import "./notifier.css";
const NotificationContext = React.createContext();

const Notification = (props) => {
  const [width, setWidth] = React.useState(0);
  const [intervalID, setIntervalID] = React.useState(null);
  const [exit, setExit] = React.useState(false);

  const handleStartNotifier = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }
        clearInterval(id);
        return prev;
      });
    }, 22);
    setIntervalID(id);
  };

  const handlePausNotifier = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotifier = () => {
    handlePausNotifier();
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id,
      });
    }, 400);
  };

  React.useEffect(() => {
    if (width === 100) {
      handleCloseNotifier();
    }
  }, [width]);

  React.useEffect(() => {
    handleStartNotifier();
  }, []);

  return (
    <div
      onMouseEnter={handlePausNotifier}
      onMouseLeave={handleStartNotifier}
      className={`notification-item ${
        props.type === "INFO"
          ? "info"
          : props.type === "SUCCESS"
          ? "success"
          : props.type === "WARNING"
          ? "warning"
          : props.type === "ERROR"
          ? "error"
          : props.type === "DARK"
          ? "dark"
          : "default"
      } ${exit ? "exit" : ""}`}
    >
      <p>{props.message}</p>
      <div className={"bar"} style={{ width: `${width}%` }} />
    </div>
  );
};

export default (props) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, { ...action.payload }];
      case "REMOVE_NOTIFICATION":
        return state.filter((el) => el.id !== action.id);
      default:
        return state;
    }
  }, []);

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className={"notification-wrapper"}>
        {state.map((note) => {
          return <Notification dispatch={dispatch} key={note.id} {...note} />;
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotifier = () => {
  const dispatch = React.useContext(NotificationContext);
  return (props) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        ...props,
      },
    });
  };
};
