import { ComponentStory, ComponentMeta } from '@storybook/react';

import { withRouter } from 'storybook-addon-react-router-v6';
import PathConstants from '../../utils/pathConstants';
import MainContextProvider from '../../contexts/Main/MainContextProvider';
import Dashboard from './Dashboard';

export default {
    title: `Pages/${Dashboard.name}`,
    component: Dashboard,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routePath: PathConstants.dashboard
        }
    }
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = () => {
    return (
        <MainContextProvider>
            <Dashboard />
        </MainContextProvider>
    );
};

export const General = Template.bind({});
