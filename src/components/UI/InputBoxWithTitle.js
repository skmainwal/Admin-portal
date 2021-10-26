import React from "react";
import { useSelector } from "react-redux";
import styles from "./InputBoxWithTitle.module.css";
const InputBoxWithTitle = (props) => {
  let reduxState = useSelector((state) => state);
  // const inputChangeHandler = (event) => {

  // }

  const disableInputBox = () => {
    if (reduxState.selectedQuestionType === "DEM") {
      return (
        props.Id === "question_count" ||
        props.Id === "section_name" ||
        props.Id === "sub_section_name" ||
        props.Id === "section_count" ||
        props.Id === "total_sections" ||
        props.Id === "sub_section_count" ||
        props.Id === "total_sub_sections"
      );
      // alert("Hello");
    } else {
      return false;
    }
  };
  console.log("disableInputBox", disableInputBox());

  return (
    <div className={styles.inputBoxwithtitle}>
      <div className={styles.title}>{props.title}</div>
      <input
        type={props.type}
        id={props.Id}
        min={props.min}
        max={props.max}
        value={props.Value}
        disabled={disableInputBox()}
        style={{
          backgroundColor: disableInputBox() && "#EEEEEE",
          cursor: disableInputBox() && " not-allowed",
          textTransform: props.textTransform,
        }}
        placeholder={props.placeholder}
        onChange={(event) => props.onChangeHandler(event)}
        className={styles.input}
      />
    </div>
  );
};

export default InputBoxWithTitle;
