import { Box, Pagination, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useEffect, useState } from 'react';

import { CourseCard } from '../CourseCard/CourseCard';
import useSWR from 'swr';
import http from '../../utils/http';

export enum endpointTypes {
    courses = 'courses',
    bookmarks = 'bookmarks'
}

interface CourseListProps {
    rowSpacing: number;
    colSpacing: number;
    queryLimit: number;
    queryPage: number;
    queryKeyword: string;
    endpoint?: endpointTypes;
}

function createCourseCards(data: any): [React.ReactElement[], number] {
    const courseCards: React.ReactElement[] = [];
    for (let course of data.data) {
        courseCards.push(
            <CourseCard
                mainText={course.courseCode + ': ' + course.title}
                bodyText={course.description}
                imgPath={'https://source.unsplash.com/random'}
                width={345}
                height={140}
                redirectURL={`/dashboard/courses/${course.courseCode}`}
            />
        );
    }
    return [courseCards, data.totalPages];
}

export const CourseList: React.FunctionComponent<CourseListProps> = ({
    rowSpacing,
    colSpacing,
    queryLimit,
    queryPage,
    queryKeyword,
    endpoint = endpointTypes.courses
}: CourseListProps) => {
    const [page, setPage] = React.useState(queryPage);
    const fetcher = (url: string) => http.get(url).then((res) => res.data);
    let url: string = `/${endpointTypes.courses}?limit=${queryLimit}&page=${page}&keyword=${queryKeyword}`;
    if (endpoint == endpointTypes.bookmarks)
        url = `/${endpointTypes.bookmarks}?limit=${queryLimit}&page=${page}&type=${queryKeyword}`;
    const { data, error } = useSWR(url, fetcher);

    const [courseList, setCourseList] = useState<React.ReactElement[]>([]);

    const [totalPages, setTotalPages] = React.useState(1);

    useEffect(() => {
        if (data) {
            const courseCards = createCourseCards(data);
            setCourseList(courseCards[0]);
            setTotalPages(courseCards[1]);
        }

        if (error) console.log(error);
    }, [data, error]);

    if (error) {
        return <div>ERROR</div>;
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    if (courseList.length == 0 && endpoint == endpointTypes.bookmarks) {
        return (
            <Box sx={{ mt: 6 }}>
                <Typography align="center">Bookmarked courses will be displayed here</Typography>
            </Box>
        );
    } else if (courseList.length == 0 && endpoint == endpointTypes.courses) {
        return (
            <Box sx={{ mt: 6 }}>
                <Typography align="center">
                    Did you forget to load "Course" data into DB?
                </Typography>
            </Box>
        );
    }

    return (
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
                marginLeft={1}
            >
                {courseList.map((element) => (
                    <Grid>{element}</Grid>
                ))}
            </Grid>
            <Box paddingTop="5%" display="flex" justifyContent="center" alignItems="center">
                <Stack>
                    <Pagination count={totalPages} onChange={handleChangePage} />
                </Stack>
            </Box>
        </Box>
    );
};
