import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

import { CourseCard } from '../CourseCard/CourseCard';

interface CourseListProps {
    numCourses: number;
    rowSpacing: number;
    colSpacing: number;
}

export const CourseList = ({ numCourses, rowSpacing, colSpacing }: CourseListProps) => {
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
        <Box>
            <Grid container rowSpacing={rowSpacing} columnSpacing={colSpacing}>
                {courseList.map((element) => (
                    <Grid>{element}</Grid>
                ))}
            </Grid>
        </Box>
    );
};
