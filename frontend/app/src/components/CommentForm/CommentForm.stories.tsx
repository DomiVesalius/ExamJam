import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

import CommentForm from './CommentForm';

// This is metadata about the component that will be used to generate the docs tab
export default {
    title: `CommentForm`,
    component: CommentForm
} as ComponentMeta<typeof CommentForm>;

const Template: ComponentStory<typeof CommentForm> = () => {
    return (
        <Provider store={store}>
            <CommentForm />
        </Provider>
    );
};

export const General = Template.bind({});