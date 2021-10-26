const initialState = {
  inLanguage: [],
  cancerTypes: [],
  resposnseType: [],
  dataToProcess: [],
  error: null,
  updatedQuestionSequence: null,
  responseType: null,
  selectedQuestionType: null,
  lightMode: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "CANCER_LANGUAGE":
      return {
        ...state,
        cancerTypes: action.payload[0].cancer_types,
        inLanguage: action.payload[1].language_types,
      };
    case "RESPONSE_DATA_TO_PROCESS":
      // console.log("PayLoad", action.payload);
      return {
        ...state,
        resposnseType: action.payload[0].response_types,
        dataToProcess: action.payload[1].data_to_processs,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "UPDATE_QUESTION_SEQUENCE":
      return {
        ...state,
        updatedQuestionSequence: action.payload,
      };

    case "DEPENDENCY_RULE":
      if (state.updatedQuestionSequence != null) {
        const {
          last_question_list,
          next_question,
          is_first_question,
          is_last_question,
          dependency_rule,
        } = state.updatedQuestionSequence;
        return {
          ...state,
          updatedQuestionSequence: {
            last_question_list,
            next_question,
            is_first_question,
            is_last_question,
            dependency_rule: action.payload,
          },
        };
      }
    case "RESONSE_TYPE":
      return {
        ...state,
        responseType: action.payload,
      };
    case "QUESTION_TYPE":
      return {
        ...state,
        selectedQuestionType: action.payload,
      };

    case "LIGHT_MODE":
      return {
        ...state,
        lightMode: action.payload,
      };
    default:
      return state;
  }
}
