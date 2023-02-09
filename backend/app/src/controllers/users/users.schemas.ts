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

/**
 * DELETE /logout schemas
 */

export interface LogoutResponse extends BaseResponse {}

/**
 * PATCH /change-password
 */

export interface ChangePasswordBody {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const validChangePasswordSchema = yup.object().shape({
    currentPassword: yup.string().required(),
    newPassword: yup.string().min(8, 'Password must be at least 8 characters').required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords do not match')
        .required('Confirm your password')
});

export interface ChangePasswordResponse extends BaseResponse {}

/**
 * PATCH  /change-username
 */

export interface ChangeUsernameBody {
    newUsername: string;
}

export const validChangeUsernameSchema = yup.object().shape({
    newUsername: yup.string().min(1, 'Username too short').required()
});

export interface ChangeUsernameResponse extends BaseResponse {}

/**
 * PATCH /change-bio
 */

export interface ChangeBioBody {
    bio: string;
}

export interface ChangeBioResponse extends BaseResponse {}
