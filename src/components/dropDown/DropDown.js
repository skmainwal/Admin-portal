import React, { useState, useEffect, useCallback } from "react";
import { SelectBox } from "devextreme-react/select-box";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { responseTypeSelection } from "../../store/action";

import "./DropDown.css";

const dropDownOptions = {
  height: 180,
};
const DropDown = (props) => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  let ResponseType = reduxState.responseType;
  // console.log("DATA", props.data);
  const [selectedOption, setSelectedOption] = useState("");

  const onValueChanged = useCallback((e) => {
    // console.log(e.previousValue);
    props.onChangeHandler(props.Id, e.value);
    setSelectedOption(e.value);

    if (props.Id === "response_type") {
      dispatch(responseTypeSelection(e.value));
    }
    // console.log("DropDown Value", e.value);
    // console.log(e.value);
  }, []);

  useEffect(() => {
    setSelectedOption(props.Value);
    if (props.Id === "response_type") {
      dispatch(responseTypeSelection(props.Value));
    }
    if (props.Id === "data_to_process") {
      if (
        ResponseType === "NAME" ||
        ResponseType === "TEXT" ||
        ResponseType === "DOB" ||
        ResponseType === "MOBILE" ||
        ResponseType === "ESIC_NUMBER" ||
        ResponseType === "REFERRING_DOCTOR_NAME"
      ) {
        setSelectedOption(ResponseType);
      }
    }

    // onValueChanged(props.Id, props.Value);
    // const filteredData = props.data.filter((option)=>option.onChangeHandler)
    // props.onChangeHandler(props.)
  }, [props.Value, ResponseType]);

  return (
    <div className="dropDown">
      <p className="dropDown__title">{props.title}</p>
      <SelectBox
        dataSource={props.data}
        valueExpr="ID"
        value={selectedOption}
        displayExpr="Name"
        searchEnabled={true}
        onValueChanged={onValueChanged}
        dropDownOptions={dropDownOptions}
      />
    </div>
  );
};

export default DropDown;
