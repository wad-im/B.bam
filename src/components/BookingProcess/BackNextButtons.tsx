import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material"
import axios from "axios";
import { DateTime } from "luxon";
import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { Product } from "./CreateBooking";

interface BackNextButtonsProps {
    activeStep: number,
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    product: Product | undefined,
    location: string | undefined,
    time: DateTime |undefined,
}

const BackNextButtons = ({activeStep, setActiveStep, product, location, time}: BackNextButtonsProps)=>{

    const [user] = useContext(UserContext)
    const [status, setStatus] = useState<string | null | undefined>('initial')
    const navigate = useNavigate()

    const handleNext = () => {
        if(activeStep >= 3){
            makeBooking(product, location, time)
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

      const makeBooking = async (product: Product | undefined, location: string | undefined, time: DateTime | undefined) => {
        const accessToken = localStorage.getItem("access_token")
        const booked_time = time?.toISO()
        try {
            setStatus('Submitting')
            const response = await axios.post("/api/sendbooking", {accessToken, product, location, booked_time, user})
            if (response){
                setStatus('Success')
                navigate('/dashboard')
            }
        } catch (error: any) {
            console.log(error.response.data.error.message)
        }
      }


    return (
        <Box>
            {
                activeStep >= 3 ? 
                <LoadingButton
                 variant='contained'
                  onClick={handleNext}
                  type="submit" 
                  loading={Boolean(status === 'Submitting')}
                disabled={Boolean(status === 'Submitting')}
                >Confirm your booking</LoadingButton> : 
                <Button variant='contained' onClick={handleNext}>Next</Button>
            }

            <Button onClick={handleBack} disabled={Boolean(activeStep===0)}>Back</Button>
        </Box>
    )
}
export default BackNextButtons