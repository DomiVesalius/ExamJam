import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import PostPreviewList, { PostType } from './PostPreviewList';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: `Components/${PostPreviewList.name}`,
    component: PostPreviewList,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof PostPreviewList>;

const Template: ComponentStory<typeof PostPreviewList> = (args) => <PostPreviewList {...args} />;

export const RegularPosts = Template.bind({});
RegularPosts.args = {
    courseCode: 'CSC108',
    queryPage: 1,
    queryLimit: 5,
    postType: PostType.regular
};

export const PiazzaPosts = Template.bind({});
PiazzaPosts.args = {
    courseCode: 'CSC108',
    queryPage: 1,
    queryLimit: 5,
    postType: PostType.piazza
};
