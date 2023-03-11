import { ComponentStory, ComponentMeta } from '@storybook/react';

import PostCreationPage from './PostCreationPage'
import MainContextProvider from '../../contexts/Main/MainContextProvider';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
    title: `Pages/${PostCreationPage.name}`,
    component: PostCreationPage,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routePath: '/dashboard/courses/:courseCode/create-post'
        }
    }
} as ComponentMeta<typeof PostCreationPage>;

const Template: ComponentStory<typeof PostCreationPage> = () => {
    return <PostCreationPage />;
};

export const General = Template.bind({});
