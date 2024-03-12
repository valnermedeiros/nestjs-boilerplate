import { ArgumentsHost, Catch, HttpException, HttpServer, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    // handle the exception your own way
    super.catch(exception, host);
  }

  handleUnknownError(
    exception: any,
    host: ArgumentsHost,
    applicationRef: HttpServer<any, any, any> | AbstractHttpAdapter<any, any, any>
  ): void {
    const err = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: this.getExceptionMessage(exception)
    };
    super.handleUnknownError(err, host, applicationRef);
  }

  getExceptionMessage = (exception: any) => {
    if (exception instanceof HttpException) {
      return exception?.getResponse();
    }

    if (exception instanceof Error) {
      return exception.message;
    }

    if (exception instanceof String) {
      return exception;
    }

    return JSON.stringify(exception);
  };
}
