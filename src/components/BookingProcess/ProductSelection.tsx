import {  FormControlLabel, FormControl, Radio, RadioGroup } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Product } from "./CreateBooking"

interface ProductSelectionProps {
    setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>
}


const ProductSelection = ({setProduct}: ProductSelectionProps) => {

    const [products, setProducts] =useState<Product[]>([])

    const fetchProducts = async ()=>{
        const accessToken = localStorage.getItem("access_token")
        try {
            const {data} = await axios.post("/api/product", {accessToken})
            setProducts(data.product)
        } catch (error: any) {
            console.log(error.response.data.error.message)
        }
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    const handleForm = (event: any)=>{
        setProduct({
            product_name: event.target.name,
            product_id: event.target.id,
            product_description: null
            }
        )
    }

    return (
        <FormControl sx={{py: 4}}>
            <RadioGroup name="radio-buttons-group">
                {
                    products.map((product) => 
                        <FormControlLabel
                        control={<Radio id={product.product_id} />}
                        label={product.product_name}
                        key={product.product_id}
                        value={product.product_name}
                        name={product.product_name}
                        onChange={handleForm}
                        />
                        
                    )
                }
            </RadioGroup>
        </FormControl>
    )
}

export default ProductSelection