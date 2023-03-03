import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExamPage from './ExamPage';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: `Pages/${ExamPage.name}`,
    component: ExamPage,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routePath: '/dashboard/course/:courseId/exams/:examId'
        }
    }
} as ComponentMeta<typeof ExamPage>;

const Template: ComponentStory<typeof ExamPage> = () => {
    return <ExamPage />;
};

export const General = Template.bind({});
