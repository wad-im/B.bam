import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Booking } from './Bookings';
import axios from 'axios';

interface EditBookingProps {
    bookings: Booking[],
    setBookings: React.Dispatch<React.SetStateAction<Booking[]>>,
    bookingId: string
}

const EditBooking = ({bookings, setBookings, bookingId}: EditBookingProps)=>{

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        updateDatabase()
        updateBookingsState()

    };

    const updateBookingsState = () =>{
        // 1. Make a shallow copy of the array
        let temp_bookings = [...bookings]
        // 2. Find index of cancelled bookig
        const indexOfCancelledBooking = bookings.findIndex(booking => booking.booking_id === bookingId)
        // 3. Make a shallow copy of the element you want to mutate
        let temp_booking = {...temp_bookings[indexOfCancelledBooking]}
        // 4. Update the status 
        temp_booking.booking_status = 'cancelled'
        // 5. Put it back into the array.
        temp_bookings[indexOfCancelledBooking] = temp_booking
        // 6. Set the state to our new copy
        setBookings(temp_bookings)
    }

    const updateDatabase = async ()=>{
        try {
            await axios.delete('/api/bookings', {data: {booking_id: bookingId}})
        } catch (error: any) {
            console.log(error.response.data.error.message)
        }
    }
      

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-haspopup="true"
                onClick={handleClick}
            >
            <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                style: { width: '20ch' }
                }}
            >
                <MenuItem onClick={handleClose}>
                    Cancel
                </MenuItem>
            </Menu>
        </div>
    )
}

export default EditBooking