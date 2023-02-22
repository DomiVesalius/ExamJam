import { Box, Pagination, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

import { CourseCard } from '../CourseCard/CourseCard';

interface CourseListProps {
    numCourses: number;
    rowSpacing: number;
    colSpacing: number;
    numPages: number;
    paginationSpacing: number;
}

export const CourseList = ({
    numCourses,
    rowSpacing,
    colSpacing,
    numPages,
    paginationSpacing
}: CourseListProps) => {
    const courseList: React.ReactElement[] = [];

    for (let i = 0; i < numCourses; i++) {
        courseList.push(
            <CourseCard
                mainText="Course Title"
                bodyText="Course Description"
                imgPath="https://source.unsplash.com/random"
                imgAlt="Course Image"
                width={345}
                height={140}
                redirectURL="#"
            />
        );
    }

    return (
        /** TODO: Create prev and next buttons.
         *  TODO: prev button should be disabled at page 1. next button should be disabled at end of totalPages.
         */
        <Box>
            <Grid
                container
                rowSpacing={rowSpacing}
                columnSpacing={colSpacing}
                justifyContent={{
                    xs: 'center',
                    sm: 'start',
                    md: 'start'
                }}
                alignItems="center"
            >
                {courseList.map((element) => (
                    <Grid>{element}</Grid>
                ))}
            </Grid>
            <Box paddingTop="5%" display="flex" justifyContent="center" alignItems="center">
                <Stack spacing={paginationSpacing}>
                    <Pagination count={numPages} />
                </Stack>
            </Box>
        </Box>
    );
};
