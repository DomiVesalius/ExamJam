import React from 'react';

interface SearchProps {
    /** Background color */
    backgroundColor?: string;

    /** Size of Search Bar */
    size?: 'small' | 'medium' | 'large';

    /** Placeholder text in search */
    placeHolder: string;
}

export const SearchBar = ({
    placeHolder,
    ...props
}: SearchProps) => {
    return (
        <form id="form">
            <input type="search" id="courseSearch" placeholder={placeHolder} />
            <button>Search</button>
        </form>
    );
};