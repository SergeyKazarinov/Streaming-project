import { Injectable } from '@nestjs/common';
import { User } from 'prisma/generated/prisma/client';

import { StreamRepository } from '../repositories/stream/stream.repository';

import { ChangeStreamInfoInput } from './inputs/change-stream-info.input';

@Injectable()
export class StreamService {
  constructor(private readonly streamRepository: StreamRepository) {}

  async findAll(input: Parameters<StreamRepository['findAll']>[0]) {
    return await this.streamRepository.findAll(input);
  }

  async findRandomStream() {
    const totalStream = await this.streamRepository.getTotalCountStream();

    const randomIndexes = new Set<number>();

    while (randomIndexes.size < 4) {
      const randomIndex = Math.floor(Math.random() * totalStream);
      randomIndexes.add(randomIndex);
    }

    const allStreams = await this.streamRepository.findAll({
      offset: 0,
      limit: totalStream,
    });

    const randomStreams = allStreams.filter((stream, index) => randomIndexes.has(index));

    return randomStreams;
  }

  async changeStreamInfo(user: User, input: ChangeStreamInfoInput) {
    return await this.streamRepository.updateStream(user.id, input);
  }
}
