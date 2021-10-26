import React, { useState } from "react";
import Input from "../UI/Input";
import "./InputOption.css";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import InputBoxWithTitle from "../UI/InputBoxWithTitle";

// import Button from "../UI/Button";
const InputOption = (props) => {
  const [option, setOption] = useState({
    option: "",
    text: "",
    input_tool_tip: "",
  });

  const onChangeHandler = (event) => {
    // console.log(event.target.value);

    setOption((prevState) => {
      return {
        ...prevState,
        [event.target.id]: event.target.value,
      };
    });
  };

  const addOptionHandler = (event) => {
    // event.preventDefault();
    props.optionListDetailsHandler(option);
    setOption((prevState) => {
      return {
        option: "",
        text: "",
        input_tool_tip: "",
      };
    });
  };

  return (
    <div className="inputOption">
      <InputBoxWithTitle
        title="Option Id"
        placeholder="Option Id"
        Id="option"
        Value={option.option}
        onChangeHandler={onChangeHandler}
      />
      <InputBoxWithTitle
        title="Button text"
        placeholder="Button text"
        Id="text"
        Value={option.text}
        onChangeHandler={onChangeHandler}
      />
      <InputBoxWithTitle
        title="Tool Tip"
        placeholder="Tool Tip"
        Id="input_tool_tip"
        Value={option.input_tool_tip}
        onChangeHandler={onChangeHandler}
      />
      <div className="emptySpace">
        <Button
          variant="contained"
          color="primary"
          // type="submit"
          onClick={addOptionHandler}
          className="addButton"
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default InputOption;
