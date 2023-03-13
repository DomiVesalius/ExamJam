import { ComponentStory, ComponentMeta } from '@storybook/react';
import PostCreationPage from './PostCreationPage';
import MainContextProvider from '../../contexts/Main/MainContextProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export default {
    title: `Pages/${PostCreationPage.name}`,
    component: PostCreationPage
} as ComponentMeta<typeof PostCreationPage>;

const Template: ComponentStory<typeof PostCreationPage> = () => {
    return (
        <MemoryRouter initialEntries={[`/dashboard/courses/CSC209/create-post`]}>
            <Routes>
                <Route
                    path={'dashboard/courses/:courseCode/create-post'}
                    element={
                        <MainContextProvider>
                            <PostCreationPage />
                        </MainContextProvider>
                    }
                />
            </Routes>
        </MemoryRouter>
    );
};

export const General = Template.bind({});
