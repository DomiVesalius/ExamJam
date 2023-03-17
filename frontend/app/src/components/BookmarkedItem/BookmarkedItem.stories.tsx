import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import BookmarkedItem, { BookmarkedItemProps, BookmarkedItemType } from './BookmarkedItem';

export default {
    title: `Components/${BookmarkedItem.name}`,
    component: BookmarkedItem,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof BookmarkedItem>;

const Template: ComponentStory<typeof BookmarkedItem> = (args: BookmarkedItemProps) => (
    <BookmarkedItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
    type: BookmarkedItemType.post,
    queryLimit: 1,
    queryPage: 1
};
