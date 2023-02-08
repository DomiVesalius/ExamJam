import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ExamCard } from './ExamCard';

export default {
    title: 'ExamCard',
    component: ExamCard,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof ExamCard>;

const Template: ComponentStory<typeof ExamCard> = (args) => <ExamCard {...args} />;

export const Default = Template.bind({});
Default.args = {};