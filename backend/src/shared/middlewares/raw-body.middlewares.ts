import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import getRawBody from 'raw-body';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.readable) {
      throw new BadRequestException('Невалидный данные из запроса');
    }

    getRawBody(req, { encoding: 'utf-8' })
      .then((body) => {
        req.body = body;
        next();
      })
      .catch((error) => {
        throw new BadRequestException('Ошибка при получении: ', error);
      });
  }
}
