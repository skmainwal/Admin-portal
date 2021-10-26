import React from "react";
import Menubar from "../components/menubar/Menubar";
import AllQueriesButtons from "../components/allQueriesButtons/AllQueriesButtons";
import AddQuestion from "../pages/addQuestion/AddQuestion";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Routes from "../routes/Routes";
import styles from "./Home.module.css";
const Home = () => {
  const reduxState = useSelector((state) => state);
  return (
    <div className={styles.home}>
      <div
        className={
          reduxState.lightMode === "TURN_OFF"
            ? styles.light_turnOff
            : styles.optionBar
        }
      >
        <div className={styles.home__emptySpace}>
          <img
            src="https://appointment-webbot.vengage.ai/static/media/chatboticon.fd50ca11.png"
            alt=""
            className={styles.vEngage_logo}
          />
        </div>
        <div className={styles.home__allQueriesButton}>
          <AllQueriesButtons />
        </div>
      </div>

      <div className={styles.home__container}>
        <div className={styles.menubar}>
          <Menubar />
        </div>
        <div className={styles.mainContainer}>
          <Routes />
        </div>
      </div>
    </div>
  );
};

export default Home;
