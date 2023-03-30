import { ComponentStory, ComponentMeta } from '@storybook/react';
import EditProfilePage from './EditProfilePage';
import MainContextProvider from '../../contexts/Main/MainContextProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PathConstants from '../../utils/pathConstants';

export default {
    title: `Pages/${EditProfilePage.name}`,
    component: EditProfilePage
} as ComponentMeta<typeof EditProfilePage>;

const Template: ComponentStory<typeof EditProfilePage> = () => {
    return (
        <MemoryRouter initialEntries={[`/dashboard/profile/edit`]}>
            <Routes>
                <Route
                    path={PathConstants.profilePage}
                    element={
                        <MainContextProvider>
                            <EditProfilePage />
                        </MainContextProvider>
                    }
                />
            </Routes>
        </MemoryRouter>
    );
};

export const General = Template.bind({});
