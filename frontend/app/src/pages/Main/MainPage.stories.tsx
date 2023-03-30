import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainPage } from './MainPage';
import MainContextProvider from '../../contexts/Main/MainContextProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PathConstants from '../../utils/pathConstants';

export default {
    title: `Pages/${MainPage.name}`,
    component: MainPage
} as ComponentMeta<typeof MainPage>;

const MainTemplate: ComponentStory<typeof MainPage> = () => {
    return (
        <MemoryRouter initialEntries={[`/`]}>
            <Routes>
                <Route
                    path={PathConstants.rootPage}
                    element={
                        <MainContextProvider>
                            <MainPage />
                        </MainContextProvider>
                    }
                />
            </Routes>
        </MemoryRouter>
    );
};

export const LandingPage = MainTemplate.bind({});
