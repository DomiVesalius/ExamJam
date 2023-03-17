import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PaginatedExamRow, PaginatedExamTableProps } from './PaginatedExamRow';

export default {
    title: `Components/${PaginatedExamRow.name}`,
    component: PaginatedExamRow,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof PaginatedExamRow>;

const Template: ComponentStory<typeof PaginatedExamRow> = (args: PaginatedExamTableProps) => (
    <PaginatedExamRow {...args} />
);

export const Default = Template.bind({});
Default.args = {
    exam: null
};
