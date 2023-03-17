import React, { useEffect } from 'react';
import { fetcher } from '../../utils/helpers';
import useSWR from 'swr';
import {
    Box,
    Container,
    Pagination,
    Paper,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import PostPreview from '../Post/PostPreview/PostPreview';
import { PaginatedExamRow } from './paginatedExamTable/paginatedExamRow';

export enum BookmarkedItemType {
    post = 'post',
    exam = 'exam'
}

export interface BookmarkedItemProps {
    type: BookmarkedItemType;
    queryPage: number;
    queryLimit: number;
}

/**
 * Return a list of [list of react elements, total pages] from data given by parameter data.
 * @param data the returned data object from uswSWR
 * @param type whether the data is of type IExamModel[] or IPostModel[]
 */
function createBookmarkedElements(
    data: any,
    type: BookmarkedItemType
): [React.ReactElement[], number] {
    const MAX_CONTENT_LENGTH = 200;
    const bookmarkedElements: React.ReactElement[] = [];
    for (let bookmarkedItem of data.data) {
        console.log(bookmarkedItem);
        let reactElement: React.ReactElement;
        if (type == BookmarkedItemType.post) {
            reactElement = (
                <PostPreview
                    courseCode={bookmarkedItem.courseCode}
                    author={bookmarkedItem.author}
                    content={bookmarkedItem.content}
                    createdAt={new Date(bookmarkedItem.createdAt)}
                    examId={bookmarkedItem.examId}
                    postId={bookmarkedItem._id}
                    previewTextMaxLength={MAX_CONTENT_LENGTH}
                    title={bookmarkedItem.title}
                    updatedAt={new Date(bookmarkedItem.updatedAt)}
                    isBookmarked={true}
                />
            );
        } else {
            reactElement = <PaginatedExamRow exam={bookmarkedItem} />;
        }
        bookmarkedElements.push(reactElement);
    }
    return [bookmarkedElements, data.totalPages];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const BookmarkedItem: React.FunctionComponent<BookmarkedItemProps> = (
    props: BookmarkedItemProps
) => {
    let endpoint: string = '';
    const [page, setPage] = React.useState(props.queryPage);
    const [totalPages, setTotalPages] = React.useState(1);
    const [bookmarkedItems, setBookmarkedItems] = React.useState<React.ReactElement[]>([]);
    if (props.type == BookmarkedItemType.exam) {
        // bookmarked exam
        endpoint = `/bookmarks/?type=${BookmarkedItemType.exam}&limit=${props.queryLimit}&page=${props.queryPage}`;
    } else if (props.type == BookmarkedItemType.post) {
        // bookmarked post
        endpoint = `/bookmarks/?type=${BookmarkedItemType.post}&limit=${props.queryLimit}&page=${props.queryPage}`;
    }

    const { data, error } = useSWR(endpoint, fetcher);

    useEffect(() => {
        if (data) {
            const bookmarkedElements = createBookmarkedElements(data, props.type);
            setBookmarkedItems(bookmarkedElements[0]);
            setTotalPages(bookmarkedElements[1]);
        }
    }, [data, error]);

    if (error) {
        console.log(error);
        if (error.status == 404) {
            return (
                <Typography variant="subtitle1" align="center">
                    No bookmarks found.
                </Typography>
            );
        } else if (error.status == 400) {
            return (
                <Typography variant="subtitle1" align="center">
                    Bookmarks query to backend is malformed.
                </Typography>
            );
        }
    }

    if (endpoint == '') {
        return <Typography variant="subtitle1">Specify type</Typography>;
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    if (bookmarkedItems.length == 0) {
        return (
            <Typography variant="subtitle1" align="center">
                Bookmarked Exams/Posts will be displayed here.
            </Typography>
        );
    }

    if (props.type == BookmarkedItemType.exam) {
        return (
            <Stack spacing={2} direction="column">
                <Box>
                    <Pagination count={totalPages} onChange={handleChangePage} />
                </Box>
                <Stack spacing={2} direction="column">
                    <Container
                        sx={{
                            pt: 2,
                            pb: 2
                        }}
                        maxWidth="md"
                    >
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 700, fontWeight: 'bold' }}
                                aria-label="customized table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Exam</StyledTableCell>
                                        <StyledTableCell align="left">Original URL</StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>{bookmarkedItems.map((item) => item)}</TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                </Stack>
            </Stack>
        );
    }

    return (
        <Stack spacing={2} direction="column">
            <Box>
                <Pagination count={totalPages} onChange={handleChangePage} />
            </Box>
            <Stack spacing={2} direction="column">
                {bookmarkedItems.map((item) => item)}
            </Stack>
        </Stack>
    );
};

export default BookmarkedItem;
