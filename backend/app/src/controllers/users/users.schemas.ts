import { BaseResponse } from '../base.controller';
import * as yup from 'yup';

/**
 * POST /register Schemas =================================================
 */
export interface RegisterBody {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const validRegisterSchema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().min(1).required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords do not match')
        .required('Confirm your password')
});

export interface RegisterResponse extends BaseResponse {}

/**
 * POST /login Schemas =================================================
 */
export interface LoginBody {
    email: string;
    password: string;
}

export interface LoginResponse extends BaseResponse {}

/**
 * GET /verify-email Schemas
 */

export interface VerifyEmailResponse extends BaseResponse {}
