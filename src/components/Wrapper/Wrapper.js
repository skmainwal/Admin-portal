import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { errorHandlerFunc } from "../../store/action";
import { getSectionList } from "../../api_requests/ApiRequests";
import { useSelector } from "react-redux";
import styles from "./Wrapper.module.css";
import DropDown from "../dropDown/DropDown";
const Wrapper = (props) => {
  const [selectedCancerType, setSelectedCancerType] = useState("");
  const [selectedLanguageType, setSelectedLanguageType] = useState("");
  console.log("selectedLanguageType", selectedLanguageType);
  const dispatch = useDispatch();
  const ErrorHandler = (Error) => {
    dispatch(
      errorHandlerFunc({
        ...Error,
      })
    );
  };

  const fetchHandler = async () => {
    if (props.setSelectedCancerAndLanguage != undefined) {
      props.setSelectedCancerAndLanguage({
        cancer_type: selectedCancerType,
        language_type: selectedLanguageType,
      });
    }
    if (selectedCancerType === "" || selectedLanguageType === "") {
      ErrorHandler({
        message: "All fields are required",
        message_type: "info",
      });
      return;
    }

    let response = await getSectionList(
      selectedCancerType,
      selectedLanguageType,
      ErrorHandler
    );
    if (response.length > 0) {
      props.questionListHandler(response);
    } else {
      props.questionListHandler([]);
    }
    console.log("Section List", response);
  };

  const dropDownHandler = (Id, Value) => {
    if (Id === "selected_cancer_type") {
      setSelectedCancerType(`${Value}/SEC`);
    } else {
      setSelectedLanguageType(Value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <DropDown
          title="Select Question Type"
          Id="selected_cancer_type"
          data={props.cancerTypes}
          onChangeHandler={dropDownHandler}
        />
        <DropDown
          title="Select language"
          Id="selected_language"
          data={props.languageTypes}
          onChangeHandler={dropDownHandler}
        />
        <Button
          className={styles.fetchButton}
          variant="contained"
          color="primary"
          disableElevation
          onClick={fetchHandler}
        >
          Fetch
        </Button>
      </div>
      <div className={styles.mainContent}>{props.children}</div>
    </div>
  );
};

export default Wrapper;
