import { ComponentStory, ComponentMeta } from '@storybook/react';

import RegisterForm from './RegisterForm';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: `Components/Auth/${RegisterForm.name}`,
    component: RegisterForm,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routePath: '/register'
        }
    }
} as ComponentMeta<typeof RegisterForm>;

const Template: ComponentStory<typeof RegisterForm> = () => {
    return <RegisterForm onSuccess={() => console.log('Successful Registration')} />;
};

export const General = Template.bind({});
General.args = {};
