import axios from "axios"
import React, { useEffect, useState } from "react"
import { List, ListItem, Divider, Typography } from "@mui/material"

interface Booking {
    booking_id: string,
    created_at: string,
    product: {
        product_description: string | null,
        product_id: string,
        product_name: string,
    }
}

const BookingsList = ()=>{

    const [bookings, setBookings] =useState<Booking[]>([])

    const fetchBookings = async ()=>{
        const accessToken = localStorage.getItem("access_token")
        try {
            const {data} = await axios.post("/api/bookings", {accessToken})
            setBookings(data.booking)
        } catch (error: any) {
            console.log(error.response.data.error.message)
        }
    }

    useEffect(()=>{
        fetchBookings()
    },[])

    console.log(bookings)

    return bookings.length ? 
        <List>
            {bookings.map(booking => (
                <React.Fragment key={booking.booking_id}>
                    <ListItem  sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', py: 2}} disablePadding>
                        <Typography variant='h5' component='h3'>{booking.product.product_name}</Typography>
                        <Typography>booked on {booking.created_at}</Typography>
                    </ListItem>
                    <Divider/>
                </React.Fragment>
                    
                
            ))}
        </List> : <Typography>It seems like you did not have a booking.</Typography>
    
}

export default BookingsList