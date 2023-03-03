import {
    Button,
    Container,
    Link,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import http from '../../utils/http';
import useSWR from 'swr';

interface CourseTableProps {
    courseCode: string;
}

function createExamRows(data: any): any[] {
    const exams = [];
    for (let exam of data.data) {
        exams.push({ name: exam.title, data: exam.courseCode, link: exam.link, id: exam._id });
    }
    return exams;
}

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

export const ExamTable: React.FunctionComponent<CourseTableProps> = ({ courseCode }) => {
    const fetcher = (url: string) => http.get(url).then((res) => res.data);
    const url: string = `/courses/${courseCode}/exams`;
    const { data, error } = useSWR(url, fetcher);

    const [examList, setExamList] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            setExamList(createExamRows(data));
        }
        if (error) console.log(error);
    }, [data, error]);

    return (
        <Container
            sx={{
                pt: 2,
                pb: 2
            }}
            maxWidth="md"
        >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700, fontWeight: 'bold' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Exam</StyledTableCell>
                            <StyledTableCell align="left">Original URL</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {examList.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    <Link href={`exams/${row.id}`}>{row.name}</Link>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Link href={row.link}>Link to original exam</Link>
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
    );
};
