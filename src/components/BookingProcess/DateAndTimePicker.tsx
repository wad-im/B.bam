import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import { Box, TextField } from "@mui/material";
import { DateTime } from "luxon";
import { useState } from "react";


interface DateAndTimePickerProps {
    setTime: React.Dispatch<React.SetStateAction<DateTime | undefined>>
}

const DateAndTimePicker = ({setTime}:DateAndTimePickerProps )=>{

    const [pickedTime, setPickedTime] = useState<DateTime>()
    
    const handleForm = async (newValue: any)=>{
        setPickedTime(newValue)
        pickedTime && setTime(pickedTime)
    }
    
     return (
        <Box sx={{my: 4}}>
            <LocalizationProvider dateAdapter={AdapterLuxon} locale='en-gb'>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="DateTimePicker"
                    value={pickedTime}
                    onChange={(newValue) => {
                        handleForm(newValue)
                    }}
                />
            </LocalizationProvider>
        </Box>
    )
}

export default DateAndTimePicker