import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"

import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormHelperText from '@mui/material/FormHelperText';
import { UserContext } from "../context"


interface UserLogin {
    email: string,
    password: string,
}

const LoginForm = ()=>{

    let navigate =useNavigate()

    const [status, setStatus] = useState<string>("")
    const [errMsg, setErrMsg] =useState("")
    const [user, setUser] = useContext(UserContext)

    const authenticate = async (values: UserLogin) => {
        try {
            setStatus('Authenticating')
            const {data} = await axios.post("/api/login", { values })
            if (data){
                setUser({
                    data: {
                        id: data.session.user.id,
                        email: data.session.user.email
                    },
                    loading: false,
                    error: null
                })
                localStorage.setItem('access_token', data.session.access_token)
                navigate("/dashboard")
            }
        } catch (error:any) {
            setStatus('Error')
            setErrMsg(error.response.data.error.message)
        }
    }

    const formik = useFormik({
            initialValues: {
                email: "",
                password: ""
            },
            validationSchema: Yup.object({
                email: Yup.string()
                    .email("Invalid email address")
                    .required("No email provided."),
                password: Yup.string()
                    .required('No password provided.') 
                    .min(8, 'Password is too short - should be 8 chars minimum.')
                    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
            }),
            onSubmit: (values)=>{
                authenticate(values)
            }
        }
    ) 

    return (
        <Box component="form"  noValidate onSubmit={formik.handleSubmit} sx={{padding: 1, display: "flex", flexDirection: "column", marginTop: 4, '& .MuiTextField-root': {width: '35ch' }}}>
            <TextField
                placeholder="example@example.com"
                required
                label="Email"
                margin="normal"
                variant="standard"
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <TextField
                label="Password"
                type="password"
                margin="normal"
                variant="standard"
                required
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                helperText={formik.touched.password && formik.errors.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
            />
            {errMsg && <FormHelperText error={status === 'Error' ? true : false}>{errMsg}</FormHelperText> }
            <Button type="submit" variant="contained" size="medium" sx={{marginTop: 2}}>Login</Button>
        </Box>
    )
}
 export default LoginForm