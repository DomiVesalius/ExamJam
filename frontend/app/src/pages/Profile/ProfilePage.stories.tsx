import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProfilePage from './ProfilePage';
import MainContextProvider from '../../contexts/Main/MainContextProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PathConstants from '../../utils/pathConstants';

export default {
    title: `Pages/${ProfilePage.name}`,
    component: ProfilePage
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => {
    return (
        <MemoryRouter initialEntries={[`/dashboard/profile`]}>
            <Routes>
                <Route
                    path={PathConstants.profilePage}
                    element={
                        <MainContextProvider>
                            <ProfilePage />
                        </MainContextProvider>
                    }
                />
            </Routes>
        </MemoryRouter>
    );
};

export const General = Template.bind({});
