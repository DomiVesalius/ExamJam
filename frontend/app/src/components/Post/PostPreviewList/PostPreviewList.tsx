import React, { useEffect, useState } from 'react';
import PostPreview from '../PostPreview/PostPreview';
import HTTP from '../../../utils/http';
import useSWR from 'swr';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import PiazzaPostPreview from '../../Piazza/PiazzaPostPreview/PiazzaPostPreview';

export enum PostType {
    piazza = 'piazza',
    regular = 'regular'
}

interface PostPreviewListProps {
    courseCode: string;
    queryPage: number;
    queryLimit: number;
    postType: PostType;
    queryKeyword: string;
}

function createPostPreviews(
    data: any,
    type: PostType,
    courseCode: string
): [React.ReactElement[], number] {
    const MAX_CONTENT_LENGTH = 200;
    const previews: React.ReactElement[] = [];

    for (let post of data.data) {
        let postElement: React.ReactElement;

        if (type === PostType.piazza) {
            postElement = (
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
        } else {
            postElement = (
                <PostPreview
                    courseCode={courseCode}
                    author={post.author}
                    content={post.content}
                    createdAt={new Date(post.createdAt)}
                    examId={post.examId}
                    postId={post._id}
                    previewTextMaxLength={MAX_CONTENT_LENGTH}
                    title={post.title}
                    updatedAt={new Date(post.updatedAt)}
                    isBookmarked={post.isBookmarked}
                />
            );
        }

        previews.push(postElement);
    }

    return [previews, data.totalPages];
}

const PostPreviewList: React.FunctionComponent<PostPreviewListProps> = (
    props: PostPreviewListProps
) => {
    const [currentPage, setCurrentPage] = useState<number>(props.queryPage);
    const fetcher = (url: string) => HTTP.get(url).then((res) => res.data);

    let url: string;
    if (props.postType === PostType.piazza) {
        url = `/piazza/courses/${props.courseCode}?page=${currentPage}&limit=${props.queryLimit}&keyword=${props.queryKeyword}`;
    } else {
        url = `/posts/courses/${props.courseCode}?page=${currentPage}&limit=${props.queryLimit}&keyword=${props.queryKeyword}`;
    }

    const { data, error } = useSWR(url, fetcher);

    const [postList, setPostList] = useState<React.ReactElement[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) =>
        setCurrentPage(newPage);

    useEffect(() => {
        if (data) {
            const [previews, totalPages] = createPostPreviews(
                data,
                props.postType,
                props.courseCode
            );
            setPostList(previews);
            setTotalPages(totalPages);
        }
    }, [data, error]);

    if (error) {
        if (props.postType === PostType.piazza) {
            return (
                <Typography variant="subtitle1">No piazza posts found for this course</Typography>
            );
        }

        return (
            <Typography variant="subtitle1">
                No discussion posts found for this course. Make the first one!
            </Typography>
        );
    }

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

export default PostPreviewList;
