import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoginForm, { LoginFormProps } from './LoginForm';

export default {
    title: `Components/Auth/${LoginForm.name}`,
    component: LoginForm
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args: LoginFormProps) => {
    return <LoginForm />;
};

export const General = Template.bind({});
General.args = {};
