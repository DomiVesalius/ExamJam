import React, { useEffect, useState } from 'react';
import { fetcher } from '../../../utils/helpers';
import useSWR from 'swr';
import PostPreview from '../PostPreview/PostPreview';
import { Box, Pagination, Stack, Typography } from '@mui/material';

interface MyPostsProps {
    queryLimit: number;
    queryPage: number;
}

interface Post {
    _id: string;
    author: string;
    title: string;
    content: string;
    examId: string;
    courseCode: string;
    createdAt: string;
    updatedAt: string;
    isBookmarked: boolean;
}

function createMyPostCards(data: any): [React.ReactElement[], number] {
    const MAX_CONTENT_LENGTH = 200;

    const postList: React.ReactElement[] = [];
    for (const post of data.data) {
        postList.push(
            <div key={post._id}>
                <PostPreview
                    key={post._id}
                    postId={post._id}
                    courseCode={post.courseCode}
                    title={post.title}
                    examId={post.examId}
                    createdAt={new Date(post.createdAt)}
                    updatedAt={new Date(post.updatedAt)}
                    author={post.author}
                    previewTextMaxLength={MAX_CONTENT_LENGTH}
                    content={post.content}
                    isBookmarked={post.isBookmarked}
                />
            </div>
        );
    }

    return [postList, data.totalPages];
}

const MyPosts: React.FunctionComponent<MyPostsProps> = (props: MyPostsProps) => {
    const [posts, setPosts] = useState<React.ReactElement[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(props.queryPage);
    const [totalPages, setTotalPages] = useState<number>(1);

    const url = `/posts/my-posts?page=${currentPage}&limit=${props.queryLimit}`;

    const { data, error } = useSWR(url, fetcher);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) =>
        setCurrentPage(newPage);

    useEffect(() => {
        if (data) {
            const [postCards, totalPages] = createMyPostCards(data);
            setPosts(postCards);
            setTotalPages(totalPages);
        }

        if (error) console.log(error);
    }, [data, error]);

    if (error) return <Typography variant="subtitle1">You have not created any posts</Typography>;

    return (
        <Stack spacing={2} direction="column">
            <Box>
                <Pagination count={totalPages} onChange={handleChangePage} />
            </Box>
            <Stack spacing={2} direction="column">
                {posts.map((post) => post)}
            </Stack>
        </Stack>
    );
};

export default MyPosts;
