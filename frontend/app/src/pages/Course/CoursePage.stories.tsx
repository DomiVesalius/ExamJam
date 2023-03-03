import { ComponentStory, ComponentMeta } from '@storybook/react';
import CoursePage from './CoursePage';
import MainContextProvider from '../../contexts/Main/MainContextProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export default {
    title: `Pages/${CoursePage.name}`,
    component: CoursePage
} as ComponentMeta<typeof CoursePage>;

const CSC309Template: ComponentStory<typeof CoursePage> = () => {
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

export const HasMultipleExams = CSC309Template.bind({});

const ANT101Template: ComponentStory<typeof CoursePage> = () => {
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

export const HasNoExams = ANT101Template.bind({});

const CSC108Template: ComponentStory<typeof CoursePage> = () => {
    return (
        <MemoryRouter initialEntries={[`/dashboard/courses/CSC108`]}>
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

export const HasExamsAndPiazzaPosts = CSC108Template.bind({});
