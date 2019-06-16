import {HttpException, HttpStatus} from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(error?: string) {
    super(error ? error : 'Bad Request', HttpStatus.BAD_REQUEST);
  }
}