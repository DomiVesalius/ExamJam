import { Container, Typography } from '@mui/material';
import React from 'react';

interface CourseTitleProps {
    courseCode: string;
    title: string;
    description: string;
}

export const CourseTitle: React.FunctionComponent<CourseTitleProps> = ({
    courseCode,
    title,
    description
}) => {
    return (
        <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="left" color="text.primary" gutterBottom>
                {`${courseCode} - ${title}`}
            </Typography>
            <Typography variant="h5" align="left" color="text.secondary" paragraph>
                {description}
            </Typography>
        </Container>
    );
};
