import React from 'react';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import PageLayout from '../../components/Layout/PageLayout';
import { CourseList, endpointTypes } from '../../components/CourseList/CourseList';
import { bookmarkTypes } from '../../utils/bookmarkConstants';
import { Typography } from '@mui/material';

const Dashboard: React.FunctionComponent = () => {
    return (
        <ProtectedRoute>
            <PageLayout title="Dashboard">
                <Typography variant="h4" align="center">
                    Bookmarked Courses
                </Typography>
                <CourseList
                    rowSpacing={2}
                    colSpacing={2}
                    queryLimit={6}
                    queryPage={1}
                    queryKeyword={bookmarkTypes.course}
                    endpoint={endpointTypes.bookmarks}
                />
            </PageLayout>
        </ProtectedRoute>
    );
};

export default Dashboard;
