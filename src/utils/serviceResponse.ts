export const errorCodes = {
    SUCCESS: 0,
    BAD_REQUEST: 1,
    UNAUTHORIZED: 2,
    NOT_FOUND: 3,
    EXCEPTION: 4,
  };

  export interface ServiceResponse {
    code: number,
    body: any
  }

   export function success (message: any) {
      return {
        code: errorCodes["SUCCESS"],
        body: message,
      };
    }

    export function badRequest (message: any) {
        return {
          code: errorCodes["BAD_REQUEST"],
          body: message,
        };
      }

    export function unauthorized (message: any) {
      return {
        code: errorCodes["UNAUTHORIZED"],
        body: message,
      };
    }

    export function notFound (message: any) {
      return {
        code: errorCodes["NOT_FOUND"],
        body: message,
      };
    }

    export function exception (message: any) {
      return {
        code: errorCodes["EXCEPTION"],
        body: message,
      };
    }
  
  
  