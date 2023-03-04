import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PiazzaPostPreview, { PiazzaPostPreviewProps } from './PiazzaPostPreview';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: `Components/${PiazzaPostPreview.name}`,
    component: PiazzaPostPreview,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof PiazzaPostPreview>;

const Template: ComponentStory<typeof PiazzaPostPreview> = (args: PiazzaPostPreviewProps) => (
    <PiazzaPostPreview {...args} />
);

export const Default = Template.bind({});
Default.args = {
    postId: 'class/jw2uhydb1dljb/post/14',
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
    numComments: 2,
    previewTextMaxLength: 200
};
