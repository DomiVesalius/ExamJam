import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

interface CourseCardProps {
    /** Title of Card */
    mainText: string;

    /** Text in body section of card */
    bodyText: string;

    /** Path/URL to image */
    imgPath: string;

    /** Optional: alt for image */
    imgAlt?: string;

    /** Width of card */
    width: number;

    /** Height of card */
    height: number;

    /** URL to redirect to once card is clicked */
    redirectURL: string;
}

export const CourseCard = ({
    mainText,
    bodyText,
    imgPath,
    imgAlt,
    width,
    height,
    redirectURL
}: CourseCardProps) => {
    const redirect = () => {
        window.location.href = redirectURL;
    };

    let bodyTextShrink: string = bodyText;
    if (bodyText.length > 120) {
        bodyTextShrink = bodyText.substring(0, 116) + '...';
    }

    let headerTextShrink: string = mainText;
    if (mainText.length > 25) {
        headerTextShrink = mainText.substring(0, 25) + '...';
    }

    return (
        <Card sx={{ width: width }}>
            <CardActionArea onClick={redirect}>
                <CardMedia component="img" height={`${height}`} image={imgPath} alt={imgAlt} />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {headerTextShrink}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {bodyTextShrink}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
