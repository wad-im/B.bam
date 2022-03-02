import axios from "axios"
import React, { useEffect, useState } from "react"
import { List, ListItem, Divider, Typography } from "@mui/material"
import { DateTime } from "luxon";

interface Booking {
    booking_id: string,
    created_at: string,
    product: {
        product_description: string | null,
        product_id: string,
        product_name: string,
    }
}

const Bookings = ()=>{

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

    return bookings.length ? 
        <List>
            {bookings.map(booking => {
                const date = DateTime.fromISO(booking.created_at).setLocale('en-us').toLocaleString(DateTime.DATE_HUGE)
                const time = DateTime.fromISO(booking.created_at).toLocaleString(DateTime.TIME_24_SIMPLE)
                return (
                    <React.Fragment key={booking.booking_id}>
                        <ListItem  sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', py: 2}} disablePadding>
                            <Typography variant='h5' component='h3'>{booking.product.product_name}</Typography>
                            <Typography>booked on {date} at {time}</Typography>
                        </ListItem>
                        <Divider/>
                    </React.Fragment>
                )
        })}
        </List> : <Typography>It seems like you did not have a booking.</Typography>
    
}

export default Bookings