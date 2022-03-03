import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { DateTime } from "luxon"
import { Product } from "./CreateBooking"

interface BookingSummaryProps {
    product: Product | undefined,
    location: string | undefined,
    time: DateTime | undefined
}

const BookingSummary = ({product, location, time}: BookingSummaryProps) => {

     return (
        <TableContainer sx={{my: 4}} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Massage Type</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{product?.product_name}</TableCell>
                        <TableCell>{location}</TableCell>
                        <TableCell>{time?.setLocale('en-gb').toLocaleString(DateTime.DATETIME_MED)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BookingSummary