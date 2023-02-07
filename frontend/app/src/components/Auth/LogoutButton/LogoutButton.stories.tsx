import { ComponentStory, ComponentMeta } from '@storybook/react';

import LogoutButton from './LogoutButton';

export default {
    title: `Components/Auth/${LogoutButton.name}`,
    component: LogoutButton
} as ComponentMeta<typeof LogoutButton>;

const Template: ComponentStory<typeof LogoutButton> = () => {
    return <LogoutButton />;
};

export const General = Template.bind({});
General.args = {};
