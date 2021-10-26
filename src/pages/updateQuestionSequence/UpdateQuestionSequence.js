import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer, toast } from "react-toastify";
import UpdateQuestionWrapper from "../../components/UpdateQuestionWrapper/UpdateQuestionWrapper";
import Modal from "../../components/UI/Modal";
import QuestionSequence from "../../components/QuestionSequence/QuestionSequence";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ShowQuestion from "../../components/ShowQuestion/ShowQuestion";
import { useSelector, useDispatch } from "react-redux";
import { errorHandlerFunc } from "../../store/action";
import styles from "./UpdateQuestionSequence.module.css";

import {
  deleteQuestionSequence,
  getQuestionSequence,
  updateQuestionSequence,
} from "../../api_requests/ApiRequests";

const URL = "http://localhost:6003/get_question_sequence";
const UpdateQuestionSequence = () => {
  const dispatch = useDispatch();

  const reduxState = useSelector((state) => state);
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);

  const [selectedRow, setSelectedRow] = useState("");
  const [allQuestionSequence, setAllQuestionSequence] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState({
    last_question_asked: "",
    next_question_asked: "",
  });

  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        {/*<pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>*/}
      </div>
    );
  }

  const ErrorHandler = (Error) => {
    dispatch(
      errorHandlerFunc({
        ...Error,
      })
    );
  };

  const [selectedQuestionSequence, setSelectedQuestionSequence] =
    useState(null);

  const [updatedQuestionSequence, setUpdatedQuestionSequence] = useState(null);
  const [dataToSearch, setDataToSearch] = useState({
    cancer_type: "",
    selected_language: "",
  });

  // console.log("dataToSearch", dataToSearch);
  const questionListHandler = (questions) => {
    setAllQuestionSequence((prevState) => {
      return [...questions];
    });
  };

  // console.log("allQuestion", allQuestionSequence);

  const deleteQuestionSequenceHandler = async (
    last_question_asked,
    next_question_asked
  ) => {
    // const errorHandlerFunc = (data) => dispatch(errorHandlerFunc(data));

    // let response = await deleteQuestionSequence(
    //   last_question_asked,
    //   next_question_asked
    //   // ErrorHandler
    // );

    const filteredData = allQuestionSequence.filter(
      (question) =>
        question.last_question_list != [`${last_question_asked}`] &&
        question.next_question != next_question_asked
    );
    setAllQuestionSequence(filteredData);
  };

  useEffect(async () => {
    if (isSaveButtonClicked) {
      setTimeout(async () => {
        let response = await getQuestionSequence(dataToSearch.cancer_type);

        setAllQuestionSequence(response);
        setIsSaveButtonClicked(false);
      }, 1500);
    }
  }, [isSaveButtonClicked]);

  const updateQuestionSequenceHandler = async () => {
    if (updatedQuestionSequence == null) {
      return;
    }

    const {
      last_question_list,
      next_question,
      is_first_question,
      is_last_question,
      dependency_rule,
    } = updatedQuestionSequence;
    if (
      last_question_list[0] === "" ||
      next_question === "" ||
      is_first_question === "" ||
      is_last_question === "" ||
      dependency_rule[0] === ""
    ) {
      ErrorHandler({
        message: "All fields are required ",
        message_type: "info",
      });
      return;
    }

    let data = {
      last_question_list: last_question_list,
      next_question,
      is_first_question,
      is_last_question,
      dependency_rule,
    };

    console.log("Updated Question Sequence", data);

    let response = await updateQuestionSequence(
      selectedQuestionId.last_question_asked,
      selectedQuestionId.next_question_asked,
      data,
      ErrorHandler,
      setIsSaveButtonClicked
    );
  };

  // useEffect(() => {

  //   if (isSaveButtonClicked) {

  //  }

  // }, [isSaveButtonClicked]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={styles.updateQuestionSequence}>
        <UpdateQuestionWrapper
          URL={URL}
          questionListHandler={questionListHandler}
          setDataToSearch={(data) => setDataToSearch(data)}
        >
          <div className={styles.questionSequence__mainContainer}>
            <div className={styles.updateQuestionSequence__sequenceList}>
              {allQuestionSequence != undefined &&
                allQuestionSequence.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      width: "50%",
                      justifyContent: "space-between",
                      fontSize: "18px",
                      fontWeight: "500",

                      // position: "absolute",
                    }}
                  >
                    <p>Previous question asked</p>
                    <p>Next question to be asked</p>
                  </div>
                )}
              {allQuestionSequence.map((question) => (
                <ShowQuestion
                  key={question.id}
                  Id={question.id}
                  selectedRow={selectedRow}
                  setSelectedRow={(data) => setSelectedRow(data)}
                  question_sequence_details={question}
                  lastQuestionAsked={question.last_question_list}
                  nextQuestionAsked={question.next_question}
                  deleteHandler={deleteQuestionSequenceHandler}
                  selectedQuestionSequenceHandler={(data) =>
                    setSelectedQuestionSequence(data)
                  }
                  setSelectedQuestionId={(data) => setSelectedQuestionId(data)}
                />
              ))}
            </div>
            {allQuestionSequence.length != 0 && (
              <div className={styles.updateQuestionSequence__questionModal}>
                <Modal height="72.5vh" width="100%" padding="20px">
                  <QuestionSequence
                    selectedQuestionSequenceDetails={selectedQuestionSequence}
                    setUpdatedQuestionSequence={(data) =>
                      setUpdatedQuestionSequence(data)
                    }
                    // updatingQuestionSequence={updatingQuestionSequence}
                    // setUpdatingQuestionSequence={(data) =>
                    //   setUpdatingQuestionSequence(data)
                    // }
                  />
                  <div className={styles.saveButton}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={styles.save}
                      startIcon={<SaveIcon />}
                      onClick={updateQuestionSequenceHandler}
                    >
                      Save
                    </Button>
                  </div>
                </Modal>
              </div>
            )}
          </div>
        </UpdateQuestionWrapper>
      </div>
    </ErrorBoundary>
  );
};

export default UpdateQuestionSequence;
