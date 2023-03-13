import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PostPreview, { PostPreviewProps } from './PostPreview';
import { withRouter } from 'storybook-addon-react-router-v6';
import MainContextProvider from '../../../contexts/Main/MainContextProvider';

export default {
    title: `Components/${PostPreview.name}`,
    component: PostPreview,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof PostPreview>;

const Template: ComponentStory<typeof PostPreview> = (args: PostPreviewProps) => (
    <MainContextProvider>
        <PostPreview {...args} />
    </MainContextProvider>
);

export const Default = Template.bind({});
Default.args = {
    postId: '640934acf0d2c67811001e58',
    title: 'Hello, do we go the lectures/practicals from the 9th to the 13th?',
    content:
        '<p>It says that there are &#34;no lab meetings&#34; from the 9th to the 13th on this page:</p>\n' +
        '<p></p>\n' +
        '<p><a href="https://mcs.utm.utoronto.ca/~108/labs.shtml">https://mcs.utm.utoronto.ca/~108/labs.shtml</a></p>\n' +
        '<p></p>\n' +
        '<p>Thanks!</p>',
    createdAt: new Date('2019-09-07T22:29:32.000+00:00'),
    updatedAt: new Date('2019-09-08T22:29:32.000+00:00'),
    author: 'john.doe@mail.utoronto.ca',
    previewTextMaxLength: 200
};
