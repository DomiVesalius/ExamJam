import React from 'react';
import Answer, { AnswerProps } from '../Answer/Answer';
import { FollowupProps } from '../Followup/Followup';
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import FollowupSection from '../FollowupSection/FollowupSection';

export interface PiazzaPostProps {
    _id: string;
    forumId: string;
    courseCode: string;
    postNumber: number;
    title: string;
    content: string;
    createdAt: Date;
    followups: FollowupProps[];
    answers: AnswerProps[];
}

const PiazzaPost: React.FunctionComponent<PiazzaPostProps> = (props) => {
    return (
        <Stack spacing={2}>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        {QUESTION_SYMBOL} <strong>question @{props.postNumber}</strong>{' '}
                        <i style={{ fontSize: 'small' }}>
                            {props.courseCode} forum {props.forumId}
                        </i>
                    </Typography>
                </CardContent>
                <Divider />
                <CardContent>
                    <Typography variant="h4">{props.title}</Typography>
                    <div dangerouslySetInnerHTML={{ __html: props.content }} />
                    <Divider />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'end'
                        }}
                    >
                        <p
                            style={{
                                marginBottom: 0,
                                paddingBlock: 0
                            }}
                        >
                            Created on {props.createdAt.toLocaleDateString()}
                        </p>
                    </div>
                </CardContent>
            </Card>
            {props.answers.map((ans) => (
                <Answer id={ans.id} postId={ans.postId} content={ans.content} type={ans.type} />
            ))}

            <FollowupSection followups={props.followups} />
        </Stack>
    );
};

const QUESTION_SYMBOL = (
    <svg width="24px" height="24px" aria-hidden="true" focusable="false">
        <use xlinkHref="#Question">
            <symbol id="Question" viewBox="0 0 14 16" preserveAspectRatio="none">
                <rect
                    fill="#484A4D"
                    x="0"
                    y="0"
                    width="14"
                    height="16"
                    rx="2"
                    data-darkreader-inline-fill=""
                ></rect>
                <path
                    d="M6,12 L8,12 L8,14 L6,14 L6,12 Z M3,5.82205029 C3.01084016,5.26498754 3.11111016,4.75435435 3.30081301,4.2901354 C3.49051585,3.82591644 3.75609585,3.42359938 4.09756098,3.08317215 C4.4390261,2.74274491 4.8509461,2.4771125 5.33333333,2.28626692 C5.81572057,2.09542135 6.35501057,2 6.95121951,2 C7.72087106,2 8.36314106,2.10057926 8.87804878,2.30174081 C9.3929565,2.50290236 9.8075865,2.75306104 10.1219512,3.05222437 C10.4363159,3.3513877 10.6612459,3.67375714 10.796748,4.01934236 C10.93225,4.36492758 11,4.68729702 11,4.98646035 C11,5.48162723 10.93225,5.88910221 10.796748,6.20889749 C10.6612459,6.52869277 10.4932259,6.80206205 10.2926829,7.02901354 C10.0921399,7.25596503 9.86991992,7.44938669 9.62601626,7.60928433 C9.3821126,7.76918197 9.1517626,7.92907721 8.93495935,8.08897485 C8.7181561,8.2488725 8.5257461,8.43197834 8.35772358,8.63829787 C8.18970106,8.84461741 8.08401106,9.10251296 8.04065041,9.41199226 L8.04065041,10 L5.84552846,10 L5.84552846,9.30367505 C5.87804894,8.86008805 5.96747894,8.48871845 6.11382114,8.18955513 C6.26016333,7.8903918 6.43089333,7.6350752 6.62601626,7.42359768 C6.82113919,7.21212015 7.02709919,7.02901431 7.24390244,6.87427466 C7.46070569,6.71953501 7.66124569,6.56479768 7.84552846,6.41005803 C8.02981122,6.25531838 8.17886122,6.08510731 8.29268293,5.89941973 C8.40650463,5.71373215 8.45799463,5.48162615 8.44715447,5.20309478 C8.44715447,4.72855985 8.32520447,4.3778219 8.08130081,4.15087041 C7.83739715,3.92391892 7.49864715,3.81044487 7.06504065,3.81044487 C6.77235626,3.81044487 6.52032626,3.86460294 6.30894309,3.9729207 C6.09755992,4.08123845 5.92411992,4.22565996 5.78861789,4.40618956 C5.65311585,4.58671915 5.55284585,4.7981935 5.48780488,5.04061896 C5.4227639,5.28304441 5.3902439,5.54351892 5.3902439,5.82205029 L3,5.82205029 Z"
                    fill="#FFFFFF"
                    data-darkreader-inline-fill=""
                ></path>
            </symbol>
        </use>
    </svg>
);

export default PiazzaPost;
