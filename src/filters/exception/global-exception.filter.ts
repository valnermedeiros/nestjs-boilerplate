import { ArgumentsHost, Catch, HttpException, HttpServer, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    // handle the exception your own way
    super.catch(exception, host);
  }

  handleUnknownError(
    exception: unknown,
    host: ArgumentsHost,
    applicationRef:
      | HttpServer<unknown, unknown, unknown>
      | AbstractHttpAdapter<unknown, unknown, unknown>
  ): void {
    const err = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: this.getExceptionMessage(exception)
    };
    super.handleUnknownError(err, host, applicationRef);
  }

  getExceptionMessage = (exception: unknown) => {
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
