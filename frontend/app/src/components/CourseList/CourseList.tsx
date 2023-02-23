import { Box, Pagination, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useEffect, useState } from 'react';

import { CourseCard } from '../CourseCard/CourseCard';
import HTTP from '../../utils/http';
import useSWR from 'swr';

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

function createCourseCards(data: any): React.ReactElement[] {
    const courseCards: React.ReactElement[] = [];
    console.log(data.data);
    for (let course of data.data) {
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
    const fetcher = (url: string) => HTTP.get(url).then((res) => res.data);
    const url: string = `/courses?limit=${queryLimit}&page=${queryPage}&keyword=${queryKeyword}`;
    const { data, error } = useSWR(url, fetcher);

    const [courseList, setCourseList] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        if (data) {
            setCourseList(createCourseCards(data));
        }

        if (error) console.log(error);
    }, [data, error]);

    if (error) {
        return <div>Error</div>;
    }

    // if (queryLimit == 0 && queryPage == 0 && queryKeyword == undefined) {
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
    // }

    /** Fetching data from DB */
    // courseList = fetchCourses(queryLimit, queryPage, queryKeyword);

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
