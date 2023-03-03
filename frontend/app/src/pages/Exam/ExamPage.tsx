import React from 'react';
import PageLayout from '../../components/Layout/PageLayout';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import Exam from '../../components/Exam/Exam';
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";

const ExamPage: React.FunctionComponent = () => {
    const routeParams = useParams();
    const courseId = routeParams["courseId"];
    const examId = routeParams["examId"];

    if (courseId === undefined) {
        return <div>Course ID is undefined</div>;
    }
    if (examId === undefined) {
    return <div>Exam ID is undefined</div>;
    }

    return (
        // <ProtectedRoute>
            <PageLayout title="ExamPage">
                <Stack direction="column" spacing={2}>
                    <Typography variant="h1" gutterBottom>Exam {examId} for course {courseId}</Typography>
                    <Exam courseId={courseId} examId={examId}/>
                    <Typography>Exam Done</Typography>
                </Stack>
            </PageLayout>
        // </ProtectedRoute>
    );
};

export default ExamPage;
