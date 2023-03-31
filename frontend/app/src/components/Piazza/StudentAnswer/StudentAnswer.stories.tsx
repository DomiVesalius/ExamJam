import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StudentAnswer, { StudentAnswerProps } from './StudentAnswer';

export default {
    title: `Piazza/${StudentAnswer.name}`,
    component: StudentAnswer,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof StudentAnswer>;

const Template: ComponentStory<typeof StudentAnswer> = (args: StudentAnswerProps) => (
    <StudentAnswer {...args} />
);

export const Default = Template.bind({});
Default.args = {
    id: 'k08ev7d0mec5ey',
    postId: 'class/jw2uhydb1dljb/post/14',
    content:
        '<p>They are still deciding on the PCRS due dates for now, but I would just try to finish them now if you can.</p>'
};
