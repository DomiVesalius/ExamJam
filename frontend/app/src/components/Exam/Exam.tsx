import React from 'react';
import PDFViewer from "./PDFViewer/PDFViewer";

interface ExamProps {
    courseId: string;
    examId: string;
}

const Exam: React.FunctionComponent<ExamProps> = (props: ExamProps) => {
    return (
        <>
            <PDFViewer pdf={`/api/exams/files/${props.examId}`}/>
        </>
    );
};

export default Exam;