import { Typography, Box, Button } from "@mui/material"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context"
import axios from "axios";


const Header = ()=> {

    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()
    

    const logoutUserFromSupabase = async ()=>{
        try {
            await axios.post("/api/logout")
        } catch (error: any) {
           console.log(error.response.data) 
        }
    }

    const handleLogout = ()=>{
        setUser({
            data: null,
            loading: false,
            error: null
          })
          logoutUserFromSupabase()
          localStorage.removeItem("x-supabase-auth")
          navigate('/')
    }

    return (
        <Box component='header' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', px: 4}}>
            <Typography variant="h3" component="h2">B.bam</Typography>
            { user.data && (
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography sx={{mr: 2}}>{user.data.email}</Typography>
                    <Button variant='outlined' onClick={handleLogout}>Logout</Button>
                </Box>
                ) 
            }
        </Box>
    )
}

export default Header