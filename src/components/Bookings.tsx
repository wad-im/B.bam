import axios from "axios"
import React, { useEffect, useState } from "react"
import { List, ListItem, Divider, Typography, Box, Chip } from "@mui/material"
import { DateTime } from "luxon";
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

interface Booking {
    booking_id: string,
    created_at: string,
    booking_time: string,
    booked_location: string | null | undefined,
    booking_confirmed: boolean, 
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

    return bookings.length ? 
        <List>
            {bookings.map(booking => {
                const date = DateTime.fromISO(booking.booking_time).setLocale('en-us').toLocaleString(DateTime.DATE_HUGE)
                const time = DateTime.fromISO(booking.booking_time).toLocaleString(DateTime.TIME_24_SIMPLE)
                return (
                    <React.Fragment key={booking.booking_id}>
                        <ListItem  sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' , py: 2}} disablePadding>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Typography variant='h5' component='h3' sx={{fontWeight: 'medium'}} >{booking.product.product_name}</Typography>
                                <Chip label={booking.booking_confirmed ? 'Confirmed' : 'Confirmation Pending'} color={booking.booking_confirmed ? 'success' : 'warning'} variant='outlined' size="small" sx={{ml: 2}}/>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Box  color='info.main' sx={{display: 'flex', alignItems: 'center', ml: 4, }}>
                                    <EventIcon sx={{mr: 1}}/>
                                    <Typography>{date}</Typography>
                                </Box>
                                <Box color='info.main' sx={{display: 'flex', alignItems: 'center', ml: 4}}>
                                    <AccessTimeIcon sx={{mr: 1}}/>
                                    <Typography>{time}</Typography>
                                </Box>
                                <Box color='success.main' sx={{display: 'flex', alignItems: 'center', ml: 4}}>
                                    <LocationOnOutlinedIcon sx={{mr: 1}}/>
                                    <Typography>{booking.booked_location}</Typography>
                                </Box>
                            </Box>
                        </ListItem>
                        <Divider/>
                    </React.Fragment>
                )
        })}
        </List> : <Typography>It seems like you did not have a booking.</Typography>
    
}

export default Bookings