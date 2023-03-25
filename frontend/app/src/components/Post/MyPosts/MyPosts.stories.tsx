import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import MyPosts from './MyPosts';

export default {
    title: `Components/${MyPosts.name}`,
    component: MyPosts,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof MyPosts>;

const Template: ComponentStory<typeof MyPosts> = (args) => <MyPosts {...args} />;

export const Default = Template.bind({});
Default.args = {
    queryPage: 1,
    queryLimit: 5
};
