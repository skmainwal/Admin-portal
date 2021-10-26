import React, { useState, useEffect, useCallback } from "react";
import DropDown from "../dropDown/DropDown";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  getQuestionList,
  getQuestionSequence,
} from "../../api_requests/ApiRequests";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { errorHandlerFunc } from "../../store/action";
import styles from "./UpdateQuestionWrapper.module.css";
import ErrorPopUp from "../ErrorPopUp/ErrorPopUp";
import { useQuery, useMutation } from "react-query";

const UpdateQuestionWrapper = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const Path = window.location;

  // console.log("PATH", location);
  const [searchData, setSearchData] = useState({
    cancer_type: "",
    selected_language: "",
  });

  // http://localhost:6003/get_all_questions"

  const fetchQuestionList = async () => {
    return axios({
      method: "post",
      url: "http://localhost:6003/get_all_questions",
      data: searchData,
    }).then((res) => res.data);
  };

  // const {
  //   data: questionListData,
  //   isLoading,
  //   mutate,
  // } = useMutation(fetchQuestionList, {
  //   onSuccess: (data) => props.questionListHandler(data),
  // });

  // const { data, isLoading } = useQuery([
  //   "getting_question",
  //   () => fetchQuestionList(),
  // ]);

  const ErrorHandler = (Error) => {
    dispatch(
      errorHandlerFunc({
        ...Error,
      })
    );
  };

  const [language, setLanguage] = useState([]);
  const [cancerTypes, setCancerTypes] = useState([]);
  const state = useSelector((state) => state);

  const getLanguageAndCancerTypes = useCallback(() => {
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

    setLanguage(Language);
    setCancerTypes(CancerTypes);
  }, [state.cancerTypes, state.inLanguage]);

  useEffect(() => {
    getLanguageAndCancerTypes();
  }, [state.cancerTypes, state.inLanguage]);

  const onChangeHandler = (key, value) => {
    setSearchData((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  // if (questionListData) {
  //   props.questionListHandler(questionListData);
  // }
  const fetchQuestionListHandler = async () => {
    props.setDataToSearch(searchData);
    if (Path.hash === "#/update_question_sequence") {
      if (searchData.cancer_type === "") {
        ErrorHandler({
          message: "Please select the cancer type",
          message_type: "info",
        });
        return;
      }
      let response = await getQuestionSequence(
        searchData.cancer_type,
        ErrorHandler
      );
      if (response === null || response.length === 0) {
        props.questionListHandler([]);
        ErrorHandler({
          message: "No data found",
          message_type: "info",
        });
      } else if (response.length > 0) {
        ErrorHandler({
          message: "Successfully fetched data",
          message_type: "success",
        });
        props.questionListHandler(response);
      }
    } else {
      if (
        searchData.cancer_type === "" ||
        searchData.selected_language === ""
      ) {
        ErrorHandler({
          message: "All fields are required",
          message_type: "info",
        });
        return;
      }
      // props.questionListHandler([]);

      // mutate(searchData);

      let response = await getQuestionList(props.URL, searchData, ErrorHandler);
      if (response === null || response.length === 0) {
        props.questionListHandler([]);
      } else if (response.length > 0) {
        props.questionListHandler(response);
      }
    }

    // console.log("Response Data", response);
  };

  const ShowButton = () => {
    if (Path.hash === "#/update_question") {
      return (
        <button
          style={{
            height: "50px",
            borderRadius: "8px",
            backgroundColor: "#3F51B5",
            color: "white",
            outline: "none",
            border: "none",
            padding: "0px 20px",
            marginTop: "40px",
          }}
          onClick={fetchQuestionListHandler}
        >
          Fetch Question
        </button>
      );
    } else if (Path.hash === "#/update_question_sequence") {
      return (
        <button
          style={{
            height: "50px",
            borderRadius: "8px",
            backgroundColor: "#3F51B5",
            color: "white",
            outline: "none",
            border: "none",
            padding: "0px 20px",
            marginTop: "40px",
          }}
          onClick={fetchQuestionListHandler}
        >
          Fetch Question Sequence
        </button>
      );
    }
  };

  // if (isLoading) {
  //   return <h2>Fetching .....</h2>;
  // }

  // console.log("searchData", searchData);
  return (
    <div className={styles.updateQuestionWrapper}>
      <div className={styles.updateQuestionWrapper__dropDown}>
        <div className={styles.dropDown}>
          <DropDown
            title="Select Question Type"
            Id="cancer_type"
            data={cancerTypes}
            onChangeHandler={onChangeHandler}
          />
          {Path.hash != "#/update_question_sequence" && (
            <DropDown
              title="Select Language"
              Id="selected_language"
              data={language}
              onChangeHandler={onChangeHandler}
            />
          )}
          {/*<DropDown title="Select Language" />*/}
          {/*<ShowButton />*/}
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className={styles.fetchButton}
            onClick={fetchQuestionListHandler}
          >
            Fetch Question List
          </Button>
        </div>
      </div>
      <div className={styles.updateQuestionWrapper__mainContent}>
        {props.children}
      </div>
    </div>
  );
};

export default UpdateQuestionWrapper;
