import React, { KeyboardEventHandler, MouseEventHandler, useState } from 'react';
import { CourseList } from '../../../components/CourseList/CourseList';
import { SearchBar } from '../../../components/SearchBar/SearchBar';
import PageLayout from '../../../components/Layout/PageLayout';
import { blue, lightBlue } from '@mui/material/colors';
import { Box, Container, Grid } from '@mui/material';
const CourseSearch: React.FunctionComponent = () => {
    const [keyword, setKeyword] = useState('');

    const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key == 'Enter') {
            console.log(('Entered with value: ' + (e.target as HTMLInputElement).value) as string);
            setKeyword((e.target as HTMLInputElement).value as string);
        }
    };

    return (
        <PageLayout title="Search Results">
            <Box sx={{ mb: 8 }}>
                <Container>
                    <SearchBar
                        hoverColor={blue['300']}
                        defaultColor={lightBlue['300']}
                        placeHolder="Search for courses..."
                        handleKeyPress={handleKeyPress}
                    />
                </Container>
            </Box>
            <Box>
                <Container>
                    <CourseList
                        rowSpacing={2}
                        colSpacing={2}
                        queryLimit={6}
                        queryPage={1}
                        queryKeyword={keyword}
                    />
                </Container>
            </Box>
        </PageLayout>
    );
};

export default CourseSearch;
