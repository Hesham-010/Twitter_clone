import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

// To Handle Any Errors
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();

    if (exception instanceof HttpException) {
      return exception;
    }
  }
}
