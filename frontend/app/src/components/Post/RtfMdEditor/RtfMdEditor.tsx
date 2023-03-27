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

    const inlineMath: ICommand = {
        name: 'inline math',
        keyCommand: 'inline math',
        icon: (
            <svg width="12" height="12" viewBox="0 0 512 512">
                <path
                    d="M492.245,377.007c-11.009-0.211-20.184,8.531-20.417,19.575c-0.004,0.193-0.671,19.863-10.122,39.103
				c-12.005,24.438-32.029,36.318-61.215,36.318c-14.747,0-25.734-4.3-33.591-13.146c-17.351-19.537-17.111-57.787-15.561-70.831
				c0.028-0.229,0.053-0.458,0.073-0.687c0.102-1.155,10.335-116.617,17.536-214.871c0.808-11.016-7.468-20.601-18.484-21.408
				c-11.016-0.813-20.601,7.468-21.408,18.484c-7.015,95.705-16.92,207.856-17.464,214.002c-0.306,2.724-1.77,17.432-0.048,35.585
				c2.644,27.873,11.164,50.128,25.323,66.145c15.455,17.485,37.456,26.727,63.623,26.727c24.553,0,45.887-6.207,63.411-18.448
				c14.084-9.838,25.424-23.375,33.706-40.234c13.463-27.407,14.187-54.746,14.211-55.896
				C512.052,386.381,503.288,377.24,492.245,377.007z"
                />
                <path
                    d="M469.756,77.424c18.535-12.323,32.598-29.638,40.669-50.073c4.058-10.273-0.982-21.89-11.255-25.948
				c-10.272-4.057-21.89,0.981-25.948,11.255c-10.24,25.927-36.38,43.347-65.046,43.347H146.826
				c-45.647,0-85.448,20.129-115.103,58.211C10.03,142.074,1.398,170.02,1.041,171.196c-3.207,10.57,2.752,21.768,13.322,24.976
				c1.942,0.589,3.902,0.87,5.831,0.87c8.569-0.001,16.488-5.543,19.106-14.171c0.07-0.227,7.252-22.973,24.728-45.025
				c22.001-27.764,49.859-41.841,82.799-41.841h36.378c-0.466,7.43-0.94,15.349-1.432,23.59
				c-3.966,66.409-9.398,157.362-24.761,232.27c-15.889,77.471-39.393,120.137-66.184,120.137c-11.046,0-20,8.954-20,20
				s8.954,20,20,20c28.422,0,52.323-16.671,71.039-49.55c13.988-24.572,25.217-58.115,34.33-102.551
				c15.937-77.706,21.467-170.307,25.506-237.922c0.546-9.141,1.069-17.898,1.582-25.974v-0.002h184.892
				C430.181,96.004,451.474,89.579,469.756,77.424z"
                />
            </svg>
        ),
        // @ts-ignore
        execute: (editor, selection, position) => {
            const value = selection ? `$${selection}$` : '$$';
            editor.replaceSelection(value);
            position.ch = position.ch + 1;
            editor.setCursor(position.line, position.ch);
            editor.focus();
        }
    };

    const blockMath: ICommand = {
        name: 'block math',
        keyCommand: 'block math',
        icon: (
            <svg width="13" height="13" viewBox="0 0 512 512">
                <g>
                    <g>
                        <path
                            d="M263.507,62.967C265.179,51.833,272.833,40,283.729,40c11.028,0,20,8.972,20,20h40c0-33.084-26.916-60-60-60
			c-33.629,0-55.527,28.691-59.784,57.073L211.083,144h-61.354v40h55.436l-39.22,265.073l-0.116,0.937
			c-1.063,10.62-9.393,21.99-20.1,21.99c-11.028,0-20-8.972-20-20h-40c0,33.084,26.916,60,60,60
			c33.661,0,56.771-29.141,59.848-57.496L245.6,184h60.129v-40h-54.211L263.507,62.967z"
                        />
                    </g>
                </g>
                <g>
                    <g>
                        <polygon
                            points="426.271,248 378.236,248 352.249,287.085 334.923,248 291.17,248 325.997,326.569 270.523,410 318.558,410
			345.21,369.915 362.979,410 406.732,410 371.462,330.431 		"
                        />
                    </g>
                </g>
            </svg>
        ),
        // @ts-ignore
        execute: (editor) => {
            const value = editor.state?.selection
                ? `$$\n\\begin{align*}\n${editor.state?.selection}\n\\end{align*}\n$$`
                : '$$\n\\begin{align*}\n\n\\end{align*}\n$$';
            editor.state?.replaceSelection(value);
        }
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
        'preview',
        inlineMath,
        blockMath
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
