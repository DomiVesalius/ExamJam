import { Controller } from 'tsoa';

/**
 * Create an instance of each service as a member of this base class with
 * protected static modifiers. This will make them accessible by all
 * controllers that inherit from this base controller
 */
export class BaseController extends Controller {}
