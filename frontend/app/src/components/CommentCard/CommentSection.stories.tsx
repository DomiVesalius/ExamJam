import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentSection } from './CommentSection';

export default {
    title: 'CommentSection',
    component: CommentSection,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof CommentSection>;

const Template: ComponentStory<typeof CommentSection> = (args) => <CommentSection />;

export const Default = Template.bind({});
