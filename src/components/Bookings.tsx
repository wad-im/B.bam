import axios from "axios"
import React, { useEffect, useState } from "react"
import { List, Typography} from "@mui/material"
import { DateTime } from "luxon";
import BookingItem from "./BookingItem";
import BookingArchive from "./BookingArchive";

export interface Booking {
    booking_id: string,
    created_at: string,
    booking_time: string,
    booked_location: string | null | undefined,
    booking_status: string, 
    product: {
        product_description: string | null,
        product_id: string,
        product_name: string,
    }
}

const Bookings = ()=>{

    const [bookings, setBookings] =useState<Booking[]>([])

    const fetchBookings = async ()=>{
        try {
            const {data} = await axios.get("/api/bookings")
            setBookings(data.booking)
        } catch (error: any) {
            console.log(error.response.data.error.message)
        }
    }

    useEffect(()=>{
        fetchBookings()
    },[])

    bookings.sort((a, b) => {
        const firstTime = DateTime.fromISO(a.booking_time)
        const secondTime = DateTime.fromISO(b.booking_time)
        if (firstTime < secondTime){
            return 1
        } else if (firstTime > secondTime){
            return -1
        } else {
            return 0
        }
    })  
    
    const currentTime = DateTime.now()
    let upcomingBookings = bookings.filter(booking => {
        const bookingTime = DateTime.fromISO(booking.booking_time)
        return bookingTime > currentTime
    })

    let pastBookings = bookings.filter(booking => {
        const bookingTime = DateTime.fromISO(booking.booking_time)
        return bookingTime < currentTime
    })
    

  
    return (
        <React.Fragment>
            {
                upcomingBookings ? 
                <List>
                    {
                        upcomingBookings.map(booking => (
                            <BookingItem key={booking.booking_id} booking={booking} bookings={bookings} setBookings={setBookings}/>
                        ))
                    }
                </List> : <Typography>{pastBookings.length ? 'You have not booked a new massage' : 'Book your first massage.'}</Typography>
            }
            {
                pastBookings && 
                <>
                    <Typography sx={{mt: 8, mb: 4, fontWeight: "bold", color: 'text.secondary'}} variant="h5" component="h2">Past bookings</Typography>
                    <BookingArchive bookings={pastBookings}/>
                </>
            }
        </React.Fragment>
    )
 
}

export default Bookings