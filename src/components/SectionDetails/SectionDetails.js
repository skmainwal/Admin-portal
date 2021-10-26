import React, { useState, useEffect } from "react";
import InputBoxWithTitle from "../UI/InputBoxWithTitle";
import styles from "./SectionDetails.module.css";
const SectionDetails = (props) => {
  const [sectionDetails, setSectionDetails] = useState({
    section_name: "",
    sub_section_name: "",
    section_count: "",
    sub_section_count: "",
    total_sections: "",
    total_sub_sections: "",
  });

  // console.log("sectionDetails", sectionDetails);
  const onChangeHandler = (event) => {
    setSectionDetails((prevState) => {
      return {
        ...prevState,
        [event.target.id]: event.target.value,
      };
    });
    let data = {
      ...sectionDetails,
      [event.target.id]: event.target.value,
    };
    props.sectionDetailsHandler(data);
    // console.log("Event");
  };

  useEffect(() => {
    if (props.isSaveButtonClicked != undefined && props.isSaveButtonClicked) {
      setSectionDetails({
        section_name: "",
        sub_section_name: "",
        section_count: "",
        sub_section_count: "",
        total_sections: "",
        total_sub_sections: "",
      });
    }
  }, [props.isSaveButtonClicked]);

  //NOTE:- Input Component
  const SectionInput = (props) => {
    return (
      <div className={styles.sectionInput}>
        <div className={styles.label}>{props.label}</div>
        <input
          type="text"
          value={props.Value}
          className={styles.sectionInputBox}
          placeholder={props.placeholder}
          onChange={props.inputChangeHandler}
        />
      </div>
    );
  };

  useEffect(() => {
    if (props.section_details != null && props.section_details != undefined) {
      const {
        section_name,
        sub_section_name,
        section_count,
        sub_section_count,
        total_sections,
        total_sub_sections,
      } = props.section_details;
      props.sectionDetailsHandler({
        section_name: section_name,
        sub_section_name: sub_section_name,
        section_count: section_count,
        sub_section_count: sub_section_count,
        total_sections: total_sections,
        total_sub_sections: total_sub_sections,
      });
      setSectionDetails((prevState) => {
        return {
          ...prevState,
          section_name: section_name,
          sub_section_name: sub_section_name,
          section_count: section_count,
          sub_section_count: sub_section_count,
          total_sections: total_sections,
          total_sub_sections: total_sub_sections,
        };
      });
    }
  }, []);

  return (
    <div className={styles.sectionDetails}>
      <div className={styles.sectionDetails__title}>Section Details</div>
      <div className={styles.sectionDetails__inputs}>
        <div className={styles.sectionDetails__inputBox}>
          <InputBoxWithTitle
            title="Section Name"
            Id="section_name"
            Value={sectionDetails.section_name}
            placeholder="Section Name"
            onChangeHandler={onChangeHandler}
          />
          <InputBoxWithTitle
            title="Sub Section Name"
            Id="sub_section_name"
            Value={sectionDetails.sub_section_name}
            placeholder="Sub Section Name"
            onChangeHandler={onChangeHandler}
          />
        </div>
        <div className={styles.sectionDetails__inputBox}>
          <InputBoxWithTitle
            title="Section Count"
            Id="section_count"
            type="number"
            Value={sectionDetails.section_count}
            placeholder="Ex: 1"
            onChangeHandler={onChangeHandler}
          />
          <InputBoxWithTitle
            title="Sub Section Count"
            Id="sub_section_count"
            type="number"
            Value={sectionDetails.sub_section_count}
            placeholder="EX: 2"
            onChangeHandler={onChangeHandler}
          />
        </div>
        <div className={styles.sectionDetails__inputBox}>
          <InputBoxWithTitle
            title="Total Sections "
            Id="total_sections"
            type="number"
            Value={sectionDetails.total_sections}
            placeholder="Ex: 5"
            onChangeHandler={onChangeHandler}
          />
          <InputBoxWithTitle
            title="Total Sub Sections"
            Id="total_sub_sections"
            type="number"
            Value={sectionDetails.total_sub_sections}
            placeholder="Ex: 3"
            onChangeHandler={onChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionDetails;
