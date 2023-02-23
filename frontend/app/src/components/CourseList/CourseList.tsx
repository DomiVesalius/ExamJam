import { Box, Pagination, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

import { CourseCard } from '../CourseCard/CourseCard';
import http from '../../utils/http';
import useSWR from 'swr';
import { GetCoursesResponse } from '../../../../../backend/app/src/controllers/courses/courses.schemas';

interface CourseListProps {
    numCourses: number;
    rowSpacing: number;
    colSpacing: number;
    numPages: number;
    paginationSpacing: number;
    queryLimit: number;
    queryPage: number;
    queryKeyword: string;
}

function fetchCourses(
    queryLimit: number,
    queryPage: number,
    queryKeyword: string
): React.ReactElement[] {
    const fetcher = (url: string) => http.post(url).then((res) => res.data);
    const api: string = `/courses?limit=${queryLimit}&page=${queryPage}&keyword=${queryKeyword}`;
    const { data, error } = useSWR(api, fetcher);
    if (error) return [];
    const courseCards: React.ReactElement[] = [];
    data.map((item: GetCoursesResponse) => {
        const courses = item.data;
        for (let course of courses) {
            courseCards.push(
                <CourseCard
                    mainText={course.courseCode + ': ' + course.title}
                    bodyText={course.description}
                    imgPath={'https://source.unsplash.com/random'}
                    width={345}
                    height={140}
                    redirectURL="#"
                />
            );
        }
    });
    return courseCards;
}

export const CourseList: React.FunctionComponent<CourseListProps> = ({
    numCourses,
    rowSpacing,
    colSpacing,
    numPages,
    paginationSpacing,
    queryLimit,
    queryPage,
    queryKeyword
}: CourseListProps) => {
    const courseList: React.ReactElement[] = fetchCourses(queryLimit, queryPage, queryKeyword);

    // for (let i = 0; i < numCourses; i++) {
    //     courseList.push(
    //         <CourseCard
    //             mainText="Course Title"
    //             bodyText="Course Description"
    //             imgPath="https://source.unsplash.com/random"
    //             imgAlt="Course Image"
    //             width={345}
    //             height={140}
    //             redirectURL="#"
    //         />
    //     );
    // }

    /** Fetching data from DB */

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
