import React, { useEffect } from 'react';
import { fetcher } from '../../utils/helpers';
import useSWR from 'swr';
import { Box, Pagination, Stack, Typography } from '@mui/material';

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
    const bookmarkedElements: React.ReactElement[] = [];
    for (let bookmarkedItem of data.data) {
        let reactElement: React.ReactElement;
        if (type == BookmarkedItemType.exam) {
            // TODO: fetch data.data of type IExamModel[]
            reactElement = <Typography>Fill with data here</Typography>;
        } else {
            // TODO: fetch data.data of type IPostModel[]
            reactElement = <Typography>Fill with data here</Typography>;
        }
        bookmarkedElements.push(reactElement);
    }
    return [bookmarkedElements, data.totalPages];
}

const BookmarkedItem: React.FunctionComponent<BookmarkedItemProps> = (
    props: BookmarkedItemProps
) => {
    let endpoint: string = '';
    const [page, setPage] = React.useState(props.queryPage);
    if (props.type == BookmarkedItemType.exam) {
        // bookmarked exam
        endpoint = `/bookmarks/${BookmarkedItemType.exam}?limit=${props.queryLimit}&page=${props.queryPage}`;
    } else if (props.type == BookmarkedItemType.post) {
        // bookmarked post
        endpoint = `/bookmarks/${BookmarkedItemType.post}?limit=${props.queryLimit}&page=${props.queryPage}`;
    }

    if (endpoint == '') {
        return <Typography variant="subtitle1">Specify type</Typography>;
    }

    const { data, error } = useSWR(endpoint, fetcher);
    const [totalPages, setTotalPages] = React.useState(1);
    const [bookmarkedItems, setBookmarkedItems] = React.useState<React.ReactElement[]>([]);

    useEffect(() => {
        if (data) {
            const bookmarkedElements = createBookmarkedElements(data, props.type);
            setBookmarkedItems(bookmarkedElements[0]);
            setTotalPages(bookmarkedElements[1]);
        }
    }, [data, error]);

    if (error) {
        console.log(error);
        return (
            <Typography variant="subtitle1">
                Error Occurred from useSWR: Errors:
                {error}
            </Typography>
        );
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

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
