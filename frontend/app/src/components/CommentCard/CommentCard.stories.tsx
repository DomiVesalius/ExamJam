import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from "./CommentCard";

export default {
    title: 'CommentCard',
    component: CommentCard,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard />;

export const Default = Template.bind({});
