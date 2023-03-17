import {
    Button,
    Link,
    styled,
    TableCell,
    tableCellClasses,
    TableRow,
    Typography
} from '@mui/material';
import React from 'react';

export interface ExamModel {
    courseCode: string;
    title: string;
    link: string;
    files_id: string;
}

export interface PaginatedExamTableProps {
    exam: ExamModel | null;
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

export const PaginatedExamRow: React.FunctionComponent<PaginatedExamTableProps> = ({ exam }) => {
    if (!exam) {
        return (
            <Typography variant="subtitle1" align="center">
                No exams found
            </Typography>
        );
    }
    return (
        <StyledTableRow key={exam.title}>
            <StyledTableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                <Link href={`${exam.courseCode}/exams/${exam.files_id}`}>{exam.title}</Link>
            </StyledTableCell>
            <StyledTableCell align="left">
                <Link href={exam.link}>Link to original exam</Link>
            </StyledTableCell>
            <StyledTableCell align="right">
                <Link
                    href={`/dashboard/courses/${exam.courseCode}/create-post?examId=${exam.files_id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Button variant="contained">Create Post</Button>
                </Link>
            </StyledTableCell>
        </StyledTableRow>
    );
};
