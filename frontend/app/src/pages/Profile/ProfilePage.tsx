import React, { useState } from 'react';
import '../EditProfile/Profile.css';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import PageLayout from '../../components/Layout/PageLayout';
import { Collapse, Container, Grid, Stack, Typography } from '@mui/material';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import PostPreviewList, { PostType } from '../../components/Post/PostPreviewList/PostPreviewList';
import BookmarkedItem, { BookmarkedItemType } from '../../components/BookmarkedItem/BookmarkedItem';
import MyPosts from '../../components/Post/MyPosts/MyPosts';
import BookmarkTabList from '../../components/BookmarkTabList/BookmarkTabList';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const ProfilePage = () => {
    const [panelIndex, setPanelIndex] = useState<string>('1');
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setPanelIndex(newValue);
    };

    return (
        <ProtectedRoute>
            <PageLayout title="My Profile">
                <Stack spacing={2}>
                    <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ProfileCard />
                    </Grid>
                    <Grid item>
                        <TabContext value={panelIndex}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList
                                    variant="fullWidth"
                                    onChange={handleChange}
                                    aria-label="User related items"
                                >
                                    <Tab label="My Posts" value="1" />
                                </TabList>
                            </Box>
                            <TabPanel value="1" sx={{ display: 'flex', justifyContent: 'center' }}>
                                <MyPosts queryLimit={5} queryPage={1} />
                            </TabPanel>
                        </TabContext>
                    </Grid>
                </Stack>
            </PageLayout>
        </ProtectedRoute>
    );
};

export default ProfilePage;
