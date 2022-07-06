import React, { useContext, useEffect } from "react";
import FirstStep from "./wizard_hoja_vida/FirstStep";
import SecondStep from "./wizard_hoja_vida//SecondStep";
import ThirdStep from "./wizard_hoja_vida//ThirdStep";
import { Stepper, StepLabel, Step } from "@mui/material";
import { multiStepContext } from "./StepContext";

function Wizard(data) {
  const { currentStep, setUserData } = useContext(multiStepContext);

  // useEffect(() => {
  //   if (data) {
  //     setUserData(data);
  //   }
  // }, [data]);

  function showStep(step) {
    switch (step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      default:
        return <FirstStep />;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="center-stepper">
          <Stepper
            style={{ width: "100%" }}
            activeStep={currentStep - 1}
            orientation="horizontal"
            alternativeLabel
          >
            <Step>
              <StepLabel>Datos de adquisición</StepLabel>
            </Step>
            <Step>
              <StepLabel>Caracteristicas tecnicas</StepLabel>
            </Step>
            <Step>
              <StepLabel>Hoja de apoyo tecnico</StepLabel>
            </Step>
          </Stepper>
        </div>
        {showStep(currentStep)}
      </header>
    </div>
  );
}

export default Wizard;
