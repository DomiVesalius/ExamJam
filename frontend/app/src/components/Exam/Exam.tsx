import React from 'react';
import PDFViewer from "./PDFViewer/PDFViewer";

interface ExamProps {
    courseId: string;
    examId: string;
}

const Exam: React.FunctionComponent<ExamProps> = (props: ExamProps) => {
    // IMPLEMENT THE END POINT HERE
    return (
        <h1>Exam {props.examId} for course {props.courseId}</h1>
        // <PDFViewer pdf={}/>
    );
};

export default Exam;