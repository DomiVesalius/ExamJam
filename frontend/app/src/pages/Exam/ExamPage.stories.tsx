import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExamPage from './ExamPage';
import MainContextProvider from '../../contexts/Main/MainContextProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PathConstants from '../../utils/pathConstants';

export default {
    title: `Pages/${ExamPage.name}`,
    component: ExamPage
} as ComponentMeta<typeof ExamPage>;

const CSC104Template: ComponentStory<typeof ExamPage> = () => {
    return (
        <MemoryRouter initialEntries={[`/dashboard/courses/CSC104/exams/63e3de421b55a9a70eda4027`]}>
            <Routes>
                <Route
                    path={PathConstants.examPage}
                    element={
                        <MainContextProvider>
                            <ExamPage />
                        </MainContextProvider>
                    }
                />
            </Routes>
        </MemoryRouter>
    );
};

export const Exams = CSC104Template.bind({});
