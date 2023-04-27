import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import classes from "./MainContainer.module.css";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import PersonIcon from "@mui/icons-material/Person";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import ProvideUsername from "../ProvideUsername/ProvideUsername";
import ProvideCode from "../ProvideCode/ProvideCode";
import ChangePassword from "../ChangePassword/ChangePassword";
import ForgetSuccess from "../ForgetSuccess/ForgetSuccess";

const MainContainer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const handleToNextStep = useCallback(() => {
    setCurrentStep((oldState) => oldState + 1);
  }, []);

  const handleChangeMess = useCallback((responseMessage) => {
    setMessage(responseMessage);
  }, []);

  const handleChangeUsername = useCallback((username) => {
    setUsername(username);
  }, []);

  return (
    <section className={classes["main-wrapper"]}>
      <Container>
        <div className={classes["header-container"]}>
          <FmdBadIcon className={classes["header-icon"]} />
          <h2 className={classes["main-header"]}>
            Hãy nhập thông tin và làm theo chỉ dẫn
          </h2>
        </div>
        <div className={classes["content-wrapper"]}>
          <div className={classes["line-wrapper"]}>
            <div className={classes["line"]}></div>
            <div className={classes["icons-wrapper"]}>
              <div
                className={`${classes["icon-item"]} ${
                  currentStep === 1 ? classes.active : ""
                }`}
              >
                <PersonIcon />
              </div>
              <div
                className={`${classes["icon-item"]} ${
                  currentStep === 2 ? classes.active : ""
                }`}
              >
                <GppGoodIcon />
              </div>
              <div
                className={`${classes["icon-item"]} ${
                  currentStep === 3 ? classes.active : ""
                }`}
              >
                <ModeEditIcon />
              </div>
              <div
                className={`${classes["icon-item"]} ${
                  currentStep === 4 ? classes.active : ""
                }`}
              >
                <FileDownloadDoneIcon />
              </div>
            </div>
          </div>
          {currentStep === 1 && (
            <ProvideUsername
              onToNextStep={handleToNextStep}
              onChangeMessage={handleChangeMess}
              onChangeUsername={handleChangeUsername}
            />
          )}
          {currentStep === 2 && (
            <ProvideCode
              onToNextStep={handleToNextStep}
              message={message}
              username={username}
            />
          )}
          {currentStep === 3 && (
            <ChangePassword
              onToNextStep={handleToNextStep}
              username={username}
            />
          )}
          {currentStep === 4 && <ForgetSuccess />}
        </div>
      </Container>
    </section>
  );
};

export default MainContainer;
