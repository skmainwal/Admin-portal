import React, { Fragment } from "react";
import "./InputOption.css";
import Button from "../UI/Button";
import styles from "./OptionList.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Input from "../UI/Input";

const OptionAdd = (props) => {
  const onChangeHandler = () => {
    console.log("");
  };

  const deleteHandler = (id) => {
    props.deleteOptionHandler(id);
  };

  return (
    <div className={styles.inputOptionList}>
      {props.optionListDetails != undefined &&
        props.optionListDetails.map((option) => {
          return (
            <div className={styles.options} key={option.option}>
              <Input Value={option.option} onChangeHandler={onChangeHandler} />
              <Input Value={option.text} onChangeHandler={onChangeHandler} />
              <Input
                Value={option.input_tool_tip}
                onChangeHandler={onChangeHandler}
              />
              <div className={styles.optionList__editAndDeleteIcon}>
                <IconButton>
                  <EditIcon style={{ color: "#86B8DF" }} />
                </IconButton>
                <IconButton onClick={() => deleteHandler(option.option)}>
                  <DeleteIcon style={{ color: "#F24A58" }} />
                </IconButton>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OptionAdd;
