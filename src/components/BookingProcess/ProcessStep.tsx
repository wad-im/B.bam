import { Step, StepContent, StepLabel } from "@mui/material"
import React from "react";
import BackNextButtons from "./BackNextButtons";

interface ProcessStepProps {
    index: number,
    label: string,
    activeStep: number,
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    component: JSX.Element
}

const ProcessStep = ({index,label, activeStep, setActiveStep, component}: ProcessStepProps)=>{
    return (
        <Step index={index}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
                    {component}
                    <BackNextButtons activeStep={activeStep} setActiveStep={setActiveStep}/>
            </StepContent>
        </Step>
    )
}

export default ProcessStep