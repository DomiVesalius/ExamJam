import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoginPage from './LoginPage';
import MainContextProvider from '../../contexts/Main/MainContextProvider';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: `Pages/${LoginPage.name}`,
    component: LoginPage,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routePath: '/login'
        }
    }
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = () => {
    return <LoginPage />;
};

export const General = Template.bind({});
