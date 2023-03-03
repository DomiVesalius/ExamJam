import { ComponentStory, ComponentMeta } from '@storybook/react';

import CoursePage from './CoursePage';
import MainContextProvider from '../../contexts/Main/MainContextProvider';
import { withRouter } from 'storybook-addon-react-router-v6';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export default {
    title: `Pages/${CoursePage.name}`,
    component: CoursePage
    // decorators: [withRouter],
    // parameters: {
    //     reactRouter: {
    //         routePath: '/dashboard/courses/CSC309'
    //     }
    // }
} as ComponentMeta<typeof CoursePage>;

const Template: ComponentStory<typeof CoursePage> = () => {
    return (
        <MemoryRouter initialEntries={['/dashboard/courses/CSC301']}>
            <Routes>
                <Route path={'dashboard/courses/:courseCode'} element={<CoursePage />} />
            </Routes>
        </MemoryRouter>
    );
};

export const General = Template.bind({});
