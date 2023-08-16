import { HttpStatus } from '@nestjs/common';
import { IAppError } from './app-error.interface';

export const WRONG_EMAIL_OR_PASSWORD: IAppError = {
  errorCode: 'WRONG_EMAIL_OR_PASSWORD',
  errorMessage: 'Wrong email or password',
  statusCode: HttpStatus.BAD_REQUEST,
};

export const USER_EXIST = {
  errorCode: 'USER_EXIST',
  errorMessage: 'User has exist',
  statusCode: HttpStatus.CONFLICT,
};

export const UN_AUTHORIZED: IAppError = {
  errorCode: 'UN_AUTHORIZED',
  errorMessage: 'UnAuthorized',
  statusCode: HttpStatus.UNAUTHORIZED,
};

export const USER_NOT_FOUND: IAppError = {
  errorCode: 'USER_NOT_FOUND',
  errorMessage: 'User not found',
  statusCode: HttpStatus.BAD_REQUEST,
};

export const MODEL_NOT_FOUND: IAppError = {
  errorCode: 'MODEL_NOT_FOUND',
  errorMessage: 'Model not found',
  statusCode: HttpStatus.BAD_REQUEST,
};

export const TEMPLATE_NOT_FOUND: IAppError = {
  errorCode: 'TEMPLATE_NOT_FOUND',
  errorMessage: 'Template not found',
  statusCode: HttpStatus.BAD_REQUEST,
};

export const DESIGN_NOT_FOUND: IAppError = {
  errorCode: 'DESIGN_NOT_FOUND',
  errorMessage: 'Design not found',
  statusCode: HttpStatus.BAD_REQUEST,
};

export const ORDER_INPROGRES_EXIST: IAppError = {
  errorCode: 'ORDER_INPROGRES_EXIST',
  errorMessage: 'ORDER_INPROGRES_EXIST',
  statusCode: HttpStatus.BAD_REQUEST,
};
