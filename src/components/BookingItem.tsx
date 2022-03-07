import { ListItem, Divider, Typography, Box, Chip } from "@mui/material"
import { DateTime } from "luxon";
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EditBooking from "./EditBooking";
import { Booking } from './Bookings';
import React from "react";

interface BookingItemProps {
    booking: Booking,
    bookings: Booking[],
    setBookings: React.Dispatch<React.SetStateAction<Booking[]>>

}

const BookingItem = ({booking, bookings, setBookings}:BookingItemProps)=>{

    const date = DateTime.fromISO(booking.booking_time).setLocale('en-gb').toLocaleString(DateTime.DATE_HUGE)
    const time = DateTime.fromISO(booking.booking_time).toLocaleString(DateTime.TIME_24_SIMPLE)

    return (
        <React.Fragment>
            <ListItem  sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' , py: 2}} disablePadding>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant='h5' component='h4' sx={{fontWeight: 'medium'}} >{booking.product.product_name}</Typography>
                    <Chip label={booking.booking_status && booking.booking_status} color={booking.booking_status === 'confirmed' ? 'success' : 'warning'} variant='outlined' size="small" sx={{mx: 2}}/>
                    <EditBooking bookings={bookings} setBookings={setBookings} bookingId={booking.booking_id} bookingStatus={booking.booking_status}/>
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
}

export default BookingItem