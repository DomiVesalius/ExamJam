import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

import PageLayout, { LayoutProps } from './PageLayout';

export default {
    title: `Components/${PageLayout.name}`,
    component: PageLayout
} as ComponentMeta<typeof PageLayout>;

const Template: ComponentStory<typeof PageLayout> = (args: LayoutProps) => {
    return (
        <Provider store={store}>
            <PageLayout title={args.title}>{args.children}</PageLayout>
        </Provider>
    );
};

export const General = Template.bind({});
General.args = {
    title: 'Basic',
    children: <p>Paragraph tag</p>
};
