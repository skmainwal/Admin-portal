import React, { useState, useCallback, useEffect } from "react";
import QueryButton from "../UI/QueryButton";
import { useLocation } from "react-router-dom";
let queryPath = [
  {
    name: "Add New Question",
    path: "/",
    id: "1",
  },
  {
    name: "Update Question",
    path: "/update_question",
    id: "2",
  },
  {
    name: "Add Question Sequence",
    path: "/add_question_sequence",
    id: "3",
  },
  {
    name: "Update Question Sequence",
    path: "/update_question_sequence",
    id: "4",
  },
  {
    name: "Add Section ",
    path: "/add_section",
    id: "5",
  },
  {
    name: "Update Section",
    path: "/update_section",
    id: "6",
  },
];

const AllQueriesButtons = () => {
  const location = useLocation();

  const [activeButton, seAtctiveButton] = useState("");

  const tabSwitchHandler = useCallback(
    (id) => {
      seAtctiveButton(id);
    },
    [activeButton]
  );

  //TO SET THE CURRENT ACTIVE BUTTON  BASED ON THE URL PATH
  useEffect(() => {
    let SelectedMenu = queryPath.find(
      (_item) => location.pathname === _item.path
    );
    seAtctiveButton(SelectedMenu.id);
  }, []);

  return (
    <div className="allQueriesButtons">
      {queryPath.map((query) => (
        <QueryButton
          key={query.id}
          id={query.id}
          path={query.path}
          name={query.name}
          tabHandler={tabSwitchHandler}
          activeButton={activeButton}
        />
      ))}
    </div>
  );
};

export default AllQueriesButtons;
