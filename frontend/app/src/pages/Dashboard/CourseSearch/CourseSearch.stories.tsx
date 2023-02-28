import { ComponentStory, ComponentMeta } from '@storybook/react';

import CourseSearch from './CourseSearch';

import { withRouter } from 'storybook-addon-react-router-v6';
import PathConstants from '../../../utils/pathConstants';
import MainContextProvider from '../../../contexts/Main/MainContextProvider';

export default {
    title: `Pages/${CourseSearch.name}`,
    component: CourseSearch,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routePath: PathConstants.courseSearch
        }
    }
} as ComponentMeta<typeof CourseSearch>;

const Template: ComponentStory<typeof CourseSearch> = () => {
    return (
        <MainContextProvider>
            <CourseSearch />
        </MainContextProvider>
    );
};

export const General = Template.bind({});
