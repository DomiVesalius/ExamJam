import { Box } from '@mui/material';
import React, { useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import BookmarkedItem, { BookmarkedItemType } from '../BookmarkedItem/BookmarkedItem';

export interface BookmarkTabListProps {
    queryPage: number;
    queryLimit: number;
}

const BookmarkTabList: React.FunctionComponent<BookmarkTabListProps> = (
    props: BookmarkTabListProps
) => {
    const [panelIndex, setPanelIndex] = useState<string>('1');

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setPanelIndex(newValue);
    };

    return (
        <Box sx={{ width: '50vw', typography: 'body1', maxWidth: '100%' }}>
            <TabContext value={panelIndex}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        variant="fullWidth"
                        onChange={handleTabChange}
                        aria-label="Tab panel for separating bookmarked posts and exams"
                        centered
                    >
                        <Tab label="Bookmarked Posts" value="1" />
                        <Tab label="Bookmarked Exams" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <BookmarkedItem
                        type={BookmarkedItemType.post}
                        queryPage={props.queryPage}
                        queryLimit={props.queryLimit}
                    />
                </TabPanel>
                <TabPanel value="2">
                    <BookmarkedItem
                        type={BookmarkedItemType.exam}
                        queryPage={props.queryPage}
                        queryLimit={props.queryLimit}
                    />
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default BookmarkTabList;
