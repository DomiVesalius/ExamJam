import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PostPanel, { PostPanelProps } from './PostPanel';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: `Components/${PostPanel.name}`,
    component: PostPanel,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof PostPanel>;

const Template: ComponentStory<typeof PostPanel> = (args: PostPanelProps) => (
    <PostPanel {...args} />
);

export const HasPiazzaPosts = Template.bind({});
HasPiazzaPosts.args = { courseCode: 'CSC108', queryPage: 1, queryLimit: 5 };

export const HasNoPiazzaPosts = Template.bind({});
HasNoPiazzaPosts.args = { courseCode: 'DNE', queryPage: 1, queryLimit: 5 };
