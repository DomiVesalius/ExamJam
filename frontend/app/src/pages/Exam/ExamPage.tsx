import React, { useEffect } from 'react';
import PageLayout from '../../components/Layout/PageLayout';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import Exam from '../../components/Exam/Exam';
import { useParams } from "react-router-dom";

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
                <div>
                    <h1>Exam {examId} for course {courseId}</h1>
                    <Exam courseId={courseId} examId={examId}/>
                </div>
            </PageLayout>
        // </ProtectedRoute>
    );
};

export default ExamPage;
