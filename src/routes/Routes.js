import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import AddQuestion from "../pages/addQuestion/AddQuestion";
import UpdateQuestion from "../pages/updateQuestion/UpdateQuestion";
import AddQuestionSequence from "../pages/addQuestionSequence/AddQuestionSequence";
import UpdateQuestionSequence from "../pages/updateQuestionSequence/UpdateQuestionSequence";
import ResponseOptions from "../components/ReponseOptions/ResponseOptions";
import QuestionUpdateModal from "../components/QuestionUpdateModal/QuestionUpdateModal";
import AddSection from "../pages/addSection/AddSection";
import UpdateSection from "../pages/updateSection/UpdateSection";
import TestErrorFile from "../TestErrorFile";

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/add_question_sequence"
        component={AddQuestionSequence}
      />
      <Route exact path="/update_question" component={UpdateQuestion} />
      <Route
        exact
        path="/update_question_sequence"
        component={UpdateQuestionSequence}
      />
      <Route exact path="/add_section" component={AddSection} />
      <Route exact path="/update_section" component={UpdateSection} />
      <Route path="/" component={AddQuestion} />
      <Route component={TestErrorFile} />
    </Switch>
  );
};

export default Routes;
