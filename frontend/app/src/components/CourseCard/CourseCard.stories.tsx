import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CourseCard } from './CourseCard';

export default {
    title: 'CourseCard',
    component: CourseCard,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof CourseCard>;

const Template: ComponentStory<typeof CourseCard> = (args) => <CourseCard {...args} />;

export const Default = Template.bind({});
Default.args = {};