import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CourseList } from './CourseList';

export default {
    title: `Components/${CourseList.name}`,
    component: CourseList,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof CourseList>;

const Template: ComponentStory<typeof CourseList> = (args) => <CourseList {...args} />;

export const Default = Template.bind({});
Default.args = {
    rowSpacing: 2,
    colSpacing: 2,
    queryLimit: 5,
    queryPage: 1,
    queryKeyword: 'csc'
};
