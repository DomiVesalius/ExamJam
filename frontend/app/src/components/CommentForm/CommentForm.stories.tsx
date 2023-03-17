import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

import CommentForm from './CommentForm';

// This is metadata about the component that will be used to generate the docs tab
export default {
    title: `Components/${CommentForm.name}`,
    component: CommentForm
} as ComponentMeta<typeof CommentForm>;

const Template: ComponentStory<typeof CommentForm> = (args) => {
    return (
        <Provider store={store}>
            <CommentForm {...args} />
        </Provider>
    );
};

export const General = Template.bind({});
General.args = {
    parentId: null,
    postId: '6413938ca9fb562a9feb94fa',
    author: 'john.doe@mail.utoronto.ca'
};
