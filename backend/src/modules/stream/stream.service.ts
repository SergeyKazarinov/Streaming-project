import { Injectable } from '@nestjs/common';

import { StreamRepository } from '../repositories/stream/stream.repository';

@Injectable()
export class StreamService {
  constructor(private readonly streamRepository: StreamRepository) {}

  async findAll(input: Parameters<StreamRepository['findAll']>[0]) {
    return await this.streamRepository.findAll(input);
  }
}
