import * as Logger from './loggerUtils';
import * as Response from './responseUtils';

export const internalServerRequestError = (message, res) => responseError(Response.error, message, res);
export const badRequestError = (message, res, data = null) => responseError(Response.badRequest, message, res, data);
export const notFoundRequestError = (message, res, data = null) => responseError(Response.notFound, message, res, data);

const responseError = (responseFunction, message, res, data = null) => {
  Logger.logError(message, data);
  return responseFunction(res, data);
};
