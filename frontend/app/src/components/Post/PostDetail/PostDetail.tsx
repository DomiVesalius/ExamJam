import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, Container, Stack, Typography } from '@mui/material';
import useSWR from 'swr';
import http from '../../../utils/http';

const fetcher = (url: string) => http.get(url).then((res) => res.data);

const PostDetail: React.FunctionComponent = () => {
    let { courseCode, postId } = useParams();

    const [post, setPost] = useState({
        postId: '',
        title: '',
        author: '',
        content: '',
        examId: '',
        createdAt: '',
        updatedAt: ''
    });

    const [exam, setExam] = useState({
        title: '',
        _id: '',
        courseCode: '',
        link: '',
        app_link: ''
    });

    const postUrl: string = `/posts/${postId}`;
    const examUrl: string = `/exams/${post.examId}`;

    const postSWR = useSWR(postUrl, fetcher);
    const postData = postSWR.data;
    const postError = postSWR.error;

    const examSWR = useSWR(examUrl, fetcher);
    const examData = examSWR.data;
    const examError = examSWR.error;

    useEffect(() => {
        if (postData) {
            setPost({
                postId: postData.data._id,
                author: postData.data.author,
                title: postData.data.title,
                content: postData.data.content,
                examId: postData.data.examId,
                createdAt: postData.data.createdAt,
                updatedAt: postData.data.updatedAt
            });
        }
    }, [postData]);

    useEffect(() => {
        if (examData) {
            setExam({
                title: examData.data.title,
                _id: examData.data._id,
                courseCode: examData.data.courseCode,
                link: examData.data.link,
                app_link: `/dashboard/courses/${examData.data.courseCode}/exams/${examData.data._id}`
            });
        }
    }, [examData]);

    if (postError || examError) {
        return <div>ERROR</div>;
    }
    if (!courseCode) {
        return <div>ERROR</div>;
    }

    return (
        <Container>
            <Card variant="outlined">
                <Stack spacing={2}>
                    <CardHeader title="" />
                    <CardContent>
                        <Stack spacing={2}>
                            <Stack spacing={2}>
                                <Typography variant="h5" component="h5">
                                    <b>{exam.courseCode}</b>
                                </Typography>
                                <Typography variant="h5" component="h5">
                                    {exam.title}
                                </Typography>
                            </Stack>
                            <Link to={`${exam.link}`} style={{ textDecoration: 'none' }}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{ width: '100%' }}
                                >
                                    <Typography variant="subtitle1">
                                        View the Official Exam
                                    </Typography>
                                </Button>
                            </Link>
                            <Link to={`${exam.app_link}`} style={{ textDecoration: 'none' }}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{ width: '100%' }}
                                >
                                    <Typography variant="subtitle1">View the Exam</Typography>
                                </Button>
                            </Link>

                            <Link
                                to={`/dashboard/courses/${courseCode}/create-post`}
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{ width: '100%' }}
                                >
                                    <Typography variant="subtitle1">Create a Post!</Typography>
                                </Button>
                            </Link>
                        </Stack>
                    </CardContent>
                </Stack>
            </Card>
        </Container>
    );
};

export default PostDetail;
