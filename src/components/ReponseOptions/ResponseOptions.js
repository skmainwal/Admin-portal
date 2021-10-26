import React, { useState, useEffect, Fragment } from "react";
import InputOption from "./InputOption";
import OptionList from "./OptionList";
import Input from "../UI/Input";
import { useSelector } from "react-redux";
import styles from "./ResponseOptions.module.css";

const ResponseOptions = (props) => {
  const reduxState = useSelector((state) => state);
  let ResponseType = reduxState.responseType;
  const [optionListDetails, setOptionListDetails] = useState([]);

  //NOTE:-

  const [inputBoxToolTip, setInputBoxToolTip] = useState({
    input_tool_tip: "",
  });

  console.log("inputBoxToolTip", inputBoxToolTip);

  const optionListDetailsHandler = (enteredOption) => {
    setOptionListDetails((prevState) => {
      return [...prevState, enteredOption];
    });
    let data = [...optionListDetails, enteredOption];
    props.responseOptionsHandler(data);
  };

  //NOTE:-  For Input Box
  const onChangeHandler = (event) => {
    let InputToolTipArray = [];
    InputToolTipArray.push({ [event.target.id]: event.target.value });
    setInputBoxToolTip(InputToolTipArray);
    props.responseOptionsHandler(InputToolTipArray);
    // console.log("Event", event);
  };

  const deleteOptionHandler = (toDeleteOptionId) => {
    let filteredOptionList = optionListDetails.filter(
      (option) => option.option != toDeleteOptionId
    );
    setOptionListDetails(filteredOptionList);
    props.responseOptionsHandler(filteredOptionList);
  };

  useEffect(() => {
    if (
      (ResponseType === "TEXT" ||
        ResponseType === "NAME" ||
        ResponseType === "DOB" ||
        ResponseType === "ESIC_NUMBER" ||
        ResponseType === "MOBILE" ||
        ResponseType === "REFERRING_DOCTOR_NAME") &&
      props.option_details != undefined &&
      props.option_details != null
    ) {
      // alert("Hello");
      const { response_options } = props.option_details;

      console.log("response_options", props.option_details);
      setInputBoxToolTip(response_options[0]);
      // setInputBoxToolTip()
    }
    if (props.option_details != null && props.option_details != undefined) {
      // setOptionListDetails(props.option_details);
      const { response_options } = props.option_details;
      props.responseOptionsHandler(response_options);
      setOptionListDetails(response_options);
    }
  }, []);

  useEffect(() => {
    if (props.isSaveButtonClicked != undefined && props.isSaveButtonClicked) {
      setOptionListDetails([]);
      props.setIsSaveButtonClicked(false);
    }
  }, [props.isSaveButtonClicked]);

  return (
    <div className={styles.responseOptions}>
      <div className={styles.title}>Response Options</div>
      {ResponseType === "TEXT" ||
      ResponseType === "NAME" ||
      ResponseType === "DOB" ||
      ResponseType === "ESIC_NUMBER" ||
      ResponseType === "MOBILE" ||
      ResponseType === "REFERRING_DOCTOR_NAME" ? (
        <Fragment>
          <p style={{ fontSize: "18px" }}>Input tool tip</p>
          <Input
            Id="input_tool_tip"
            placeholder="Input tool tip"
            Value={inputBoxToolTip.input_tool_tip}
            onChangeHandler={onChangeHandler}
          />
        </Fragment>
      ) : (
        <div>
          <div className={styles.inputOption}>
            <InputOption optionListDetailsHandler={optionListDetailsHandler} />
          </div>
          <div className={styles.optionList}>
            <OptionList
              optionListDetails={optionListDetails}
              deleteOptionHandler={deleteOptionHandler}
            />
          </div>
          <div className={styles.saveResponseOptions}></div>
        </div>
      )}
    </div>
  );
};

export default ResponseOptions;
