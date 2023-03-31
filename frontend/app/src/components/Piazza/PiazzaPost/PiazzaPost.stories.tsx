import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import PiazzaPost, { PiazzaPostProps } from './PiazzaPost';
import { AnswerType } from '../Answer/Answer';

export default {
    title: `Piazza/${PiazzaPost.name}`,
    component: PiazzaPost,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof PiazzaPost>;

const Template: ComponentStory<typeof PiazzaPost> = (args: PiazzaPostProps) => (
    <PiazzaPost {...args} />
);

export const Default = Template.bind({});
Default.args = {
    _id: 'class/jw2uhydb1dljb/post/14',
    courseCode: 'CSC108',
    forumId: 'jw2uhydb1dljb',
    postNumber: 14,
    title: 'Hello, do we go the lectures/practicals from the 9th to the 13th?',
    content:
        '<p>It says that there are &#34;no lab meetings&#34; from the 9th to the 13th on this page:</p>\n' +
        '<p></p>\n' +
        '<p><a href="https://mcs.utm.utoronto.ca/~108/labs.shtml">https://mcs.utm.utoronto.ca/~108/labs.shtml</a></p>\n' +
        '<p></p>\n' +
        '<p>Thanks!</p>',
    createdAt: new Date('2019-09-07T22:29:32.000+00:00'),
    answers: [
        {
            id: 'k08ev7d0mec5ey',
            postId: 'class/jw2uhydb1dljb/post/14',
            content:
                '<p>They are still deciding on the PCRS due dates for now, but I would just try to finish them now if you can.</p>',
            type: AnswerType.student
        },
        {
            id: 'k0a2pwrhwkr6yc',
            postId: 'class/jw2uhydb1dljb/post/14',
            content:
                '<p>Check the bottom of &#64;7 for more info. In short, before lecture would be best.</p>',
            type: AnswerType.instructor
        }
    ],
    followups: [
        {
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
        },
        {
            _id: 'k08ev7d0mec5ey',
            postId: 'class/jw2uhydb1dljb/post/14',
            content:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis mollis posuere. Nunc id orci nisi.</p>',
            commentChildren: [
                {
                    _id: 'k0a8pc67k6920k',
                    postId: 'class/jw2uhydb1dljb/post/12',
                    parentId: 'k09uvcf397737w',
                    content:
                        '<p>Pellentesque elit quam, facilisis quis orci vel, tincidunt commodo elit. </p>\n<p></p>'
                }
            ]
        }
    ]
};
