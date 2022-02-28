import { Typography, Box, Button } from "@mui/material"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context"
import axios from "axios";


const Header = ()=> {

    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()
    

    const logoutUserFromSupabase = async ()=>{
        const accessToken = localStorage.getItem("access_token")
        try {
            await axios.post("/api/logout", {accessToken})
        } catch (error: any) {
           console.log(error.response.data.error) 
        }
    }

    const handleLogout = ()=>{
        setUser({
            data: null,
            loading: false,
            error: null
          })
          logoutUserFromSupabase()
          localStorage.removeItem("access_token")
          navigate('/')
    }

    return (
        <Box component='header' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <Typography variant="h3" component="h2">B.bam</Typography>
            { user.data && <Button variant='outlined' onClick={handleLogout}>Logout</Button> }
        </Box>
    )
}

export default Header