import React from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

export enum AnswerType {
    student = 's_answer',
    instructor = 'i_answer'
}

export interface AnswerProps {
    id: string;
    postId: string;
    content: string;
    type: AnswerType;
}

const Answer: React.FunctionComponent<AnswerProps> = (props) => {
    let headerText;
    if (props.type === AnswerType.student) {
        headerText = (
            <Typography variant="h6">
                {STUDENT_SYMBOL} <strong>the students' answer,</strong>{' '}
                <i style={{ fontSize: 'small' }}>
                    where students collectively construct a single answer
                </i>
            </Typography>
        );
    } else {
        headerText = (
            <Typography variant="h6">
                {INSTRUCTOR_SYMBOL} <strong>the instructors' answer,</strong>{' '}
                <i style={{ fontSize: 'small' }}>
                    where instructors collectively construct a single answer
                </i>
            </Typography>
        );
    }

    return (
        <Card key={props.id} sx={{ width: '50vw' }}>
            <CardContent>{headerText}</CardContent>
            <Divider />
            <CardContent>
                <div dangerouslySetInnerHTML={{ __html: props.content }} />
            </CardContent>
        </Card>
    );
};

const INSTRUCTOR_SYMBOL = (
    <svg width="24px" height="24px" aria-hidden="true" focusable="false">
        <use xlinkHref="#Instructors">
            <symbol id="Instructors" viewBox="0 0 14 16" preserveAspectRatio="none">
                <rect
                    fill="#FAAE40"
                    x="0"
                    y="0"
                    width="14"
                    height="16"
                    rx="2"
                    data-darkreader-inline-fill=""
                ></rect>
                <path
                    d="M6,6 L8,6 L8,12 L6,12 L6,6 Z M6,2 L8,2 L8,4 L6,4 L6,2 Z"
                    fill="#FFFFFF"
                    data-darkreader-inline-fill=""
                ></path>
            </symbol>
        </use>
    </svg>
);

const STUDENT_SYMBOL = (
    <svg width="24px" height="24px" aria-hidden="true" focusable="false">
        <use xlinkHref="#Students">
            <symbol id="Students" viewBox="0 0 14 16" preserveAspectRatio="none">
                <rect
                    fill="#8CC63F"
                    x="0"
                    y="0"
                    width="14"
                    height="16"
                    rx="2"
                    data-darkreader-inline-fill=""
                ></rect>
                <path
                    d="M5.275,9.49 C5.28500005,9.7700014 5.3499994,10.007499 5.47,10.2025 C5.5900006,10.397501 5.74749903,10.5524994 5.9425,10.6675 C6.13750098,10.7825006 6.35749878,10.8649997 6.6025,10.915 C6.84750123,10.9650003 7.0999987,10.99 7.36,10.99 C7.560001,10.99 7.7699989,10.9750001 7.99,10.945 C8.2100011,10.9149998 8.41249908,10.8600004 8.5975,10.78 C8.78250093,10.6999996 8.9349994,10.5825008 9.055,10.4275 C9.1750006,10.2724992 9.235,10.0750012 9.235,9.835 C9.235,9.50499835 9.11000125,9.25500085 8.86,9.085 C8.60999875,8.91499915 8.29750188,8.77750052 7.9225,8.6725 C7.54749813,8.56749947 7.1400022,8.47250042 6.7,8.3875 C6.2599978,8.30249957 5.85250188,8.18250077 5.4775,8.0275 C5.10249813,7.87249922 4.79000125,7.6550014 4.54,7.375 C4.28999875,7.0949986 4.165,6.7050025 4.165,6.205 C4.165,5.81499805 4.25249913,5.4800014 4.4275,5.2 C4.60250088,4.9199986 4.82749863,4.69250087 5.1025,4.5175 C5.37750138,4.34249912 5.68749828,4.21250042 6.0325,4.1275 C6.37750173,4.04249957 6.7199983,4 7.06,4 C7.5000022,4 7.90499815,4.03749962 8.275,4.1125 C8.64500185,4.18750037 8.97249858,4.31749907 9.2575,4.5025 C9.54250143,4.68750092 9.76999915,4.93749842 9.94,5.2525 C10.1100009,5.56750157 10.2099999,5.95999765 10.24,6.43 L8.965,6.43 C8.9449999,6.17999875 8.88000055,5.97250082 8.77,5.8075 C8.65999945,5.64249917 8.52000085,5.5100005 8.35,5.41 C8.17999915,5.3099995 7.99250103,5.23750022 7.7875,5.1925 C7.58249898,5.14749977 7.37500105,5.125 7.165,5.125 C6.97499905,5.125 6.78250098,5.13999985 6.5875,5.17 C6.39249903,5.20000015 6.2150008,5.25249962 6.055,5.3275 C5.8949992,5.40250037 5.7650005,5.50249937 5.665,5.6275 C5.5649995,5.75250062 5.515,5.914999 5.515,6.115 C5.515,6.3350011 5.59249923,6.51749927 5.7475,6.6625 C5.90250078,6.80750072 6.0999988,6.92749952 6.34,7.0225 C6.5800012,7.11750047 6.8499985,7.19749967 7.15,7.2625 C7.4500015,7.32750032 7.7499985,7.39499965 8.05,7.465 C8.3700016,7.53500035 8.68249848,7.6199995 8.9875,7.72 C9.29250153,7.8200005 9.56249883,7.95249917 9.7975,8.1175 C10.0325012,8.28250082 10.2224993,8.48999875 10.3675,8.74 C10.5125007,8.99000125 10.585,9.29999815 10.585,9.67 C10.585,10.1400023 10.487501,10.5299984 10.2925,10.84 C10.097499,11.1500015 9.84250158,11.399999 9.5275,11.59 C9.21249843,11.7800009 8.85750198,11.9124996 8.4625,11.9875 C8.06749803,12.0625004 7.67500195,12.1 7.285,12.1 C6.85499785,12.1 6.44500195,12.0550004 6.055,11.965 C5.66499805,11.8749995 5.3200015,11.727501 5.02,11.5225 C4.7199985,11.317499 4.4800009,11.0475017 4.3,10.7125 C4.1199991,10.3774983 4.0200001,9.9700024 4,9.49 L5.275,9.49 Z"
                    fill="#FFFFFF"
                    data-darkreader-inline-fill=""
                ></path>
            </symbol>
        </use>
    </svg>
);

export default Answer;
