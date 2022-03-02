import { Box, Button } from "@mui/material"

interface BackNextButtonsProps {
    activeStep: number,
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

const BackNextButtons = ({activeStep, setActiveStep}: BackNextButtonsProps)=>{

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

    return (
        <Box>
            <Button variant='contained' onClick={handleNext}>{activeStep >= 3 ? 'Confirm your booking' : 'Next'}</Button>
            <Button onClick={handleBack} disabled={Boolean(activeStep===0)}>Back</Button>
        </Box>
    )
}
export default BackNextButtons