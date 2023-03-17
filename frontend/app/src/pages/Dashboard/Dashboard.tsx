import React from 'react';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import PageLayout from '../../components/Layout/PageLayout';
import { CourseList, endpointTypes } from '../../components/CourseList/CourseList';
import { bookmarkTypes } from '../../utils/bookmarkConstants';
import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import BookmarkTabList from '../../components/BookmarkTabList/BookmarkTabList';

const Dashboard: React.FunctionComponent = () => {
    return (
        <ProtectedRoute>
            <PageLayout title="Dashboard">
                <Grid container spacing={2} xs={12} justifyContent="center" margin={0}>
                    <Grid>
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
                    </Grid>
                    <Grid>
                        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                            Bookmarked Posts/Exams
                        </Typography>
                        <BookmarkTabList queryPage={1} queryLimit={6} />
                    </Grid>
                </Grid>
            </PageLayout>
        </ProtectedRoute>
    );
};

export default Dashboard;
