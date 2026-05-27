import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

@Controller('health')
export class HealthController {
  constructor(private readonly em: EntityManager) {}

  @Get()
  async check() {
    try {
      await this.em.getConnection().execute('SELECT 1');
      return { status: 'ok' };
    } catch {
      throw new HttpException(
        { status: 'error', reason: 'database_unreachable' },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
