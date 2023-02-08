import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoginForm, { LoginFormProps } from './LoginForm';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: `Components/Auth/${LoginForm.name}`,
    component: LoginForm,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routePath: '/login'
        }
    }
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args: LoginFormProps) => {
    return <LoginForm />;
};

export const General = Template.bind({});
General.args = {};
