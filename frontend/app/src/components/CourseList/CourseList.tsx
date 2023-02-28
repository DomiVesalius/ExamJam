import { Box, Pagination, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useEffect, useState } from 'react';

import { CourseCard } from '../CourseCard/CourseCard';
import useSWR from 'swr';
import axios from 'axios';
import http from '../../utils/http';

interface CourseListProps {
    rowSpacing: number;
    colSpacing: number;
    queryLimit: number;
    queryPage: number;
    queryKeyword: string;
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
                redirectURL="#"
            />
        );
    }
    return [courseCards, data.totalPages];
}

export const CourseList: React.FunctionComponent<CourseListProps> = ({
    rowSpacing = 2,
    colSpacing = 2,
    queryLimit = 5,
    queryPage = 1,
    queryKeyword = 'csc'
}: CourseListProps) => {
    const [page, setPage] = React.useState(queryPage);
    const fetcher = (url: string) => http.get(url).then((res) => res.data);
    const url: string = `/courses?limit=${queryLimit}&page=${page}&keyword=${queryKeyword}`;
    const { data, error } = useSWR(url, fetcher);

    const [courseList, setCourseList] = useState<React.ReactElement[]>([]);

    const [totalPages, setTotalPages] = React.useState(1);

    useEffect(() => {
        if (data) {
            const courseCards = createCourseCards(data);
            setCourseList(courseCards[0]);
            setTotalPages(courseCards[1]);
        }

        if (error) {
            console.log(error);
        }
    }, [data, error]);

    if (error) {
        return <div>ERROR</div>;
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

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
