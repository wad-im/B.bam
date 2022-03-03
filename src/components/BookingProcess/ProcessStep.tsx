import { Step, StepContent, StepLabel } from "@mui/material"
import { DateTime } from "luxon";
import React from "react";
import BackNextButtons from "./BackNextButtons";
import { Product } from "./CreateBooking";

interface ProcessStepProps {
    index: number,
    label: string,
    activeStep: number,
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    component: JSX.Element
    product?: Product |undefined,
    location?: string |undefined,
    time?: DateTime |undefined,

}

const ProcessStep = ({index,label, activeStep, setActiveStep, component, product, location, time}: ProcessStepProps)=>{
    return (
        <Step index={index}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
                    {component}
                    <BackNextButtons activeStep={activeStep} setActiveStep={setActiveStep} product={product} location={location} time={time}/>
            </StepContent>
        </Step>
    )
}

export default ProcessStep