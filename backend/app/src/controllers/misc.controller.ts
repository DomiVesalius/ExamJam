import { BaseController } from './base.controller';
import { Get, Query, Route, Tags, Request, Post, Body } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { IRandomPersonModel } from '../models/randomPerson/randomPerson.model';

interface PingResponse {
    message: string;
}

export interface CreateRandomPersonParams {
    name: string;
}

interface RandomPeopleArray {
    people: Array<IRandomPersonModel>;
}

@Tags('Miscellaneous')
@Route('misc')
export class MiscController extends BaseController {
    @Get('ping')
    public async ping(
        @Request() req: ExpressRequest,
        @Query() name: string
    ): Promise<PingResponse> {
        return { message: `Hello ${name}. IP: ${req.socket.remoteAddress}` };
    }

    @Post('random-person')
    public async createRandomPerson(@Body() body: CreateRandomPersonParams): Promise<void> {
        await MiscController.randomPersonService.create(body);
    }

    @Get('random-person')
    public async getRandomPeople(): Promise<RandomPeopleArray> {
        const randomPeople = await MiscController.randomPersonService.getAll();
        return { people: randomPeople };
    }
}
