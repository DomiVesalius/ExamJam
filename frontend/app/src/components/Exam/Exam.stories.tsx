import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Exam from './Exam';
import { withRouter } from 'storybook-addon-react-router-v6';
import React from "react";

interface ExamProps {
    courseId: string;
    examId: string;
}

export default {
    title: `Components/${Exam.name}`,
    component: Exam,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routePath: '/dashboard/course/:courseId/exams/:examId'
        }
    }
} as ComponentMeta<typeof Exam>;

const Template: ComponentStory<typeof Exam> = (props: ExamProps) => {
    return (
        <Provider store={store}>
            <Exam courseId={props.courseId} examId={props.examId}/>
        </Provider>
    );
};

export const General = Template.bind({});
General.args = {
    courseId: 'CSC104',
    examId: '63e3ff4e0c9d8ce6f8cb287f'
}