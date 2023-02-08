import { BaseController } from './base.controller';
import { Get, Query, Route, Tags, Request, Post, Body } from 'tsoa';
import { Request as ExpressRequest } from'express';

interface GetCoursesResponse {
    courseResults: { courseCode: string, courseName: string }[];
}

@Tags('Courses')
@Route('course')
export class CoursesController extends BaseController {
    @Get('courses')
    public async getCourses(): Promise<GetCoursesResponse> {
        const csc148 = {
            courseCode: "CSC148H5",
            courseName: "Intro to CS",
        }
        return { courseResults: [csc148] }
    }
}