import React, { useState, useEffect, useCallback } from "react";
import Input from "../UI/Input";
import Checkbox from "@material-ui/core/Checkbox";
import DependencyRule from "../DependencyRule/DependencyRule";
import DependencyRuleComp from "../DependencyRule/DependencyRuleComp";
import InputBoxWithTitle from "../UI/InputBoxWithTitle";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { updatedQuestionSequence, dependecyRuleFunc } from "../../store/action";
import styles from "./QuestionSequence.module.css";
import { CodeSharp } from "@material-ui/icons";

// NOTE:- setUpdatingQuestionSequence on calling this function in the useEffect , Code is going  into the loop Find out the reasion
const QuestionSequence = (props) => {
  let Path = window.location.hash;
  // console.log("LOCATION", location.pathname);
  const [questionSequence, setQuestionSequence] = useState({
    last_question_list: "",
    next_question: "",
    is_first_question: "",
    is_last_question: "",
  });

  console.log("questionSequence", questionSequence);
  const [enteredDependency, setEnteredDependency] = useState("");

  function isRealValue(obj) {
    return obj && obj !== "null" && obj !== "undefined";
  }

  useEffect(() => {
    if (Path === "#/update_question_sequence") {
      if (
        props.selectedQuestionSequenceDetails != null &&
        props.selectedQuestionSequenceDetails != undefined
      ) {
        const {
          last_question_list,
          next_question,
          is_first_question,
          is_last_question,
          dependency_rule,
        } = props.selectedQuestionSequenceDetails;

        console.log("Last_question_list", last_question_list);

        setQuestionSequence({
          last_question_list: last_question_list[0],
          next_question,
          is_first_question,
          is_last_question,
        });
        if (isRealValue(dependency_rule)) {
          setEnteredDependency(dependency_rule);
        } else {
          setEnteredDependency({ null: "NULL" });
        }
      }
    }
  }, [props.selectedQuestionSequenceDetails]);

  // console.log("enteredDependency", enteredDependency);

  useEffect(() => {
    if (Path === "#/add_question_sequence") {
      // alert("hello");
      const {
        last_question_list,
        next_question,
        is_first_question,
        is_last_question,
      } = questionSequence;
      props.questionSequenceToAddHandler({
        last_question_list: [last_question_list],
        next_question,
        is_first_question,
        is_last_question,
        dependency_rule: [enteredDependency],
      });
    } else if (Path === "#/update_question_sequence") {
      const {
        last_question_list,
        next_question,
        is_first_question,
        is_last_question,
      } = questionSequence;
      props.setUpdatedQuestionSequence({
        last_question_list: [last_question_list],
        next_question,
        is_first_question,
        is_last_question,
        dependency_rule: [enteredDependency],
      });
    }
  }, [questionSequence, enteredDependency]);

  useEffect(() => {
    if (props.isSaveButtonClicked != undefined && props.isSaveButtonClicked) {
      setQuestionSequence({
        last_question_list: "",
        next_question: "",
        is_first_question: "",
        is_last_question: "",
      });
    }
  }, [props.isSaveButtonClicked]);

  const onChangeHandler = (event) => {
    setQuestionSequence((prevState) => {
      return {
        ...prevState,
        [event.target.id]: event.target.value,
      };
    });
  };

  return (
    <div className={styles.questionSequence}>
      <InputBoxWithTitle
        type="text"
        Id="last_question_list"
        title="Last Question Asked"
        placeholder="BRE/1.1.0"
        Value={questionSequence.last_question_list}
        onChangeHandler={onChangeHandler}
      />
      <DependencyRuleComp
        title="Dependency Rule"
        Id="dependency_rule"
        isSaveButtonClicked={props.isSaveButtonClicked}
        setIsSaveButtonClicked={props.setIsSaveButtonClicked}
        enteredDependency={enteredDependency}
        setEnteredDependency={(data) => setEnteredDependency(data)}
      />

      <InputBoxWithTitle
        type="text"
        Id="next_question"
        title="Next Question to Ask"
        placeholder="BRE/1.2.0"
        Value={questionSequence.next_question}
        onChangeHandler={onChangeHandler}
      />
      <InputBoxWithTitle
        type="number"
        min="0"
        max="1"
        Id="is_first_question"
        title="Is First Question"
        placeholder="Ex:- 0 / 1"
        Value={questionSequence.is_first_question}
        onChangeHandler={onChangeHandler}
      />
      <InputBoxWithTitle
        type="number"
        min="0"
        max="1"
        Id="is_last_question"
        title="Is Last Question"
        placeholder="Ex:- 0 / 1"
        Value={questionSequence.is_last_question}
        onChangeHandler={onChangeHandler}
      />
    </div>
  );
};

export default QuestionSequence;
