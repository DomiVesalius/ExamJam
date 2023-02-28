import React, { KeyboardEventHandler, MouseEventHandler, useState } from 'react';
import { CourseList } from '../../../components/CourseList/CourseList';
import { SearchBar } from '../../../components/SearchBar/SearchBar';
import PageLayout from '../../../components/Layout/PageLayout';
import { blue, lightBlue } from '@mui/material/colors';
import { Box, Container, Grid } from '@mui/material';
import ProtectedRoute from '../../../components/Routes/ProtectedRoute';
const CourseSearch: React.FunctionComponent = () => {
    const [keyword, setKeyword] = useState('');

    return (
        <ProtectedRoute>
            <PageLayout title="Search For Courses">
                <Box sx={{ mb: 8 }}>
                    <SearchBar
                        hoverColor={blue['300']}
                        defaultColor={lightBlue['300']}
                        placeHolder="Search for courses..."
                        handleSubmit={setKeyword}
                    />
                </Box>
                <Box>
                    <Container>
                        <CourseList
                            rowSpacing={2}
                            colSpacing={2}
                            queryLimit={6}
                            queryPage={1}
                            queryKeyword={keyword}
                        />
                    </Container>
                </Box>
            </PageLayout>
        </ProtectedRoute>
    );
};

export default CourseSearch;
