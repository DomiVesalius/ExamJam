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
    }, [props.title]);

    return (
        <>
            <Navbar
                userMenu1="Profile"
                userMenu2="Logout"
                navbarName="Exam Jam"
                searchDefaultColor="#FFFFFF"
                searchHoverColor="#FFFFFF"
                searchPlaceholder="Search for courses..."
            />
            {props.children}
        </>
    );
};

export default PageLayout;
