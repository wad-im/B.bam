import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const BookingSummary = () => {
    return (
        <TableContainer sx={{py: 4}}>
            <Table>
                <TableHead>
                    <TableCell>Massage Type</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Time</TableCell>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Something</TableCell>
                        <TableCell>Something</TableCell>
                        <TableCell>Something</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BookingSummary