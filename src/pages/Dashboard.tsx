import Typography  from "@mui/material/Typography"
import Paper  from "@mui/material/Paper"
import { Box, Button } from "@mui/material"
import BookingsList from "../components/BookingsList"


const Dashboard = () => {

    
    return (
        <Paper variant='outlined' sx={{mt: 4, p: 4, height: '75%'}}>
            <Box sx={{display: 'flex', justifyContent: "space-between", mb: 4}}>
                <Typography variant="h4" component="h2" sx={{fontWeight: "bold"}}>Your bookings</Typography>
                <Button variant='contained'>Make a booking</Button>
            </Box>
            <Box>
                <BookingsList/>
            </Box>
        </Paper>
    )
}

export default Dashboard