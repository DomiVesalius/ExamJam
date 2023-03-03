import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Container,
    CssBaseline,
    Paper,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Link
} from '@mui/material';
import useSWR from 'swr';
import http from '../../utils/http';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

function createData(name: string, data: string) {
    return { name, data };
}

const rows = [
    createData('Easy Exam', 'blah blah blah blah'),
    createData('Hard Exam', 'blah blah blah blah'),
    createData('Ultra hard Exam', 'blah blah blah blah'),
    createData('Easy peasy exam', 'blah blah blah blah')
];

const fetcher = (url: string) => http.get(url).then((res) => res.data);

const CoursePage = () => {
    let { courseCode } = useParams();
    const [course, setCourse] = useState({
        courseCode: '',
        title: '',
        description: ''
    });
    console.log(courseCode);
    const url: string = `/courses/${courseCode}`;
    const { data, error } = useSWR(url, fetcher);

    useEffect(() => {
        if (data) {
            setCourse({
                courseCode: data.data.courseCode,
                title: data.data.title,
                description: data.data.description
            });
        }
    }, [data]);

    return (
        <Stack spacing={2} alignItems={'center'}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6
                    }}
                >
                    <Container maxWidth="md">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="left"
                            color="text.primary"
                            gutterBottom
                        >
                            {`${course.courseCode} - ${course.title}`}
                        </Typography>
                        <Typography variant="h5" align="left" color="text.secondary" paragraph>
                            {course.description}
                        </Typography>
                    </Container>
                    <Container
                        sx={{
                            pt: 2,
                            pb: 2
                        }}
                        maxWidth="md"
                    >
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 700, fontWeight: 'bold' }}
                                aria-label="customized table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Exam</StyledTableCell>
                                        <StyledTableCell align="left">More info</StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                                sx={{ fontWeight: 'bold' }}
                                            >
                                                <Link href="#">{row.name}</Link>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                {row.data}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Button variant="contained">Create Post</Button>
                                            </StyledTableCell>
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
