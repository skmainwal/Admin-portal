import React, { useState } from "react";
import styles from "./QueryButton.module.css";
import { useHistory, useLocation } from "react-router-dom";
const QueryButton = (props) => {
  const location = useLocation();
  // console.log("Button Location ", location);
  const history = useHistory();
  // console.log("History", history);
  // console.log("Path:", props.path);
  let Path = props.path;

  const tabSwitchHandler = (id) => {
    // seAtctiveButton(id);
    props.tabHandler(id);
    console.log("path: ", Path);
    history.replace(Path);
  };
  return (
    <div
      className={styles.queryButton}
      onClick={() => tabSwitchHandler(props.id)}
      style={{ background: props.activeButton === props.id ? "#86b8df" : "" }}
    >
      {props.name}
    </div>
  );
};

export default QueryButton;
