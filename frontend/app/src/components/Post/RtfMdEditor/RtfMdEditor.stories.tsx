import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import RtfMdEditor, { RtfMdEditorProps } from './RtfMdEditor';

export default {
    title: `Components/${RtfMdEditor.name}`,
    component: RtfMdEditor,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof RtfMdEditor>;

const Template: ComponentStory<typeof RtfMdEditor> = (args: RtfMdEditorProps) => (
    <RtfMdEditor {...args} />
);

export const Default = Template.bind({});

const [value, setValue] = useState('');
const [mdValue, setMdValue] = useState('');
const [editorState, setEditor] = useState('rtf');

Default.args = {
    rtfValue: value,
    setRtfValue: setValue,
    mdValue: mdValue,
    setMdValue: setMdValue,
    editorState: editorState,
    setEditor: setEditor,
    editorHeight: 400
};
