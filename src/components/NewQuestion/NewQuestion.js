import React, { useState, useEffect } from "react";
import Input from "../UI/Input";
import { useSelector, useDispatch } from "react-redux";
import styles from "./NewQuestion.module.css";
import DropDown from "../dropDown/DropDown";
import InputBoxWithTitle from "../UI/InputBoxWithTitle";
import {
  responseTypeSelection,
  selectedQuestionTypeFun,
} from "../../store/action";
const AddNewQuestion = (props) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const [questionDetails, setQuestionDetails] = useState({
    question_id: "",
    question: "",
    question_in_brief: "",
    question_count: "",
    in_language: "",
    response_type: "",
    data_to_process: "",
  });
  console.log("questionDetails", questionDetails);

  //NOTE:- we will use this state , when will have to update the question
  const [selectQuestionType, setSelectQuestionType] = useState("");
  //NOTE:- Storing all the question types
  const [questionTypes, setQuestionTypes] = useState([]);

  const [language, setLanguage] = useState([]);
  const [responseType, setResponseType] = useState([]);
  const [dataToProcess, setDataToProcess] = useState([]);

  useEffect(() => {
    if (props.isSaveButtonClicked != undefined && props.isSaveButtonClicked) {
      setQuestionDetails({
        question_id: "",
        question: "",
        question_in_brief: "",
        question_count: "",
        in_language: "",
        response_type: "",
        data_to_process: "",
      });
    }
  }, [props.isSaveButtonClicked]);

  //NOTE:- Storing the language, cancer types
  useEffect(() => {
    let Language = state.inLanguage.map((langType) => {
      return {
        ID: langType.short_name,
        Name: langType.language_type,
        Category: langType.language_type,
      };
    });

    let CancerTypes = state.cancerTypes.map((cancer) => {
      return {
        ID: cancer.short_name,
        Name: cancer.cancer_type,
        Category: cancer.cancer_type,
      };
    });

    setQuestionTypes(CancerTypes);

    let ResponseType = state.resposnseType.map((resType) => {
      return {
        ID: resType.response_type,
        Name: resType.response_type,
        Category: resType.response_type,
      };
    });

    let DataToProcess = state.dataToProcess.map((dataProcessType) => {
      return {
        ID: dataProcessType.data_to_process,
        Name: dataProcessType.data_to_process,
        Category: dataProcessType.data_to_process,
      };
    });

    setLanguage(Language);
    setResponseType(ResponseType);
    setDataToProcess(DataToProcess);
  }, [state.inLanguage, state.resposnseType, state.dataToProcess]);

  //NOTE:- *******************

  const onChangeHandler = (event) => {
    if (
      event.target.value.includes("DEM") &&
      event.target.id === "question_id"
    ) {
      dispatch(selectedQuestionTypeFun("DEM"));
      setSelectQuestionType("DEM");
    }
    if (event.target.value.trim() === "" && event.target.id === "question_id") {
      dispatch(selectedQuestionTypeFun(null));
      setSelectQuestionType("");
    }

    // console.log("Typed Value", event.target.value);
    setQuestionDetails({
      ...questionDetails,

      [event.target.id]: event.target.value,
    });
    // setSelectQuestionType(event.target.value);
    // let data = {
    //   ...questionDetails,
    //   [event.target.id]: event.target.value,
    // };
    // props.questionDetailsHandler(data);
  };

  const dropDownHandler = (type, value) => {
    if (type === "question_id") {
      setSelectQuestionType(value);
      dispatch(selectedQuestionTypeFun(value));
      setQuestionDetails((prevState) => {
        return {
          ...prevState,
          [type]: `${value}/`,
        };
      });
    } else {
      setQuestionDetails((prevState) => {
        return {
          ...prevState,
          [type]: value,
        };
      });
    }

    // let data = {
    //   ...questionDetails,
    //   [type]: value,
    // };
    // props.questionDetailsHandler(data);
  };

  useEffect(() => {
    props.questionDetailsHandler(questionDetails);
  }, [questionDetails]);

  //NOTE:- To update the question
  useEffect(() => {
    if (props.question_details != null && props.question_details != undefined) {
      const {
        question_id,
        question,
        question_in_brief,
        question_count,
        in_language,
        response_type,
        data_to_process,
      } = props.question_details;
      props.questionDetailsHandler({
        question_id: question_id,
        question: question,
        question_in_brief: question_in_brief,
        question_count: question_count,
        in_language: in_language,
        response_type: response_type,
        data_to_process: data_to_process,
      });

      setQuestionDetails((prevState) => {
        return {
          ...prevState,
          question_id: question_id,
          question: question,
          question_in_brief: question_in_brief,
          question_count: question_count,
          in_language: in_language,
          response_type: response_type,
          data_to_process: data_to_process,
        };
      });
    }
  }, []);

  // console.log("questionDetails", questionDetails);
  return (
    <div className={styles.addNewQuestion}>
      <div className={styles.questionText}>
        <p>Question Details</p>
      </div>
      <div className={styles.question_id}>
        <InputBoxWithTitle
          title="Question Id"
          placeholder="BRE/1.0.0"
          Id="question_id"
          textTransform="uppercase"
          Value={questionDetails.question_id}
          onChangeHandler={onChangeHandler}
        />
        <div style={{ marginTop: "-18px" }}>
          <DropDown
            title="Select Question Type"
            Id="question_id"
            Value={selectQuestionType}
            data={questionTypes}
            onChangeHandler={dropDownHandler}
          />
        </div>
      </div>
      <InputBoxWithTitle
        title="Question"
        placeholder="Question"
        Id="question"
        Value={questionDetails.question}
        onChangeHandler={onChangeHandler}
      />
      <InputBoxWithTitle
        title="Question Brief"
        placeholder="Question Brief"
        Id="question_in_brief"
        Value={questionDetails.question_in_brief}
        onChangeHandler={onChangeHandler}
      />
      <InputBoxWithTitle
        title="Question Count"
        type="number"
        placeholder="Ex: 1"
        Id="question_count"
        Value={questionDetails.question_count}
        onChangeHandler={onChangeHandler}
      />
      <div className={styles.dropDowns}>
        <DropDown
          title="In Language"
          Id="in_language"
          data={language}
          Value={questionDetails.in_language}
          onChangeHandler={dropDownHandler}
        />
        <DropDown
          title="Response Type"
          Id="response_type"
          data={responseType}
          Value={questionDetails.response_type}
          onChangeHandler={dropDownHandler}
        />
        <DropDown
          title="Data to process"
          Id="data_to_process"
          data={dataToProcess}
          Value={questionDetails.data_to_process}
          onChangeHandler={dropDownHandler}
        />
      </div>
    </div>
  );
};

export default AddNewQuestion;
