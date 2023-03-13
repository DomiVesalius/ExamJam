import { ComponentStory, ComponentMeta } from '@storybook/react';
import PostPage from './PostPage';
import MainContextProvider from '../../../contexts/Main/MainContextProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export default {
    title: `Pages/${PostPage.name}`,
    component: PostPage
} as ComponentMeta<typeof PostPage>;

const Template: ComponentStory<typeof PostPage> = () => {
    return (
        <MemoryRouter initialEntries={[`/dashboard/courses/CSC209/posts/63e3df3a1b55a9a70eda41ae`]}>
            <Routes>
                <Route
                    path={'dashboard/courses/:courseCode'}
                    element={
                        <MainContextProvider>
                            <PostPage />
                        </MainContextProvider>
                    }
                />
            </Routes>
        </MemoryRouter>
    );
};

export const General = Template.bind({});
