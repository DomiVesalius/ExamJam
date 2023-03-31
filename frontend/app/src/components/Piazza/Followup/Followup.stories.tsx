import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Followup, { FollowupProps } from './Followup';

export default {
    title: `Piazza/${Followup.name}`,
    component: Followup,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof Followup>;

const Template: ComponentStory<typeof Followup> = (args: FollowupProps) => <Followup {...args} />;

export const FollowupWithNoFeedback = Template.bind({});
FollowupWithNoFeedback.args = {
    _id: 'k09uvcf397737w',
    postId: 'class/jw2uhydb1dljb/post/12',
    content: '<p><p>Are both Prepare and Perform sections going to be marked? (In the 8%)</p>',
    commentChildren: []
};

export const FollowupWithFeedback = Template.bind({});
FollowupWithFeedback.args = {
    _id: 'k08ev7d0mec5ey',
    postId: 'class/jw2uhydb1dljb/post/14',
    content: '<p>Are both Prepare and Perform sections going to be marked? (In the 8%)</p>',
    commentChildren: [
        {
            _id: 'k0a0k547fgu1bs',
            postId: 'class/jw2uhydb1dljb/post/12',
            parentId: 'k09uvcf397737w',
            content:
                '<p>Prepare and Perform are separate -- and once we set due dates, will be due on different days. From the infosheet: &#34;<span style="font-family:sans-serif">To prime you</span><span style="font-family:sans-serif"> for what we will discuss, you will view a set of videos and complete exercises by Sunday night, before lecture.</span><span style="font-family:sans-serif">These are the “Prepare” exercises in PCRS.</span><span style="font-family:sans-serif">Then, you will complete a more challenging set of online exercises </span><span style="font-family:sans-serif">by Friday night to test your understanding of the week’s material.</span><span style="font-family:sans-serif">These are the “Perform” exercises.</span>&#34;</p>'
        },
        {
            _id: 'k0a8pc67k6920k',
            postId: 'class/jw2uhydb1dljb/post/12',
            parentId: 'k09uvcf397737w',
            content: '<p>Thank you for clarifying :)</p>\n<p></p>'
        }
    ]
};
