import React, { useState, useEffect } from "react";
import InputBoxWithTitle from "../UI/InputBoxWithTitle";
import DropDown from "../dropDown/DropDown";
import { useDispatch } from "react-redux";
import { errorHandlerFunc } from "../../store/action";

import { useSelector } from "react-redux";
import {
  addSection,
  updateSectionDetails,
} from "../../api_requests/ApiRequests";
import styles from "./Section.module.css";
import SectionResponseOption from "./SectionResponseOption";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { LiveTvOutlined } from "@material-ui/icons";
const Section = (props) => {
  let Path = window.location.hash;
  const dispatch = useDispatch();
  const [questionId, setQuestionId] = useState("");
  const [language, setLanguage] = useState("");
  const [responseOptions, setResponseOptions] = useState({
    response_type: "SECTION_COUNTER",
    response_options: "",
  });

  const ErrorHandler = (Error) => {
    dispatch(
      errorHandlerFunc({
        ...Error,
      })
    );
  };

  //   console.log("responseOptions", responseOptions);

  const [slectedCancer, setSelectedCancer] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const dropDownHandler = (Id, value) => {
    console.log(Id, value);
    if (Id === "selected_cancer") {
      setSelectedCancer(value);
      setQuestionId(`${value}/SEC/`);
    } else {
      setSelectedLanguage(value);
      setLanguage(value);
    }
  };

  const onChangeHandler = (event) => {
    console.log("Event", event);
    if (event.target.id === "question_id") {
      setQuestionId(event.target.value);
    } else {
      setLanguage(event.target.value);
    }
  };

  const responseOptionHandler = (data) => {
    setResponseOptions((prevState) => {
      return {
        ...prevState,
        response_options: [{ ...data }],
      };
    });
  };

  const onSaveHandler = async () => {
    let requestData = {
      question_id: questionId,
      in_language: language,
      ...responseOptions,
    };

    if (Path === "#/update_section") {
      let ErrorHandler = (Error) => {
        dispatch(
          errorHandlerFunc({
            ...Error,
          })
        );
      };
      const { question_id, in_language } = props.questionDetail;
      let response = updateSectionDetails(
        question_id,
        in_language,
        requestData,
        ErrorHandler,
        props.setIsSaveButtonClicked
      );
      console.log("response", response);
    } else {
      let response = await addSection(requestData, ErrorHandler);
      console.log("Sending the data", requestData);
    }
  };

  useEffect(() => {
    if (props.questionDetail != null && props.questionDetail != undefined) {
      const { in_language, question_id, response_type, response_options } =
        props.questionDetail;

      setQuestionId(question_id);
      setLanguage(in_language);
      setResponseOptions((prevState) => {
        return {
          ...prevState,
          response_options: response_options,
        };
      });
    }
  }, [props.questionDetail]);

  return (
    <div className={styles.section}>
      <div className={styles.inLanguage_cancerTypes}>
        <div className={styles.input_with_dropdown}>
          <InputBoxWithTitle
            title="Question Id"
            Id="question_id"
            Value={questionId}
            placeholder="BRE/SEC/1.0.0"
            onChangeHandler={onChangeHandler}
          />
          <div style={{ marginTop: "-15px" }}>
            <DropDown
              title="Select Question Type"
              data={props.cancerTypes}
              // title="Select cancer"
              Id="selected_cancer"
              onChangeHandler={dropDownHandler}
            />
          </div>
        </div>
        <div className={styles.input_with_dropdown}>
          <InputBoxWithTitle
            title="Selected Language"
            Id="in_language"
            Value={language}
            placeholder="ENG"
            onChangeHandler={onChangeHandler}
          />
          <div style={{ marginTop: "-15px" }}>
            <DropDown
              title="Select Language"
              Id="selected_language"
              Value={language}
              data={props.languageTypes}
              onChangeHandler={dropDownHandler}
            />
          </div>
        </div>
      </div>
      <div>
        <SectionResponseOption
          responseOptionHandler={responseOptionHandler}
          responseOptions={responseOptions.response_options}
        />
      </div>
      <div className={styles.saveButton}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onSaveHandler}
          className={styles.save}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Section;
