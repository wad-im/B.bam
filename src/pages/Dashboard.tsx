import Paper  from "@mui/material/Paper"
import { Box } from "@mui/material"
import { Outlet} from "react-router-dom"
import DashboardHeader from "../components/DashboardHeader"


const Dashboard = () => {

    return (
        <Paper variant='outlined' sx={{mt: 4, p: 4, height: '75%'}}>
            <DashboardHeader/>
            <Box>
                <Outlet/>
            </Box>
        </Paper>
    )
}

export default Dashboard