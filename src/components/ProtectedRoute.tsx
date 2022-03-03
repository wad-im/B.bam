import { Backdrop, CircularProgress } from "@mui/material"
import { useContext } from "react"
import { Navigate, Outlet, useLocation} from "react-router-dom"
import { UserContext } from "../context"


const ProtectedRoute = ()=> {
    const [user] = useContext(UserContext)
    const location = useLocation()

    if (user.loading) return <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={user.loading}>
    <CircularProgress color="inherit" />
  </Backdrop>

    return user.data ? <Outlet/> : <Navigate to='/' replace state={{ from: location }}/>
}

export default ProtectedRoute