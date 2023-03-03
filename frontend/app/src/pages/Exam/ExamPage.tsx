import React, {useEffect, useState} from 'react';
import PageLayout from '../../components/Layout/PageLayout';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import Exam from '../../components/Exam/Exam';
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import http from "../../utils/http";
import useSWR from "swr";

const ExamPage: React.FunctionComponent = () => {
    const routeParams = useParams();
    const courseId = routeParams["courseId"];
    const examId = routeParams["examId"];

    const [examTitle, setExamTitle] = useState<string>('');

    const fetcher = (url: string) => http.get(url).then((res) => res.data);
    const url: string = `/exams/${examId}`;
    const { data, error } = useSWR(url, fetcher);

    useEffect(() => {
        if (data) {
            setExamTitle(data.data.title)
        }

        if (error) console.log(error);
    }, [data, error]);

    if (courseId === undefined) {
        return <div>Course ID is undefined</div>;
    }

    if (examId === undefined) {
        return <div>Exam ID is undefined</div>;
    }

    if (error) {
        return <div>ERROR</div>;
    }

    return (
        // <ProtectedRoute>
            <PageLayout title="ExamPage">
                <Stack direction="column" spacing={2}>
                    <Typography variant="h4" gutterBottom>{examTitle}</Typography>
                    <Exam courseId={courseId} examId={examId}/>
                </Stack>
            </PageLayout>
        // </ProtectedRoute>
    );
};

export default ExamPage;
