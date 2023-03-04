import React from 'react';
import PDFViewer from "./PDFViewer/PDFViewer";

interface ExamProps {
    courseCode: string;
    examId: string;
    pdf?: string;
}

const Exam: React.FunctionComponent<ExamProps> = (props: ExamProps) => {
    let pdf = "";
    if (props.pdf) {
        pdf = props.pdf;
    } else {
        pdf = `/api/exams/files/${props.examId}`
    }

    return (
        <>
            <PDFViewer pdf={pdf} width={"60vw"} height={"90vh"}/>
        </>
    );
};

export default Exam;