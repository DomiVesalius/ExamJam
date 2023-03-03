import React, { useEffect, useState } from 'react';
import HTTP from '../../../utils/http';
import useSWR from 'swr';
import PiazzaPostPreview from '../PiazzaPostPreview/PiazzaPostPreview';
import { Box, Pagination, Stack, Typography } from '@mui/material';

interface PiazzaPostPreviewListProps {
    courseCode: string;
    queryPage: number;
    queryLimit: number;
}

function createPiazzaPostPreviews(data: any): [React.ReactElement[], number] {
    const MAX_CONTENT_LENGTH = 200;
    const previews: React.ReactElement[] = [];

    for (let post of data.data) {
        previews.push(
            <PiazzaPostPreview
                postId={post._id}
                forumId={post.forumId}
                postNumber={post.postNumber}
                courseCode={post.courseCode}
                title={post.title}
                content={post.content}
                createdAt={new Date(post.createdAt)}
                numComments={post.comments.length}
                previewTextMaxLength={MAX_CONTENT_LENGTH}
            />
        );
    }

    return [previews, data.totalPages];
}

const PiazzaPostPreviewList: React.FunctionComponent<PiazzaPostPreviewListProps> = (
    props: PiazzaPostPreviewListProps
) => {
    const [currentPage, setCurrentPage] = useState<number>(props.queryPage);
    const fetcher = (url: string) => HTTP.get(url).then((res) => res.data);
    const url: string = `/piazza/courses/${props.courseCode}?page=${currentPage}&limit=${props.queryLimit}`;

    const { data, error } = useSWR(url, fetcher);

    const [postList, setPostList] = useState<React.ReactElement[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) =>
        setCurrentPage(newPage);

    useEffect(() => {
        if (data) {
            const [previews, totalPages] = createPiazzaPostPreviews(data);
            setPostList(previews);
            setTotalPages(totalPages);
        }
    }, [data, error]);

    if (error)
        return <Typography variant="subtitle1">No piazza posts found for this course</Typography>;

    return (
        <Stack spacing={2} direction="column">
            <Box>
                <Pagination count={totalPages} onChange={handleChangePage} />
            </Box>
            <Stack spacing={2} direction="column">
                {postList.map((post) => post)}
            </Stack>
        </Stack>
    );
};

export default PiazzaPostPreviewList;
