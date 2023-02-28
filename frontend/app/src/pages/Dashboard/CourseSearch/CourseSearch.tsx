import React, { KeyboardEventHandler } from 'react';
import { CourseList } from '../../../components/CourseList/CourseList';
import { SearchBar } from '../../../components/SearchBar/SearchBar';
import PageLayout from '../../../components/Layout/PageLayout';
import { blue, lightBlue } from '@mui/material/colors';
import { Box, Container, Grid } from '@mui/material';
const CourseSearch: React.FunctionComponent = () => {
    const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key == 'Enter') {
            console.log('Entered with value: ' + (e.target as HTMLInputElement).value);
        }
    };

    const handleButtonPress = null;

    return (
        <PageLayout title="Search Results">
            <Box sx={{ mb: 8 }}>
                <SearchBar
                    hoverColor={blue['300']}
                    defaultColor={lightBlue['300']}
                    placeHolder="Search for courses..."
                    handleKeyPress={handleKeyPress}
                />
            </Box>
            <Box>
                <Container>
                    <CourseList
                        rowSpacing={2}
                        colSpacing={2}
                        queryLimit={5}
                        queryPage={1}
                        queryKeyword="csc"
                    />
                </Container>
            </Box>
        </PageLayout>
    );
};

export default CourseSearch;
