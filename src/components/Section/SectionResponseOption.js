import React, { useState, useEffect } from "react";
import InputBoxWithTitle from "../UI/InputBoxWithTitle";
import styles from "./SectionResponseOption.module.css";
const SectionResponseOption = (props) => {
  const [responseOption, setResponseOption] = useState({
    section_name: "",
    current_count: "",
    total_count: "",
  });

  //   console.log("responseOption", responseOption);

  const onChangeHandler = (event) => {
    setResponseOption((prevState) => {
      return {
        ...prevState,
        [event.target.id]: event.target.value,
      };
    });

    let data = {
      ...responseOption,
      [event.target.id]: event.target.value,
    };
    props.responseOptionHandler(data);
  };

  useEffect(() => {
    if (
      props.responseOptions != undefined &&
      props.responseOptions[0] != undefined
    ) {
      console.log(" props.responseOptions", props.responseOptions);
      const { section_name, current_count, total_count } =
        props.responseOptions[0];
      console.log("props.responseOptions", section_name);
      setResponseOption((prevState) => {
        return {
          ...prevState,
          section_name,
          current_count,
          total_count,
        };
      });
    }
  }, [props.responseOptions]);

  return (
    <div className={styles.sectionResponseOption}>
      <div className={styles.sectionResponseOption__sectionNameAndcurrentCount}>
        <InputBoxWithTitle
          title="Section Name"
          Id="section_name"
          Value={responseOption.section_name}
          placeholder="Section Name"
          onChangeHandler={onChangeHandler}
        />
        <InputBoxWithTitle
          title="Current Count"
          Value={responseOption.current_count}
          Id="current_count"
          type="number"
          placeholder="Ex:- 1"
          onChangeHandler={onChangeHandler}
        />

        <InputBoxWithTitle
          title="Total Count"
          Value={responseOption.total_count}
          Id="total_count"
          type="number"
          placeholder="Ex:- 1"
          onChangeHandler={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default SectionResponseOption;
