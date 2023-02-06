import { ComponentStory, ComponentMeta } from '@storybook/react';

import RegisterForm, { RegisterFormProps } from './RegisterForm';

export default {
    title: `Components/Auth/${RegisterForm.name}`,
    component: RegisterForm
} as ComponentMeta<typeof RegisterForm>;

const Template: ComponentStory<typeof RegisterForm> = (args: RegisterFormProps) => {
    return <RegisterForm />;
};

export const General = Template.bind({});
General.args = {};
