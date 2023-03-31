import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Answer, { AnswerProps, AnswerType } from './Answer';

export default {
    title: `Piazza/${Answer.name}`,
    component: Answer,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof Answer>;

const Template: ComponentStory<typeof Answer> = (args: AnswerProps) => <Answer {...args} />;

export const StudentAnswer = Template.bind({});
StudentAnswer.args = {
    id: 'k08ev7d0mec5ey',
    postId: 'class/jw2uhydb1dljb/post/14',
    content:
        '<p>They are still deciding on the PCRS due dates for now, but I would just try to finish them now if you can.</p>',
    type: AnswerType.student
};

export const InstructorAnswer = Template.bind({});
InstructorAnswer.args = {
    id: 'k0a2pwrhwkr6yc',
    postId: 'class/jw2uhydb1dljb/post/14',
    content:
        '<p>Check the bottom of &#64;7 for more info. In short, before lecture would be best.</p>',
    type: AnswerType.instructor
};
