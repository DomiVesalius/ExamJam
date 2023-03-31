import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../../utils/helpers';
import PiazzaPost, { PiazzaPostProps } from '../../components/Piazza/PiazzaPost/PiazzaPost';
import { FollowupProps } from '../../components/Piazza/Followup/Followup';
import { AnswerProps, AnswerType } from '../../components/Piazza/Answer/Answer';
import { FeedbackProps } from '../../components/Piazza/Feedback/Feedback';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import PageLayout from '../../components/Layout/PageLayout';

const PiazzaPostPage: React.FunctionComponent = () => {
    const { forumId, postNumber } = useParams();
    const url = `/piazza/forums/${forumId}/posts/${postNumber}`;
    const { data, error } = useSWR(url, fetcher);

    const [postInfo, setPostInfo] = useState<PiazzaPostProps>({
        _id: '',
        forumId: forumId || '',
        courseCode: '',
        postNumber: parseInt(postNumber || '0'),
        title: '',
        content: '',
        createdAt: new Date(),
        followups: [],
        answers: []
    });

    function extractAnswersAndFollowups(data: any): [AnswerProps[], FollowupProps[]] {
        const followups: FollowupProps[] = [];
        const answers: AnswerProps[] = [];

        for (const comment of data.data.comments) {
            if (comment.type === 'followup') {
                const commentChildren: FeedbackProps[] = [];

                for (const child of comment.children) {
                    commentChildren.push({
                        _id: child._id,
                        postId: child.postId,
                        parentId: child.parentId,
                        content: child.content
                    });
                }

                followups.push({
                    _id: comment._id,
                    postId: comment.postId,
                    content: comment.content,
                    commentChildren
                });
            } else {
                answers.push({
                    id: comment._id,
                    postId: comment.postId,
                    content: comment.content,
                    type:
                        AnswerType.student === comment.type
                            ? AnswerType.student
                            : AnswerType.instructor
                });
            }
        }

        return [answers, followups];
    }

    useEffect(() => {
        if (data) {
            const [answers, followups] = extractAnswersAndFollowups(data);
            setPostInfo({
                _id: data.data._id,
                forumId: data.data.forumId,
                courseCode: data.data.courseCode,
                postNumber: data.data.postNumber,
                title: data.data.title,
                content: data.data.content,
                createdAt: new Date(data.data.createdAt),
                followups,
                answers
            });
        }

        if (error) console.log(error);
    }, [data, error]);

    return (
        <ProtectedRoute>
            <PageLayout title={`${postInfo.courseCode} @ ${postInfo.postNumber}`}>
                <PiazzaPost {...postInfo} />
            </PageLayout>
        </ProtectedRoute>
    );
};

export default PiazzaPostPage;
