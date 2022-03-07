import { TableBody, TableContainer, TableHead, Table, TableCell, TableRow, Chip } from "@mui/material"
import { DateTime } from "luxon"
import { Booking } from "./Bookings"

interface BookingArchiveProps {
    bookings: Booking[]
}

const BookingArchive = ({bookings}: BookingArchiveProps)=>{
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        bookings.map(booking => (
                            <TableRow key={booking.booking_id}>
                                <TableCell>
                                    {booking.product.product_name}
                                    <Chip label={booking.booking_status} variant='outlined' size="small" sx={{mx: 2}}/>
                                </TableCell>
                                <TableCell>{ DateTime.fromISO(booking.booking_time).setLocale('en-gb').toLocaleString(DateTime.DATETIME_MED) }</TableCell>
                                <TableCell>{booking.booked_location}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BookingArchive
