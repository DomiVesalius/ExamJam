import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Feedback, { FeedbackProps } from './Feedback';

export default {
    title: `Piazza/${Feedback.name}`,
    component: Feedback,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof Feedback>;

const Template: ComponentStory<typeof Feedback> = (args: FeedbackProps) => <Feedback {...args} />;

export const Default = Template.bind({});
Default.args = {
    _id: 'k0a0k547fgu1bs',
    postId: 'class/jw2uhydb1dljb/post/12',
    parentId: 'k09uvcf397737w',
    content:
        '<p>Prepare and Perform are separate -- and once we set due dates, will be due on different days. From the infosheet: &#34;<span style="font-family:sans-serif">To prime you</span><span style="font-family:sans-serif"> for what we will discuss, you will view a set of videos and complete exercises by Sunday night, before lecture.</span><span style="font-family:sans-serif">These are the “Prepare” exercises in PCRS.</span><span style="font-family:sans-serif">Then, you will complete a more challenging set of online exercises </span><span style="font-family:sans-serif">by Friday night to test your understanding of the week’s material.</span><span style="font-family:sans-serif">These are the “Perform” exercises.</span>&#34;</p>'
};
