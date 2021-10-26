import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import styles from "./AddQuestion.module.css";
import ResponseOptions from "../../components/ReponseOptions/ResponseOptions";
import SectionDetails from "../../components/SectionDetails/SectionDetails";
import NewQuestion from "../../components//NewQuestion/NewQuestion";
import {
  addQuestion,
  updateQuestion,
  addDemographicData,
} from "../../api_requests/ApiRequests";
import { errorHandlerFunc, selectedQuestionTypeFun } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { style } from "dom-helpers";
const AddQuestion = (props) => {
  const reduxState = useSelector((state) => state);
  const Path = window.location;
  const location = useLocation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);
  //NOTE:- stores auestion data
  const [questionDetail, setQuestionDetail] = useState(null);
  //NOTE:- Stores section details data

  const [sectionDetail, setSectionDetail] = useState(null);

  //NOTE:- Stores the options of the question

  const [responseOptions, setResponseOptions] = useState([]);

  console.log("responseOptions", responseOptions);

  //NOTE:- Handling the all states

  const questionDetailsHandler = (enteredQuestionDetails) => {
    setQuestionDetail({ ...enteredQuestionDetails });
  };
  const sectionDetailsHandler = (enteredSectionDetails) => {
    setSectionDetail({ ...enteredSectionDetails });
  };
  const responseOptionsHandler = (enteredResponseOptions) => {
    setResponseOptions([...enteredResponseOptions]);
  };

  useEffect(() => {
    dispatch(selectedQuestionTypeFun(null));
    if (props.question_details) {
      const { question_id } = props.question_details;
      let question_type = question_id.split("/");
      console.log("question_type", question_type);
      dispatch(selectedQuestionTypeFun(question_type[0]));
    }
  }, []);
  // console.log("questionDetail", questionDetail);
  // console.log("sectionDetail", sectionDetail);
  // console.log("responseOptions", responseOptions);

  const ErrorHandler = (Error) => {
    dispatch(
      errorHandlerFunc({
        ...Error,
      })
    );
  };

  const onSaveHandler = async () => {
    if (location.pathname === "/update_question") {
      if (
        questionDetail === null ||
        sectionDetail === null ||
        responseOptions.length === 0
      ) {
        return;
      }
      const { question_id } = props.question_details;
      const { cancer_type, selected_language } = props.dataToSearch;
      let question = {
        ...questionDetail,
        response_options: responseOptions,
        ...sectionDetail,
      };

      let response = await updateQuestion(
        question_id,
        selected_language,
        question,
        ErrorHandler,
        props.setIsSaveButtonClicked
      );

      props.setShowUpdateQuestionModal(false);
      // console.log("Updated Question Response", response);
    } else {
      if (questionDetail === null || responseOptions.length === 0) {
        return;
      }
      if (reduxState.selectedQuestionType === "DEM") {
        let data = {
          question_id: questionDetail.question_id,
          question: questionDetail.question,
          question_in_brief: questionDetail.question_in_brief,
          in_language: questionDetail.in_language,
          response_type: questionDetail.response_type,
          data_to_process: questionDetail.data_to_process,
          response_options: responseOptions,
        };
        let response = addDemographicData(
          data,
          setIsSaveButtonClicked,
          ErrorHandler
        );
      } else {
        if (
          questionDetail === null ||
          sectionDetail === null ||
          responseOptions.length === 0
        ) {
          return;
        }
        let question = {
          ...questionDetail,
          response_options: responseOptions,
          ...sectionDetail,
        };

        // console.log("Seding the question", question);

        let resposne = await addQuestion(
          question,
          setIsSaveButtonClicked,
          ErrorHandler
        );
      }
    }
  };

  // console.log("Error", error);

  return (
    <div className={styles.addQuestion}>
      {Path.hash != "#/" && (
        <div className={styles.close_icon}>
          <IconButton onClick={() => props.setShowUpdateQuestionModal(false)}>
            <CloseIcon style={{ fontSize: "30px" }} />
          </IconButton>
        </div>
      )}

      <div className={styles.addQuestion__mainContainer}>
        <div className={styles.addQuestion__leftSide}>
          <NewQuestion
            isSaveButtonClicked={isSaveButtonClicked}
            questionDetailsHandler={questionDetailsHandler}
            question_details={props.question_details}
          />
        </div>
        <div className={styles.addQuestion__rightSide}>
          <SectionDetails
            isSaveButtonClicked={isSaveButtonClicked}
            sectionDetailsHandler={sectionDetailsHandler}
            section_details={props.question_details}
          />
          <ResponseOptions
            isSaveButtonClicked={isSaveButtonClicked}
            setIsSaveButtonClicked={(val) => setIsSaveButtonClicked(val)}
            responseOptionsHandler={responseOptionsHandler}
            option_details={props.question_details}
          />
        </div>
      </div>
      <div className={styles.addQuestion__saveButton}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className={styles.saveButton}
          onClick={onSaveHandler}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddQuestion;
