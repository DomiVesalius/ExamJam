import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Container,
    CssBaseline, Paper,
    Stack,
    styled, Table, TableBody,
    TableCell,
    tableCellClasses, TableContainer, TableHead,
    TableRow,
    Typography,
    Button, Link
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string,
    data: string,
) {
    return { name, data};
}

const rows = [
    createData('Easy Exam', "blah blah blah blah"),
    createData('Hard Exam', 'blah blah blah blah'),
    createData('Ultra hard Exam', 'blah blah blah blah'),
    createData('Easy peasy exam', 'blah blah blah blah'),
];

const url = SERVER_CONFIG

const CoursePage = () => {
    let {courseCode} = useParams();
    return (
        <Stack spacing={2} alignItems={'center'}>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="md">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {courseCode}
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam placerat vulputate augue, nec vulputate diam egestas vitae.
                            Maecenas sed iaculis orci, eget viverra est. Proin et magna purus.
                            Ut volutpat orci in tellus egestas ultrices. Fusce commodo sapien magna,
                        </Typography>
                    </Container>
                    <Container sx={{
                        pt: 2,
                        pb: 2,
                    }} maxWidth="md">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700, fontWeight: 'bold' }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Exam</StyledTableCell>
                                        <StyledTableCell align="right">More info</StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                <Link href="#">{row.name}</Link>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.data}</StyledTableCell>
                                            <StyledTableCell align="right"><Button variant="contained">Create Post</Button></StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                </Box>
            </main>
        </Stack>
    );
};

export default CoursePage;