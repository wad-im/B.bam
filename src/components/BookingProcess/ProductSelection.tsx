import {  FormGroup, Typography, FormControlLabel, Checkbox } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"

interface Product {
    product_name: string,
    product_id: string | null,
    product_description: string | null,
}


const ProductSelection = () => {

    const [product, setProduct] =useState<Product[]>([])
    const [isSelectedProduct, setIsSelectedProduct] = useState<Product>({product_name: '', product_id: null, product_description: null })

    const fetchProducts = async ()=>{
        const accessToken = localStorage.getItem("access_token")
        try {
            const {data} = await axios.post("/api/product", {accessToken})
            setProduct(data.product)
        } catch (error: any) {
            console.log(error.response.data.error.message)
        }
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    

    return (
        <FormGroup sx={{py: 4}}>
            {
                product.map(product => 
                    <FormControlLabel control={<Checkbox />} label={product.product_name} key={product.product_id}/>
                )
            }
        </FormGroup>
    )
}

export default ProductSelection