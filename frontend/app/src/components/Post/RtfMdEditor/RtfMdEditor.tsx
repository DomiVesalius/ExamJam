import React, { ChangeEvent } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    Typography
} from '@mui/material';
import MarkdownEditor, { ICommand } from '@uiw/react-markdown-editor';
import 'react-quill/dist/quill.snow.css';
// @ts-ignore
import ImageResize from 'quill-image-resize-module-react';
import { InlineMath, BlockMath } from 'react-katex';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Commands } from '@uiw/react-markdown-editor/cjs/components/ToolBar';

export interface RtfMdEditorProps {
    rtfValue: string;
    setRtfValue: React.Dispatch<React.SetStateAction<string>>;
    mdValue: string;
    setMdValue: React.Dispatch<React.SetStateAction<string>>;
    editorState: string;
    setEditor: React.Dispatch<React.SetStateAction<string>>;
    editorHeight: number | string;
    editorWidth: number | string;
}

const RtfMdEditor: React.FunctionComponent<RtfMdEditorProps> = (props: RtfMdEditorProps) => {
    const {
        rtfValue,
        setRtfValue,
        mdValue,
        setMdValue,
        editorState,
        setEditor,
        editorHeight,
        editorWidth
    } = props;

    if (
        rtfValue === undefined &&
        setRtfValue === undefined &&
        mdValue === undefined &&
        setMdValue === undefined &&
        editorState === undefined &&
        setEditor === undefined
    ) {
        return <Typography variant="subtitle1">Error: Missing state props/hooks</Typography>;
    }

    function handleEditorChange(event: ChangeEvent<HTMLInputElement>, value: string) {
        setEditor(value);
    }

    // Set markdown editor to light/dark mode.
    const storage = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    window.document.documentElement.setAttribute('data-color-mode', storage);

    Quill.register('modules/imageResize', ImageResize);
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ align: [] }]
    ];
    const quillModules = {
        toolbar: toolbarOptions,
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        }
    };
    const rtfEditor = (
        <Stack spacing={4} direction="column">
            <ReactQuill
                theme="snow"
                value={rtfValue}
                onChange={(value) => setRtfValue(value)}
                modules={quillModules}
                style={{
                    height: editorHeight,
                    minHeight: editorHeight,
                    padding: '20px',
                    width: editorWidth
                }}
            />
        </Stack>
    );

    const mdRenderers = {
        // @ts-ignore
        inlineMath: ({ value }) => <InlineMath math={value} />,
        // @ts-ignore
        math: ({ value }) => <BlockMath math={value} />
    };

    const mdEditorToolbars: Array<Commands> = [
        'undo',
        'redo',
        'bold',
        'italic',
        'header',
        'strike',
        'underline',
        'quote',
        'olist',
        'ulist',
        'todo',
        'link',
        'image',
        'code',
        'codeBlock',
        'fullscreen',
        'preview'
    ];

    const markdownEditor = (
        <MarkdownEditor
            value={mdValue}
            onChange={(value = '', event) => {
                setMdValue(value);
            }}
            previewProps={{
                source: mdValue,
                remarkPlugins: [remarkMath],
                rehypePlugins: [rehypeKatex]
            }}
            toolbars={mdEditorToolbars}
            style={{ height: editorHeight, minHeight: editorHeight, width: editorWidth }}
            visible={true}
        />
    );

    return (
        <Stack spacing={2}>
            <FormControl>
                <FormLabel id="editor-row-radio-buttons-group-label">Editors</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="editor-row-radio-buttons-group-label"
                    defaultValue="markdown"
                    name="row-radio-buttons-group"
                    value={editorState}
                    onChange={handleEditorChange}
                >
                    <FormControlLabel value="rtf" control={<Radio />} label="Rich-Text-Format" />
                    <FormControlLabel value="markdown" control={<Radio />} label="Markdown" />
                </RadioGroup>
            </FormControl>
            {editorState == 'rtf' ? rtfEditor : markdownEditor}
        </Stack>
    );
};

export default RtfMdEditor;
