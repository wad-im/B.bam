import { Box, Typography, Button } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

const DashboardHeader = ()=>{
    const navigate = useNavigate()
    const location = useLocation()
    const handleForward = ()=>{
        (location.pathname === '/dashboard/createbooking') ? 
        navigate('/dashboard') :
        navigate('/dashboard/createbooking')
    }

    const dashboardTitle = location.pathname === '/dashboard/createbooking' ? `Let's get you a massage` : 'Your bookings'

    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4}}>
            <Typography variant="h4" component="h2" sx={{fontWeight: "bold"}}>{dashboardTitle}</Typography>
            {
                location.pathname === '/dashboard/createbooking' ?
                <Button variant='text' onClick={handleForward} startIcon={<ArrowBackIosNewRoundedIcon/>}>Return to dashboard</Button> :
                <Button variant='contained' onClick={handleForward}>Make a booking</Button>
            }
        </Box>
    )
}
export default DashboardHeader