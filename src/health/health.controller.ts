import { PrismaService } from '@/prisma/prisma.service';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  PrismaHealthIndicator
} from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly config: ConfigService,
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly prismaHealth: PrismaHealthIndicator,
    private readonly prisma: PrismaService
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.disk.checkStorage('storage', { thresholdPercent: 0.5, path: '/' }),
      () => this.memory.checkHeap('memory_heap', Math.pow(1024, 3) * 2),
      () => this.memory.checkRSS('memory_rss', Math.pow(1024, 3) * 2),
      () => this.prismaHealth.pingCheck('postgres', this.prisma),
      () =>
        this.http.responseCheck<{ status: string }>(
          'some external app or service',
          'https://exemple.com/health',
          (res) => res.status === HttpStatus.OK.valueOf() && res.data.status === 'UP'
        )
    ]);
  }
}
