import { useContext } from "react"
import { Navigate, Outlet, Route } from "react-router-dom"
import { UserContext } from "../context"


const ProtectedRoute = ()=> {
    const [user] = useContext(UserContext)

    if (user.loading) return <div>Spinner ...</div>

    return user.data ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedRoute