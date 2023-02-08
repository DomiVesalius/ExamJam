import { ComponentStory, ComponentMeta } from '@storybook/react';

import RegistrationPage from './RegistrationPage';
import MainContextProvider from '../../contexts/Main/MainContextProvider';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: `Pages/${RegistrationPage.name}`,
    component: RegistrationPage,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routePath: '/register'
        }
    }
} as ComponentMeta<typeof RegistrationPage>;

const Template: ComponentStory<typeof RegistrationPage> = () => {
    return <RegistrationPage />;
};

export const General = Template.bind({});
