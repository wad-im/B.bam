import Paper from "@mui/material/Paper"
import Typography  from "@mui/material/Typography"
import Box from "@mui/system/Box"
import { useContext } from "react"
import { Link } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import { UserContext } from "../context"

const Login = () => {

    const [user, setUser] = useContext(UserContext)

    return (
        <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            {
                user.data ? 
                <Typography>You are already logged in. Go to your <Link to='/dashboard'>dashboard</Link></Typography> : 
                <Paper sx={{display: "flex", flexDirection: "column", alignItems: "flex-start", width: 'fit-content', heigth: 'fit-content', p: 4, alignSelf: "center"}}>
                    <Box >
                        <Typography variant="h4" component="h1">Login</Typography>
                        <Typography variant="body1">Login to book an appointment.</Typography>
                    </Box>
                    <Box>
                        <LoginForm/>
                    </Box>
                </Paper>
            }
        </Box>
    )
}

export default Login