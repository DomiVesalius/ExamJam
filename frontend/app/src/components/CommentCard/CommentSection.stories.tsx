import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CommentSection from './CommentSection';

export default {
    title: `Components/${CommentSection.name}`,
    component: CommentSection,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof CommentSection>;

const Template: ComponentStory<typeof CommentSection> = (args) => <CommentSection {...args} />;

export const Default = Template.bind({});
Default.args = {
    queryLimit: 5,
    queryPage: 1,
    postId: '6413938ca9fb562a9feb94fa'
};
