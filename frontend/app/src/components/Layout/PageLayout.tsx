import React, { useEffect } from 'react';
import { Link } from '@mui/material';

interface LayoutProps {
    children?: React.ReactNode;
    title: string;
}
const PageLayout: React.FunctionComponent<LayoutProps> = (props: LayoutProps): JSX.Element => {
    useEffect(() => {
        document.title = props.title;
    }, []);

    return <>{props.children}</>;
};

export default PageLayout;
