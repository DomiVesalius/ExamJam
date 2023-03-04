import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PiazzaPostPreviewList from './PiazzaPostPreviewList';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: `Components/${PiazzaPostPreviewList.name}`,
    component: PiazzaPostPreviewList,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof PiazzaPostPreviewList>;

const Template: ComponentStory<typeof PiazzaPostPreviewList> = (args) => (
    <PiazzaPostPreviewList {...args} />
);

export const Default = Template.bind({});
Default.args = {
    courseCode: 'CSC108',
    queryPage: 1,
    queryLimit: 5
};
