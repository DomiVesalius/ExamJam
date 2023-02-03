import { Controller } from 'tsoa';
import { RandomPersonService } from '../models/randomPerson/randomPerson.service';
import { HttpStatusCodeLiteral } from '@tsoa/runtime';

export interface BaseResponse {
    success: boolean;
    code: HttpStatusCodeLiteral;
    message?: string;
    data?: any;
    errors?: string | unknown;
}

export class BaseController extends Controller {
    protected static randomPersonService: RandomPersonService = new RandomPersonService();
}
