import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { errorHandlerFunc } from "../store/action";
import { useQuery } from "react-query";
import axios from "axios";
import url from "../services/utils";

//NOTE:- Getting all Cancer Types and Languages
export const CancerTypesAndLanguges = async (URL) => {
  let response = await axios({
    method: "get",
    // headers: { "Content-Type": "application/x-www-form-urlencoded" },
    url: "http://127.0.0.1:6003/get_cancerTypes",
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  // console.log(response);
  return response;
};

export const useCancerTypesAndLanguages = () => {
  const getCancerAndlanguage = async () => {
    return await axios({
      method: "get",
      // headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: "http://127.0.0.1:6003/get_cancerTypes",
    }).then((res) => res.data);
  };

  return useQuery("cancerAndLanguage", () => getCancerAndlanguage());
};

//NOTE:- USING React-Query **********************************
export const ResponseTypeDataToProcess = async (URL) => {
  let response = await axios({
    method: "get",
    // headers: { "Content-Type": "application/x-www-form-urlencoded" },
    url: "http://127.0.0.1:6003/get_response_data_to_process",
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  return response;
};

//NOTE:- Adding New Question

export const addQuestion = async (
  requestData,
  setIsSaveButtonClicked,
  ErrorHandler
) => {
  let data = {
    ...requestData,
  };
  // console.log("requestData", data);

  let response = axios({
    method: "post",
    url: "http://localhost:6003/add_new_question",
    data: data,
  })
    .then(function (response) {
      // console.log("Resposne", response);
      if (response.status === 200) {
        setIsSaveButtonClicked(true);
        ErrorHandler({
          message: "Successfully added question ",
          message_type: "success",
        });
        return response.data;
      }
    })
    .catch(function (error) {
      ErrorHandler({
        message: "Failed to add question",
        message_type: "error",
      });
      // setError(error);
      console.log(error);
      return error;
    });
  return response;
};

//NOTE:- Geting all the question

export const getQuestionList = (URL, requestData, ErrorHandler) => {
  let data = {
    ...requestData,
  };
  // console.log("requestData", data);

  let response = axios({
    method: "post",
    url: URL,
    data: data,
  })
    .then(function (response) {
      // console.log("Resposne", response);
      if (response.status === 200) {
        if (response.data.length === 0) {
          if (ErrorHandler != undefined) {
            ErrorHandler({
              message: "No data found",
              message_type: "info",
            });
          }
        } else {
          if (ErrorHandler != undefined) {
            ErrorHandler({
              message: "Successfully fetched question list ",
              message_type: "success",
            });
          }
        }

        // setIsSaveButtonClicked(true);
        return response.data;
      }
    })
    .catch(function (error) {
      if (ErrorHandler != undefined) {
        ErrorHandler({
          message: "Failed to fetch the question list ",
          message_type: "error",
        });
      }

      // setError(error);
      console.log(error);
      return error;
    });
  return response;
};

export const updateQuestion = (
  questionId,
  selected_language,
  requestData,
  ErrorHandler,
  setIsSaveButtonClicked
) => {
  let data = {
    ...requestData,
  };

  // console.log("Sending the Data", data);
  let response = axios({
    method: "put",
    url: `http://localhost:6003/update_question?question_id=${questionId} &&selected_language=${selected_language}`,
    data: data,
  })
    .then(function (response) {
      // console.log("Resposne", response);
      if (response.status === 200) {
        setIsSaveButtonClicked(true);
        ErrorHandler({
          message: "Successfully updated question ",
          message_type: "success",
        });
        // setIsSaveButtonClicked(true);
        return response.data;
      }
    })
    .catch(function (error) {
      // setError(error);
      ErrorHandler({
        message: "Failed to update question",
        message_type: "error",
      });
      console.log(error);
      return error;
    });
  return response;
};

//NOTE:- Delete the question
export const deleteQuestion = (questionId, ErrorHandler) => {
  // console.log("requestData", data);

  let response = axios({
    method: "delete",
    url: `http://localhost:6003/delete_question?question_id=${questionId}`,
  })
    .then(function (response) {
      // console.log("Resposne", response);
      if (response.status === 200) {
        ErrorHandler({
          message: "Successfully deleted question ",
          message_type: "success",
        });
        // setIsSaveButtonClicked(true);
        return response.data;
      }
    })
    .catch(function (error) {
      // setError(error);
      ErrorHandler({
        message: "Failed to delete question",
        message_type: "error",
      });
      console.log(error);
      return error;
    });
  return response;
};

//NOTE:- Adding question Sequence

export const addQuestionSequence = (
  requestData,
  setIsSaveButtonClicked,
  ErrorHandler,
  pushToAddQuestionSequencePage
) => {
  let data = {
    ...requestData,
  };
  // console.log("requestData", data);

  let response = axios({
    method: "post",
    url: "http://localhost:6003/add_question_sequence",
    data: data,
  })
    .then(function (response) {
      // console.log("Resposne", response);
      if (response.status === 200) {
        // pushToAddQuestionSequencePage();
        setIsSaveButtonClicked(true);
        // if (ErrorHandler != undefined) {
        //   ErrorHandler({
        //     message: "Successfully added question sequence ",
        //     message_type: "success",
        //   });
        // }

        // setIsSaveButtonClicked(true);
        return response.data;
      }
    })
    .catch(function (error) {
      // if (ErrorHandler != undefined) {
      //   ErrorHandler({
      //     message: "Failed to add question sequence ",
      //     message_type: "error",
      //   });
      // }

      // setError(error);
      console.log(error);
      return error;
    });
  return response;
};

//NOTE:- GET All question sequence

export const getQuestionSequence = (cancer_type, ErrorHandler) => {
  let response = axios({
    method: "get",
    url: `http://localhost:6003/get_question_sequence?cancer_type=${cancer_type}`,
  })
    .then(function (response) {
      // console.log("Resposne", response);
      if (response.status === 200) {
        // ErrorHandler({
        //   message: "Successfully fetched data",
        //   message_type: "success",
        // });

        // setIsSaveButtonClicked(true);
        return response.data;
      }
    })
    .catch(function (error) {
      // setError(error);
      // ErrorHandler({
      //   message: "Failed to fetch data",
      //   message_type: "error",
      // });
      console.log(error);
      return error;
    });
  return response;
};

//DELETE Question Sequence

export const deleteQuestionSequence = (
  last_question_asked,
  next_question_asked,
  ErrorHandler
) => {
  let response = axios({
    method: "delete",
    url: `http://localhost:6003/delete_question_sequence?last_question_asked=${last_question_asked}&next_question_asked=${next_question_asked}`,
  })
    .then(function (response) {
      // console.log("Resposne", response);
      if (response.status === 200) {
        // setIsSaveButtonClicked(true);

        ErrorHandler({
          message: "Successfully deleted the question sequence ",
          message_type: "success",
        });

        return response.data;
      }
    })
    .catch(function (error) {
      ErrorHandler({
        message: "Failed delete the question sequence ",
        message_type: "error",
      });
      // setError(error);
      console.log(error);
      return error;
    });
  return response;
};

//NOTE:- UPDATE THE QUESTION SEQUENCE

export const updateQuestionSequence = (
  last_question_asked,
  next_question_asked,
  requestData,
  ErrorHandler,
  setIsSaveButtonClicked
) => {
  let data = {
    ...requestData,
  };

  // console.log("Sending the Data", data);
  let response = axios({
    method: "put",
    url: `http://localhost:6003/update_question_sequence?last_question_asked=${last_question_asked}&next_question_asked=${next_question_asked}`,
    data: data,
  })
    .then(function (response) {
      // console.log("Resposne", response);
      if (response.status === 200) {
        setIsSaveButtonClicked(true);
        ErrorHandler({
          message: "Successfully updated question sequence ",
          message_type: "success",
        });
        // setIsSaveButtonClicked(true);
        return response.data;
      }
    })
    .catch(function (error) {
      ErrorHandler({
        message: "Failed to update the question  sequence",
        message_type: "error",
      });
      // setError(error);
      console.log(error);
      return error;
    });
  return response;
};

//Add Section

export const addSection = (requestData, ErrorHandler) => {
  let data = {
    ...requestData,
  };
  // console.log("requestData", data);

  let response = axios({
    method: "post",
    url: "http://localhost:6003/add_section",
    data: data,
  })
    .then(function (response) {
      // console.log("Resposne", response);
      if (response.status === 200) {
        // setIsSaveButtonClicked(true);
        ErrorHandler({
          message: "Successfully add section",
          message_type: "success",
        });
        // setIsSaveButtonClicked(true);
        return response.data;
      }
    })
    .catch(function (error) {
      ErrorHandler({
        message: "Failed to add section",
        message_type: "error",
      });
      // setError(error);
      console.log(error);
      return error;
    });
  return response;
};

export const getSectionList = (sectionId, selectedLanguage, ErrorHandler) => {
  // console.log("requestData", data);
  // http://localhost:6003/get_section_list?section_id=HNN/SEC&selected_language=ENG
  let response = axios({
    method: "get",
    url: `http://localhost:6003/get_section_list?section_id=${sectionId}&selected_language=${selectedLanguage}`,
  })
    .then(function (response) {
      // console.log("Resposne", response);
      if (response.status === 200) {
        if (response.data.length === 0) {
          if (ErrorHandler != undefined) {
            ErrorHandler({
              message: "No data found",
              message_type: "info",
            });
          }
        } else {
          // setIsSaveButtonClicked(true);
          if (ErrorHandler != undefined) {
            ErrorHandler({
              message: "Successfully fetched section list",
              message_type: "success",
            });
          }
        }

        // setIsSaveButtonClicked(true);
        return response.data;
      }
    })
    .catch(function (error) {
      if (ErrorHandler != undefined) {
        ErrorHandler({
          message: "Failed to fetch section list",
          message_type: "error",
        });
      }

      // setError(error);
      console.log(error);
      return error;
    });
  return response;
};

export const deleteSection = (sectionId, selectedLanguage, ErrorHandler) => {
  // console.log("requestData", data);

  let response = axios({
    method: "delete",
    url: `http://localhost:6003/delete_section?section_id=${sectionId}&selected_language=${selectedLanguage}`,
  })
    .then(function (response) {
      // console.log("Resposne", response);
      if (response.status === 200) {
        // setIsSaveButtonClicked(true);
        if (ErrorHandler != undefined) {
          ErrorHandler({
            message: "Successfully deleted section",
            message_type: "success",
          });
        }

        // setIsSaveButtonClicked(true);
        return response.data;
      }
    })
    .catch(function (error) {
      if (ErrorHandler != undefined) {
        ErrorHandler({
          message: "Failed to delete section ",
          message_type: "error",
        });
      }

      // setError(error);
      console.log(error);
      return "Error";
    });
  return response;
};

export const updateSectionDetails = (
  questionId,
  selectedLanguage,
  requestData,
  ErrorHandler,
  setIsSaveButtonClicked
) => {
  let data = {
    ...requestData,
  };
  let response = axios({
    method: "put",
    url: `http://localhost:6003/update_section_details?question_id=${questionId}&selected_language=${selectedLanguage}`,
    data: data,
  })
    .then(function (response) {
      // console.log("Resposne", response);
      if (response.status === 200) {
        setIsSaveButtonClicked(true);
        ErrorHandler({
          message: "Successfully updated section details",
          message_type: "success",
        });

        // setIsSaveButtonClicked(true);
        return response.data;
      }
    })
    .catch(function (error) {
      ErrorHandler({
        message: "Failed to update section details ",
        message_type: "error",
      });
      // setError(error);
      console.log(error);
      return "Error";
    });
  return response;
};

export const addDemographicData = (
  requestData,
  setIsSaveButtonClicked,
  ErrorHandler
) => {
  let data = {
    ...requestData,
  };
  // console.log("requestData", data);

  let response = axios({
    method: "post",
    url: "http://localhost:6003/add_demographic_question",
    data: data,
  })
    .then(function (response) {
      // console.log("Resposne", response);
      if (response.status === 200) {
        setIsSaveButtonClicked(true);
        ErrorHandler({
          message: "Successfully added demographic question ",
          message_type: "success",
        });
        return response.data;
      }
    })
    .catch(function (error) {
      ErrorHandler({
        message: "Failed to add demographic question",
        message_type: "error",
      });
      // setError(error);
      console.log(error);
      return error;
    });
  return response;
};
