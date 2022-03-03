import { FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material"

interface LocationSelectionProps {
    setLocation: React.Dispatch<React.SetStateAction<string | undefined>>
}

const LocationSelection = ({setLocation}: LocationSelectionProps)=>{

    const handleForm = (event: any)=>{
        setLocation(event.target.value)
    }

    return (
        <FormGroup sx={{py: 4}}>
            <RadioGroup name="radio-buttons-group">
                <FormControlLabel control={<Radio />} label='Amager' name='Amager' value='Amager' onChange={handleForm}/>
                <FormControlLabel control={<Radio />} label='Nordvest' name='Nordvest' value='Nordvest' onChange={handleForm}/>
            </RadioGroup>
        </FormGroup>
    )
}

export default LocationSelection