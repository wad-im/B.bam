import { FormControlLabel, FormGroup, Checkbox } from "@mui/material"

const LocationSelection = ()=>{
    return (
        <FormGroup sx={{py: 4}}>
            <FormControlLabel control={<Checkbox />} label='Amager'/>
            <FormControlLabel control={<Checkbox />} label='Nordvest'/>
        </FormGroup>
    )
}

export default LocationSelection