import { ComponentStory, ComponentMeta } from '@storybook/react';
import PostCreationForm from './PostCreationForm';
import MainContextProvider from '../../../contexts/Main/MainContextProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export default {
    title: `Components/${PostCreationForm.name}`,
    component: PostCreationForm
} as ComponentMeta<typeof PostCreationForm>;

const Template: ComponentStory<typeof PostCreationForm> = () => {
    return (
        <MemoryRouter initialEntries={[`/dashboard/courses/CSC209/create-post`]}>
            <Routes>
                <Route
                    path={'dashboard/courses/:courseCode/create-post'}
                    element={
                        <MainContextProvider>
                            <PostCreationForm onSuccess={() => console.log('post created')} />
                        </MainContextProvider>
                    }
                />
            </Routes>
        </MemoryRouter>
    );
};

export const General = Template.bind({});
