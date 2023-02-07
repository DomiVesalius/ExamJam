import React, { useEffect } from 'react';
import { Navbar } from '../Navbar/Navbar';

export interface LayoutProps {
    children?: React.ReactNode;
    title: string;
}

/**
 * Primary layout for the ExamJam application. Currently, there are no other components but using this
 * to create Page components will improve code extensibility.
 */
const PageLayout: React.FunctionComponent<LayoutProps> = (props: LayoutProps): JSX.Element => {
    useEffect(() => {
        document.title = props.title;
    }, []);

    return (
        <>
            // Insert Navbar tag here.
            {props.children}
        </>
    );
};

export default PageLayout;
