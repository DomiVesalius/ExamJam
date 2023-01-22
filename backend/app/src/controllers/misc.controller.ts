import { BaseController } from './base.controller';
import { Get, Query, Route, Tags, Request } from 'tsoa';
import { Request as ExpressRequest } from 'express';

interface PingResponse {
    message: string;
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
}
