import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import { Box, TextField } from "@mui/material";
import { useState } from "react";


const DateAndTimePicker = ()=>{

    const [time, setTime] = useState<any>()

    return (
        <Box sx={{my: 4}}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="DateTimePicker"
                    value={time}
                    onChange={(newValue) => {
                    setTime(newValue);
                    }}
                />
            </LocalizationProvider>
        </Box>
    )
}

export default DateAndTimePicker