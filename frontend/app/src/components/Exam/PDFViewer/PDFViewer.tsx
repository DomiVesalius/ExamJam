import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

interface PDFViewerProps {
    pdf: any;
}

const PDFViewer: React.FunctionComponent<PDFViewerProps> = (props: PDFViewerProps) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.3)', height: '750px'}}>
                <Viewer fileUrl={props.pdf}/>
            </div>
        </Worker>
    );
};

export default PDFViewer;