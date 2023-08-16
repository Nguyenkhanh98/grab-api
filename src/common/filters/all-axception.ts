import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorMessage = exception.getResponse() as HttpException;

      const responseObject = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        url: request.url,
        ...errorMessage,
      };

      return response.status(status).json(responseObject);
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const responseObject = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      url: request.url,
    };

    // Log the stack for non-HttpException errors
    if (exception instanceof Error) {
      responseObject['error'] = exception.name;
      responseObject['message'] = exception.message;
    } else {
      responseObject['error'] = 'INTERNAL SERVER';
    }

    return response.status(status).json(responseObject);
  }
}
