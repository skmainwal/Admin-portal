import React, { useState, useEffect } from "react";
import UpdateQuestionWrapper from "../../components/UpdateQuestionWrapper/UpdateQuestionWrapper";
import ShowQuestion from "../../components/ShowQuestion/ShowQuestion";
import {
  deleteQuestion,
  getQuestionList,
} from "../../api_requests/ApiRequests";
import Modal from "../../components/Modal/Modal";
import AddQuestion from "../addQuestion/AddQuestion";
import { useDispatch } from "react-redux";
import { errorHandlerFunc } from "../../store/action";
import { useQuery } from "react-query";

import styles from "./UpdateQuestion.module.css";
import { CodeSharp } from "@material-ui/icons";
const URL = "http://localhost:6003/get_all_questions";
const UpdateQuestion = () => {
  const dispatch = useDispatch();

  const [showUpdateQuestionModal, setShowUpdateQuestionModal] = useState(false);
  const [questionDetailsToUpdate, setQuestionDetailsToUpdate] = useState(null);
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);
  console.log("isSaveButtonClicked", isSaveButtonClicked);

  // console.log("questionDetailsToUpdate", questionDetailsToUpdate);

  const [rerender, setRerender] = useState(false);
  const [allQuestion, setAllQuestion] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");

  console.log("allQuestion", allQuestion);

  const [dataToSearch, setDataToSearch] = useState({
    cancer_type: "",
    selected_language: "",
  });

  console.log("dataToSearch", dataToSearch);

  const ErrorHandler = (Error) => {
    dispatch(
      errorHandlerFunc({
        ...Error,
      })
    );
  };

  const questionListHandler = (questions) => {
    setAllQuestion((prevState) => {
      return [...questions];
    });
  };

  const modalCloseHandler = (val) => {
    setShowUpdateQuestionModal(false);
  };
  const deleteQuestionHandler = async (questionId) => {
    // console.log("questionId", questionId);
    let response = await deleteQuestion(questionId, ErrorHandler);
    // console.log("Question Removed", response);
    setRerender(true);

    //NOTE:- we are also deleting the question from local allQuestion state and updating the question list
    //So that we can fetch the question list again
    let filteredQuestionList = allQuestion.filter(
      (question) => questionId != question.question_id
    );
    // console.log("filteredQuestionList", filteredQuestionList);
    // console.log("filteredQuestionList", ...filteredQuestionList);
    setAllQuestion(() => {
      return [...filteredQuestionList];
    });
  };

  useEffect(async () => {
    if (isSaveButtonClicked) {
      let questionListResponse = await getQuestionList(URL, dataToSearch);
      // console.log("questionListResponse", questionListResponse);
      setAllQuestion(questionListResponse);
      setIsSaveButtonClicked(false);
    }
  }, [isSaveButtonClicked]);

  const ShowAllQuestion = (props) => {
    return (
      <div className={styles.question__list}>
        {allQuestion.map((question) => {
          return (
            !question.question_id.includes("SEC") && (
              <ShowQuestion
                key={question.question_id}
                Id={question.id}
                setQuestionDetailsToUpdate={(val) =>
                  setQuestionDetailsToUpdate(val)
                }
                question_details={question}
                selectedRow={selectedRow}
                setSelectedRow={(data) => setSelectedRow(data)}
                question_id={question.question_id}
                question={question.question}
                deleteHandler={deleteQuestionHandler}
                showUpdateModalHandler={(val) =>
                  setShowUpdateQuestionModal(val)
                }
              />
            )
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      {showUpdateQuestionModal && (
        <Modal onClose={modalCloseHandler}>
          <AddQuestion
            question_details={questionDetailsToUpdate}
            dataToSearch={dataToSearch}
            setShowUpdateQuestionModal={(val) =>
              setShowUpdateQuestionModal(val)
            }
            setIsSaveButtonClicked={(val) => setIsSaveButtonClicked(val)}
          />
        </Modal>
      )}
      <div className={styles.updateQuestion}>
        <UpdateQuestionWrapper
          URL={URL}
          questionListHandler={questionListHandler}
          setDataToSearch={(data) => setDataToSearch(data)}
        >
          <ShowAllQuestion
          // setIsSaveButtonClicked={(val) => setIsSaveButtonClicked(val)}
          />
        </UpdateQuestionWrapper>
      </div>
    </div>
  );
};

export default UpdateQuestion;
