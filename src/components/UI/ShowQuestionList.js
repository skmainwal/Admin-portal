import React from "react";

import styles from "./ShowQuestionList.module.css";
import Question from "./Question";
import { style } from "dom-helpers";

const questionList = [
  { question_id: "BRE/SEC/1.0.0" },
  { question_id: "BRE/SEC/2.0.0" },
  { question_id: "BRE/SEC/3.0.0" },
  { question_id: "BRE/SEC/4.0.0" },
  { question_id: "BRE/SEC/5.0.0" },
  { question_id: "BRE/SEC/6.0.0" },
];

const ShowQuestionList = (props) => {
  const SectionList = () => {
    return (
      <div>
        {props.sectionList.map((question) => {
          const { question_id, response_options, in_language } = question;
          const { section_name } = response_options[0];
          console.log("section_name", section_name);
          return (
            <Question
              questionDetails={question}
              question_id={question_id}
              question={section_name}
              questionList={props.sectionList}
              in_language={in_language}
              questionListHandler={props.questionListHandler}
              setQuestionDetail={props.setQuestionDetail}
            />
          );
        })}
      </div>
    );
  };
  return (
    <div className={styles.showQuestionList}>
      <SectionList />
    </div>
  );
};

export default ShowQuestionList;
