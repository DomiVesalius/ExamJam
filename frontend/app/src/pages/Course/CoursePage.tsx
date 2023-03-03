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
import { CourseTitle } from '../../components/CourseTitle/CourseTitle';
import { ExamTable } from '../../components/ExamTable/ExamTable';
import PageLayout from '../../components/Layout/PageLayout';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';

const fetcher = (url: string) => http.get(url).then((res) => res.data);

const CoursePage = () => {
    let { courseCode } = useParams();
    const [course, setCourse] = useState({
        courseCode: '',
        title: '',
        description: ''
    });

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

    if (error || !courseCode) {
        return <div>ERROR</div>;
    }

    return (
        <ProtectedRoute>
            <PageLayout title={courseCode}>
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
                            <CourseTitle
                                courseCode={course.courseCode}
                                description={course.description}
                                title={course.title}
                            />
                            <ExamTable courseCode={course.courseCode} />
                        </Box>
                    </main>
                </Stack>
            </PageLayout>
        </ProtectedRoute>
    );
};

export default CoursePage;
