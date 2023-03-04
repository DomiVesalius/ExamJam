import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Exam from './Exam';
import { withRouter } from 'storybook-addon-react-router-v6';
import React from 'react';

interface ExamProps {
    courseCode: string;
    examId: string;
}

export default {
    title: `Components/${Exam.name}`,
    component: Exam
} as ComponentMeta<typeof Exam>;

const Template: ComponentStory<typeof Exam> = (props: ExamProps) => {
    return (
        <Provider store={store}>
            <Exam {...props} />
        </Provider>
    );
};

export const General = Template.bind({});
General.args = {
    courseCode: 'CSC104',
    examId: '63e3ff4e0c9d8ce6f8cb287f',
    pdf: `http://localhost:8080/api/exams/files/63e3de421b55a9a70eda4027`
};
