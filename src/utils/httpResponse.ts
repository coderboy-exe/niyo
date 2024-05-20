import { errorCodes } from "./serviceResponse";

const responseCodes = {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INVALID_REQUEST: 400,
    FORBIDDEN: 403,
    TIMEOUT: 403,
    EXCEPTION: 500,
  };
  const responseMessages = {
    SUCCESS: "SUCCESSFUL",
    UNAUTHORIZED: "UNAUTHORIZED",
    NOT_FOUND: "NOT FOUND",
    INVALID_REQUEST: "INVALID REQUEST",
    FORBIDDEN: "FORBIDDEN",
    TIMEOUT: "GATEWAY TIMEOUT",
    EXCEPTION: "INTERNAL SERVER ERROR",
  };

  export interface CustomHttpResponse {
    statusCode: number,
    message: string,
    body: any
  }
  
    export function mapErrorCodeToHttpResponse(errorCode: number, message: any): CustomHttpResponse {
      /** Maps the service error codes into their respective custom status codes and messages */
      switch (errorCode) {
        case errorCodes.SUCCESS:
          return {
            statusCode: responseCodes.SUCCESS,
            message: responseMessages.SUCCESS,
            body: message,
          };
        case errorCodes.BAD_REQUEST:
          return {
            statusCode: responseCodes.INVALID_REQUEST,
            message: responseMessages.INVALID_REQUEST,
            body: message,
          };
        case errorCodes.UNAUTHORIZED:
          return {
            statusCode: responseCodes.UNAUTHORIZED,
            message: responseMessages.UNAUTHORIZED,
            body: message,
          };
        case errorCodes.NOT_FOUND:
          return {
            statusCode: responseCodes.NOT_FOUND,
            message: responseMessages.NOT_FOUND,
            body: message,
          };
        case errorCodes.EXCEPTION:
          return {
            statusCode: responseCodes.EXCEPTION,
            message: responseMessages.EXCEPTION,
            body: message,
          };
        default:
          return {
            statusCode: responseCodes.EXCEPTION,
            message: responseMessages.EXCEPTION,
            body: message,
          };
      }
    }