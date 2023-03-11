import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import http from "../../../utils/http";
import useSWR from "swr";
import {useEffect, useState} from "react";

interface CourseTableProps {
    courseCode: string;
}

  function createExamRows(data: any): any[] {
    const exams = [];
    for (let exam of data.data) {
      exams.push({ name: exam.title, id: exam._id });
    }
    return exams;
  }
export const ExamDropDown: React.FunctionComponent<CourseTableProps> = ({ courseCode }) => {
    const fetcher = (url: string) => http.get(url).then((res) => res.data);
    const url: string = `/courses/${courseCode}/exams`;
    const { data, error } = useSWR(url, fetcher);

    const [examList, setExamList] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            setExamList(createExamRows(data));
        }
        if (error) console.log(error);
    }, [data, error]);


  const [exam, setExam] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setExam(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-autowidth-label">Exam Name</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={exam}
          onChange={handleChange}
          autoWidth
          label="Exam Name"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {examList.map(exam => {
              return <MenuItem value={exam.id}>{exam.name}</MenuItem>;
            })}
        </Select>
      </FormControl>
    </div>
  );
}