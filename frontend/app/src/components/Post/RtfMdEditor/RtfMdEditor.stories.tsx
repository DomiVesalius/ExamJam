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

Default.args = {
    editorHeight: 400,
    editorWidth: 'auto'
};
