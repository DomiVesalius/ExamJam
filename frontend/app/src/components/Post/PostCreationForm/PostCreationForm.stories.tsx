import { ComponentStory, ComponentMeta } from '@storybook/react';

import PostCreationForm from './PostCreationForm';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: `Components/Auth/${PostCreationForm.name}`,
    component: PostCreationForm,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routePath: '/dashboard/courses/:courseCode/create-post'
        }
    }
} as ComponentMeta<typeof PostCreationForm>;

const Template: ComponentStory<typeof PostCreationForm> = () => {
    return <PostCreationForm onSuccess={() => console.log('Successful Registration')} />;
};

export const General = Template.bind({});
General.args = {};
