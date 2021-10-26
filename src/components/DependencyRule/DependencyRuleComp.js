import React, { useState, useEffect } from "react";
import Input from "../UI/Input";
import DependencyRule from "./DependencyRule";
// import styles from "../DependencyRule/DependencyRule.module";
import Checkbox from "@material-ui/core/Checkbox";
import InputBoxWithTitle from "../UI/InputBoxWithTitle";
import { useLocation } from "react-router";

import styles from "./DependencyRuleComp.module.css";
const DependencyRuleComp = (props) => {
  const location = useLocation();

  const [dependency, setDependency] = useState({
    contains: "",
    does_not_contain: "",
    ques_ans_flow: "",
    other: "",
  });

  const [nullDependency, setNullDependency] = useState("");

  // console.log("nullDependency", nullDependency);

  const [isCheckedNullDependency, setIsCheckedNullDependency] = useState(false);
  const [isCheckedDependencyRule, setIsCheckedDependencyRule] = useState(false);

  const nullDependencyHandler = (event) => {
    setIsCheckedNullDependency(event.target.checked);
    setIsCheckedDependencyRule(!event.target.checked);
    setNullDependency({ null: "NULL" });
    props.setEnteredDependency({ null: "NULL" });
    setDependency((prevState) => {
      return {
        ...prevState,
        contains: "",
        does_not_contain: "",
        ques_ans_flow: "",
        other: "",
      };
    });
  };

  const dependencyRuleHandler = (event) => {
    setIsCheckedDependencyRule(event.target.checked);
    setIsCheckedNullDependency(!event.target.checked);
    props.setEnteredDependency(dependency);
    setNullDependency("");
  };

  useEffect(() => {
    if (props.isSaveButtonClicked != undefined && props.isSaveButtonClicked) {
      setDependency({
        contains: "",
        does_not_contain: "",
        ques_ans_flow: "",
        other: "",
      });
      setNullDependency("");
      setIsCheckedNullDependency(false);
      setIsCheckedDependencyRule(false);
      props.setIsSaveButtonClicked(false);
    }
  }, [props.isSaveButtonClicked]);

  const dependencyHandler = (enteredDependency) => {
    // console.log("enteredDependency", enteredDependency);
    // props.addDependencyRuleHandler(enteredDependency);
    // console.log("Dependency", enteredDependency);
  };

  const onChangeHandler = (event) => {
    setDependency((prevState) => {
      return {
        ...prevState,
        [event.target.id]: event.target.value,
      };
    });

    let data = {
      ...dependency,
      [event.target.id]: event.target.value,
    };
    props.setEnteredDependency(data);

    setNullDependency("");
  };

  useEffect(() => {
    if (
      location.pathname === "/update_question_sequence" &&
      props.enteredDependency != null &&
      props.enteredDependency != undefined
    ) {
      if (props.enteredDependency.null === "NULL") {
        setIsCheckedNullDependency(true);
        setIsCheckedDependencyRule(false);
        setNullDependency({ null: "NULL" });
        setDependency((prevState) => {
          return {
            ...prevState,
            contains: "",
            does_not_contain: "",
            ques_ans_flow: "",
            other: "",
          };
        });
      } else {
        const { contains, does_not_contain, ques_ans_flow, other } =
          props.enteredDependency;
        setIsCheckedDependencyRule(true);
        setIsCheckedNullDependency(false);
        setDependency({
          contains,
          does_not_contain,
          ques_ans_flow,
          other,
        });
        setNullDependency("");
      }
    }
  }, [props.enteredDependency]);

  // useEffect(() => {
  //   if (isCheckedNullDependency) {
  //     props.setEnteredDependency(nullDependency);
  //   }
  //   if (isCheckedDependencyRule) {
  //     props.setEnteredDependency(dependency);
  //   }
  // }, [isCheckedNullDependency, isCheckedDependencyRule, dependency]);

  return (
    <div className={styles.questionInput}>
      <p className={styles.questionInput__title}>{props.title}</p>
      <div className={styles.chooseDependency}>
        <div className={styles.chooseCheckBox}>
          <div>Add Null As dependency</div>
          <Checkbox
            checked={isCheckedNullDependency}
            onChange={nullDependencyHandler}
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </div>
        <div className={styles.chooseCheckBox}>
          <div>Add Rule</div>
          <Checkbox
            // enteredDependency={props.enteredDependency}
            checked={isCheckedDependencyRule}
            onChange={dependencyRuleHandler}
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </div>
      </div>

      {isCheckedNullDependency && (
        <Input
          Value="NULL"
          checked={isCheckedNullDependency}
          dependencyHandler={dependencyHandler}
          onChangeHandler={onChangeHandler}
          readOnly={true}
        />
      )}
      {isCheckedDependencyRule && (
        <div className={styles.dependencyRule}>
          <InputBoxWithTitle
            Id="contains"
            title="Contains"
            placeholder="BRE/1.2.0-1"
            Value={dependency.contains}
            onChangeHandler={onChangeHandler}
          />
          <InputBoxWithTitle
            Id="does_not_contain"
            Value={dependency.does_not_contain}
            title="Does not contain"
            onChangeHandler={onChangeHandler}
          />
          <InputBoxWithTitle
            Id="ques_ans_flow"
            Value={dependency.ques_ans_flow}
            title="Ques ans flow"
            onChangeHandler={onChangeHandler}
          />
          <InputBoxWithTitle
            Id="other"
            Value={dependency.other}
            title="Other"
            onChangeHandler={onChangeHandler}
          />

          {/*<DependencyRuleInput title="Contains" />
      <DependencyRuleInput title="Does not contain" />
      <DependencyRuleInput title="Ques ans flow" />
  <DependencyRuleInput title="Other" />*/}
        </div>
      )}
    </div>
  );
};

export default DependencyRuleComp;
