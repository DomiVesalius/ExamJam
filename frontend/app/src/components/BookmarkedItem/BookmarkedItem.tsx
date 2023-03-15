import React from 'react';

export enum BookmarkedItemType {
    post = 'post',
    exam = 'exam'
}

export interface BookmarkedItemProps {
    type: BookmarkedItemType;
    queryPage: number;
    queryLimit: number;
}

const BookmarkedItem: React.FunctionComponent<BookmarkedItemProps> = (
    props: BookmarkedItemProps
) => {
    return <div></div>;
};

export default BookmarkedItem;
