import React, { useState, useEffect, useCallback } from "react";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import InputBoxWithTitle from "../UI/InputBoxWithTitle";
import { useSelector } from "react-redux";
import styles from "./DependencyRule.module.css";
const DependencyRule = (props) => {
  // console.log("enteredDependency", props.enteredDependency);
  const reduxState = useSelector((state) => state);

  const [dependency, setDependency] = useState({
    contains: "",
    does_not_contain: "",
    ques_ans_flow: "",
    other: "",
  });

  const [dependencyData, setDependencyData] = useState(null);
  if (props.enteredDependency != "" && props.enteredDependency != undefined) {
    const { contains, does_not_contain, ques_ans_flow, other } =
      props.enteredDependency;
    setDependency((prevState) => {
      return {
        ...prevState,
        contains: contains,
        does_not_contain: does_not_contain,
        ques_ans_flow: ques_ans_flow,
        other: other,
      };
    });
  }

  useEffect(() => {
    if (
      props.enteredDependency != null &&
      props.enteredDependency != undefined
    ) {
      const { contains, does_not_contain, ques_ans_flow, other } =
        props.enteredDependency;

      // setDependency((prevState) => {
      //   return {
      //     ...prevState,
      //     contains: contains,
      //     does_not_contain: does_not_contain,
      //     ques_ans_flow: ques_ans_flow,
      //     other: other,
      //   };
      // });
    }
  }, [props.enteredDependency]);

  useEffect(() => {
    // console.log("enteredDependency DependencyRule", props.enteredDependency);
    // if (props.enteredDependency[0] != undefined) {
    //   const { contains, does_not_contain, ques_ans_flow, other } =
    //     props.enteredDependency[0];
    //   setDependency((prevState) => {
    //     return {
    //       ...prevState,
    //       contains: contains,
    //       does_not_contain: does_not_contain,
    //       ques_ans_flow: ques_ans_flow,
    //       other: other,
    //     };
    //   });
    // } else if (props.enteredDependency != undefined) {
    //   const { contains, does_not_contain, ques_ans_flow, other } =
    //     props.enteredDependency[0];
    //   setDependency((prevState) => {
    //     return {
    //       ...prevState,
    //       contains: contains,
    //       does_not_contain: does_not_contain,
    //       ques_ans_flow: ques_ans_flow,
    //       other: other,
    //     };
    //   });
    // }
  }, []);

  const onChangeHandler = (event) => {
    setDependency((prevState) => {
      return {
        ...prevState,
        [event.target.id]: event.target.value,
      };
    });
  };
  useEffect(
    useCallback(() => {
      props.dependencyHandler(dependency);
    }, [dependency]),
    [dependency]
  );
  return (
    <div className={styles.dependencyRule}>
      <InputBoxWithTitle
        Id="contains"
        title="Contains"
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
  );
};

export default DependencyRule;
