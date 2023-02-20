import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CourseList } from './CourseList';

export default {
    title: 'CourseList',
    component: CourseList,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof CourseList>;

const Template: ComponentStory<typeof CourseList> = (args) => <CourseList {...args} />;

export const Default = Template.bind({});
Default.args = {};
