import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PDFViewer from "./PDFViewer";

export default {
    title: `Components/${PDFViewer.name}`,
    component: PDFViewer,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof PDFViewer>;

const Template: ComponentStory<typeof PDFViewer> = (args) => <PDFViewer {...args} />;

export const Default = Template.bind({});
Default.args = {
 pdf: `http://localhost:8080/api/exams/files/63e3de421b55a9a70eda4027`
};
