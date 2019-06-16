import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(
          value => ({success: true, response: value}),
          error => console.log(error)
        ),
      );
  }
}
