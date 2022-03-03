import { Stepper } from "@mui/material"
import { useState } from "react"
import ProductSelection from "./ProductSelection";
import LocationSelection from "./LocationSelection";
import DateAndTimePicker from "./DateAndTimePicker";
import BookingSummary from "./BookingSummary";
import ProcessStep from "./ProcessStep";
import { DateTime } from "luxon";

export interface Product {
    product_name: string,
    product_id: string | undefined,
    product_description: string | null,
}

const CreateBooking = ()=>{

    const [activeStep, setActiveStep] = useState<number>(0)
    const [product, setProduct] = useState<Product>()
    const [location, setLocation] = useState<string>()
    const [time, setTime] = useState<DateTime>()

    return (
        <Stepper orientation="vertical" activeStep={activeStep}>
            <ProcessStep index={0} activeStep={activeStep} setActiveStep={setActiveStep} label='Choose your massage' component={<ProductSelection setProduct={setProduct}/>}/>
            <ProcessStep index={1}activeStep={activeStep} setActiveStep={setActiveStep} label='Select a location' component={<LocationSelection setLocation={setLocation}/>}/>
            <ProcessStep index={2} activeStep={activeStep} setActiveStep={setActiveStep} label='Schedule the massage' component={<DateAndTimePicker setTime={setTime}/>}/>
            <ProcessStep index={3} activeStep={activeStep} setActiveStep={setActiveStep} label='Summary' product={product} location={location} time={time} component={<BookingSummary product={product} location={location} time={time}/>}/>
        </Stepper>
    )
}

export default CreateBooking