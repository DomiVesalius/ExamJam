import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PostPreviewList, { PostType } from '../Post/PostPreviewList/PostPreviewList';
import { SearchBar } from '../SearchBar/SearchBar';
import { blue, lightBlue } from '@mui/material/colors';
import { Stack } from '@mui/material';

export interface PostPanelProps {
    courseCode: string;
    queryPage: number;
    queryLimit: number;
}

const PostPanel: React.FunctionComponent<PostPanelProps> = (props: PostPanelProps) => {
    const [panelIndex, setPanelIndex] = useState<string>('1');
    const [keyword, setKeyword] = useState('');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setPanelIndex(newValue);
    };

    return (
        <Box sx={{ width: '50vw', typography: 'body1' }}>
            <TabContext value={panelIndex}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        variant="fullWidth"
                        onChange={handleChange}
                        aria-label="Tab panel for separating crowdsourced and piazza-sourced posts"
                    >
                        <Tab label="Piazza-Sourced" value="1" />
                        <Tab label="Crowd-Sourced" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <PostPreviewList
                        courseCode={props.courseCode}
                        queryPage={props.queryPage}
                        queryLimit={props.queryLimit}
                        postType={PostType.piazza}
                        queryKeyword={keyword}
                    />
                </TabPanel>
                <TabPanel value="2">
                    <Stack spacing={2}>
                        <SearchBar
                            hoverColor={blue['300']}
                            defaultColor={lightBlue['300']}
                            placeHolder="Search for courses..."
                            handleSubmit={setKeyword}
                        />
                        <PostPreviewList
                            courseCode={props.courseCode}
                            queryPage={props.queryPage}
                            queryLimit={props.queryLimit}
                            postType={PostType.regular}
                            queryKeyword={keyword}
                        />
                    </Stack>
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default PostPanel;
