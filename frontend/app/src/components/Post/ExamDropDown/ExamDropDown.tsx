import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import http from "../../../utils/http";
import useSWR from "swr";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface CourseTableProps {
    courseCode: string;

    value: string;

    onChange: Dispatch<SetStateAction<string>>;

}

  function createExamRows(data: any): any[] {
    const exams = [];
    for (let exam of data.data) {
      exams.push({ name: exam.title, id: exam._id });
    }
    return exams;
  }
export const ExamDropDown: React.FunctionComponent<CourseTableProps> = ({ courseCode , value, onChange}) => {
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




  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value)
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Exam Name</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value}
          onChange={handleChange}
          autoWidth
          label="Exam Name"
        >
          {examList.map(exam => {
              return <MenuItem value={exam.id}>{exam.name}</MenuItem>;
            })}
        </Select>
      </FormControl>
    </div>
  );
}