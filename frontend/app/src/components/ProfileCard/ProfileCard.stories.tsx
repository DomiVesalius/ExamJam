import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfileCard from './ProfileCard';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: `Components/${ProfileCard.name}`,
    component: ProfileCard,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const WithBio = Template.bind({});
WithBio.args = {
    username: 'jDoe',
    email: 'john.doe@mail.utoronto.ca',
    bio: 'Third Year Computer Science Student'
};

export const WithoutBio = Template.bind({});
WithoutBio.args = {
    username: 'doeJ',
    email: 'doe.j@mail.utoronto.ca',
    bio: ''
};
