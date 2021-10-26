import React, { useEffect } from "react";
import Home from "./home/Home";
import ErrorPopUp from "./components/ErrorPopUp/ErrorPopUp";
import "react-toastify/dist/ReactToastify.css";
import "devextreme/dist/css/dx.light.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import {
  cancerAndLanguageTypeFunc,
  responseTypeAndDataToProcessFunc,
} from "./store/action";
import {
  CancerTypesAndLanguges,
  ResponseTypeDataToProcess,
} from "./api_requests/ApiRequests";
import { useSelector } from "react-redux";
import styles from "./App.module.css";

function App() {
  const reduxState = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(async () => {
    let cancer_types_and_languges = await CancerTypesAndLanguges();
    let resposne_type_data_to_process = await ResponseTypeDataToProcess();
    dispatch(cancerAndLanguageTypeFunc(cancer_types_and_languges));
    dispatch(responseTypeAndDataToProcessFunc(resposne_type_data_to_process));
  }, []);

  return (
    <div
      className={
        reduxState.lightMode === "TURN_OFF" ? styles.light__turnOff : styles.App
      }
    >
      {reduxState.error != null && (
        <ErrorPopUp
          message={reduxState.error.message}
          message_type={reduxState.error.message_type}
        />
      )}
      <Home />
    </div>
  );
}

export default App;
