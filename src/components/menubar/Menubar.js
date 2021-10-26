import React, { useState } from "react";
import DropDown from "../dropDown/DropDown";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { turnOffAndOnLightMode } from "../../store/action";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
// import { IconButton } from "@material-ui/core";
import "./Menubar.css";
const Menubar = () => {
  const dispatch = useDispatch();

  const [toggleLightMode, setToggleLightMode] = useState(false);
  const turnOnOffLightHandler = (mode) => {
    setToggleLightMode((prevState) => !prevState);
    dispatch(turnOffAndOnLightMode(mode));
  };

  return (
    <div className="menuBar">
      <div className="menuBar__dropDowns">
        {toggleLightMode ? (
          <Tooltip title="Turn On light mode">
            <IconButton onClick={() => turnOnOffLightHandler("TURN_ON")}>
              <LightModeIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Turn off the light">
            <IconButton onClick={() => turnOnOffLightHandler("TURN_OFF")}>
              <NightlightIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <div className="menuBar__logout">
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ExitToAppIcon />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Menubar;
