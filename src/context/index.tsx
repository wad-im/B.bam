import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface User {
    data: {
        id: string,
        email: string,
    } | null
    error: string | null,
    loading: boolean
}

const UserContext = createContext<[User, React.Dispatch<React.SetStateAction<User>>]>([
    {data: null,
    error: null,
    loading: true},
    ()=>{}
])

const UserProvider = ({children}:any)=>{
    const [user, setUser]=useState<User>({
        data: null,
        error: null,
        loading: true
    })

    const accessToken = localStorage.getItem("x-supabase-auth")

    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get("/api/user")
            if (data && data.user){
                setUser({
                    data: {
                        id: data.user.id,
                        email: data.user.email
                    },
                    loading: false,
                    error: null
                })
            }
        } catch (error: any) {
            if(error){
                setUser({
                    data: null,
                    loading: false,
                    error: error.response.data.error.message
                })
            }
        }
    }

    useEffect(()=>{
        if(accessToken){
            fetchUser()
        } else {
            setUser({
                data: null,
                loading: false,
                error: null
            })
        }
    },[])

    return <UserContext.Provider value={[user, setUser]}>
        {children}
    </UserContext.Provider>

}

export {UserContext, UserProvider}