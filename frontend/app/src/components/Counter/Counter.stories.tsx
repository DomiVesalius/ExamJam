import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

import Counter from './Counter';

// This is metadata about the component that will be used to generate the docs tab
export default {
    title: `Components/${Counter.name}`,
    component: Counter
} as ComponentMeta<typeof Counter>;

const Template: ComponentStory<typeof Counter> = () => {
    return (
        <Provider store={store}>
            <Counter />
        </Provider>
    );
};

export const General = Template.bind({});
