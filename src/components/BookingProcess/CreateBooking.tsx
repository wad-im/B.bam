import { Stepper } from "@mui/material"
import { useState } from "react"
import ProductSelection from "./ProductSelection";
import LocationSelection from "./LocationSelection";
import DateAndTimePicker from "./DateAndTimePicker";
import BookingSummary from "./BookingSummary";
import ProcessStep from "./ProcessStep";

const CreateBooking = ()=>{

    const [activeStep, setActiveStep] = useState<number>(0)

    return (
        <Stepper orientation="vertical" activeStep={activeStep}>
            <ProcessStep index={0} activeStep={activeStep} setActiveStep={setActiveStep} label='Choose your massage' component={<ProductSelection/>}/>
            <ProcessStep index={1}activeStep={activeStep} setActiveStep={setActiveStep} label='Select a location' component={<LocationSelection/>}/>
            <ProcessStep index={2} activeStep={activeStep} setActiveStep={setActiveStep} label='Schedule the massage' component={<DateAndTimePicker/>}/>
            <ProcessStep index={3} activeStep={activeStep} setActiveStep={setActiveStep} label='Summary' component={<BookingSummary/>}/>
        </Stepper>
    )
}

export default CreateBooking