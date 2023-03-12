import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ExamDropDown } from './ExamDropDown';
import MainContextProvider from '../../../contexts/Main/MainContextProvider';
import { useState } from 'react';

export default {
    title: `Components/${ExamDropDown.name}`,
    component: ExamDropDown
} as ComponentMeta<typeof ExamDropDown>;

const Template: ComponentStory<typeof ExamDropDown> = (props) => {
    const [value, setValue] = useState('');

    return (
        <MainContextProvider>
            <ExamDropDown courseCode={props.courseCode} value={value} onChange={setValue} />
        </MainContextProvider>
    );
};

export const General = Template.bind({});
