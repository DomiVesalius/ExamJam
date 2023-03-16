import { Avatar, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const imgLink = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
const parent = "Fernando Mancini";
const child = "Nando Sousa"







export const CommentCard = () => {
    return (
        <Card sx={{ p: "40px 20px" }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item >
                    <Avatar alt="Remy Sharp" src={imgLink} />
                    <Stack sx={{mt: "20px"}}>
                        <ThumbUpIcon></ThumbUpIcon>
                        <ThumbDownIcon></ThumbDownIcon>
                    </Stack>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <Typography variant={"h6"} sx={{m: 0, textAlign: "left",  fontWeight: 'bold' }}>{parent}</Typography>
                    <Typography align="left" paragraph={true}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                        Suspendisse congue vulputate lobortis. Pellentesque at interdum
                        tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                        sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                        metus, efficitur lobortis nisi quis, molestie porttitor metus.
                        Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                        tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                        lectus vitae
                    </Typography>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            <Grid container wrap="nowrap" spacing={2}  sx={{ mx: 3,  bgcolor: '#ededed',  borderRadius: '8px' }} >
                <Grid item>
                    <Avatar alt="Remy Sharp" src={imgLink} />
                    <Stack sx={{mt: "20px"}}>
                        <ThumbUpIcon></ThumbUpIcon>
                        <ThumbDownIcon></ThumbDownIcon>
                    </Stack>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <div>
                        <Typography variant={"h6"} sx={{m: 0, textAlign: "left",  fontWeight: 'bold' }}>{child}</Typography>
                        <Typography sx={{m: 0, textAlign: "left", color: 'blue', fontWeight: 'bold'  }}>Replying to {parent}</Typography>
                    </div>
                    <Typography align="left" sx={{mr: "20px" }} paragraph={true}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                            luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                            Suspendisse congue vulputate lobortis. Pellentesque at interdum
                            tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                            sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                            metus, efficitur lobortis nisi quis, molestie porttitor metus.
                            Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                            tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                            lectus vitae
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
};
