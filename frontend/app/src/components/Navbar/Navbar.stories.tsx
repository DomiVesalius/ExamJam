import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Navbar } from './Navbar';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: 'Navbar',
    component: Navbar,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routePath: '/'
        }
    }
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {};
