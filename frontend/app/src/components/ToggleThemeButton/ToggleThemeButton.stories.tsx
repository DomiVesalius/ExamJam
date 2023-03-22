import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ToggleThemeButton } from './ToggleThemeButton';

export default {
    title: 'ToggleThemeButton',
    component: ToggleThemeButton
} as ComponentMeta<typeof ToggleThemeButton>;

const Template: ComponentStory<typeof ToggleThemeButton> = () => <ToggleThemeButton />;

export const Primary = Template.bind({});

Primary.args = {
    placeHolder: 'Search for courses...'
};
