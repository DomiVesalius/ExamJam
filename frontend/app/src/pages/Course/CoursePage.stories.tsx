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
        <MemoryRouter initialEntries={[`/dashboard/courses/CSC309`]}>
            <Routes>
                <Route
                    path={'dashboard/courses/:courseCode'}
                    element={
                        <MainContextProvider>
                            <CoursePage />
                        </MainContextProvider>
                    }
                />
            </Routes>
        </MemoryRouter>
    );
};

const Template2: ComponentStory<typeof CoursePage> = () => {
    return (
        <MemoryRouter initialEntries={[`/dashboard/courses/ANT101`]}>
            <Routes>
                <Route
                    path={'dashboard/courses/:courseCode'}
                    element={
                        <MainContextProvider>
                            <CoursePage />
                        </MainContextProvider>
                    }
                />
            </Routes>
        </MemoryRouter>
    );
};

export const HasMultipleExams = Template.bind({});
export const HasNoExams = Template2.bind({});
