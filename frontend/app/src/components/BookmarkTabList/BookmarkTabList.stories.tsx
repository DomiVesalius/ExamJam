import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import BookmarkTabList, { BookmarkTabListProps } from './BookmarkTabList';

export default {
    title: `Components/${BookmarkTabList.name}`,
    component: BookmarkTabList,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof BookmarkTabList>;

const Template: ComponentStory<typeof BookmarkTabList> = (args: BookmarkTabListProps) => (
    <BookmarkTabList {...args} />
);

export const Default = Template.bind({});
Default.args = {};
