/*
 * MIT License
 * Copyright(c) 2020 @dage459
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
const NotifierContext = React.createContext();

const Notifier = (props) => {
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
        type: "REMOVE_NOTIFIER",
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
      className={`notifier-item ${
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
      case "ADD_NOTIFIER":
        return [...state, { ...action.payload }];
      case "REMOVE_NOTIFIER":
        return state.filter((el) => el.id !== action.id);
      default:
        return state;
    }
  }, []);

  return (
    <NotifierContext.Provider value={dispatch}>
      <div className={"notifier-wrapper"}>
        {state.map((note) => {
          return <Notifier dispatch={dispatch} key={note.id} {...note} />;
        })}
      </div>
      {props.children}
    </NotifierContext.Provider>
  );
};

export const useNotifier = () => {
  const dispatch = React.useContext(NotifierContext);
  return (props) => {
    dispatch({
      type: "ADD_NOTIFIER",
      payload: {
        id: v4(),
        ...props,
      },
    });
  };
};
