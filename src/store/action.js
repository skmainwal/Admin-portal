export const cancerAndLanguageTypeFunc = (cancerAndLanguageData) => ({
  type: "CANCER_LANGUAGE",
  payload: cancerAndLanguageData,
});

export const responseTypeAndDataToProcessFunc = (
  resposneAndDataToProcessData
) => ({
  type: "RESPONSE_DATA_TO_PROCESS",
  payload: resposneAndDataToProcessData,
});

export const errorHandlerFunc = (errorMessage) => ({
  type: "ERROR",
  payload: errorMessage,
});

export const updatedQuestionSequence = (data) => ({
  type: "UPDATE_QUESTION_SEQUENCE",
  payload: data,
});

export const dependecyRuleFunc = (data) => ({
  type: "DEPENDENCY_RULE",
  payload: data,
});

export const responseTypeSelection = (response) => ({
  type: "RESONSE_TYPE",
  payload: response,
});

export const selectedQuestionTypeFun = (questionType) => ({
  type: "QUESTION_TYPE",
  payload: questionType,
});

export const turnOffAndOnLightMode = (mode) => ({
  type: "LIGHT_MODE",
  payload: mode,
});
