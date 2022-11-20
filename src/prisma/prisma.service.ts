// https://github.com/prisma/prisma/issues/5026#issuecomment-985810193

import { EnvService } from '@app/env/env.service';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public constructor(private readonly envService: EnvService) {
    super({
      log:
        envService.NODE_ENV === 'production'
          ? undefined
          : [
              { emit: 'stdout', level: 'query' },
              { emit: 'stdout', level: 'info' },
              { emit: 'stdout', level: 'warn' },
              { emit: 'stdout', level: 'error' },
            ],
    });
  }

  public async onModuleInit(): Promise<void> {
    // await this.$connect()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // console.log(`${e.query} ${e.params}`)
    });
    this.$use(async (params, next) => {
      if (['Participant', 'Group'].includes(params.model)) {
        if (params.action === 'findUnique' || params.action === 'findFirst') {
          params.action = 'findFirst';
          params.args.where['deletedAt'] = null;
        }
        if (params.action === 'findMany') {
          if (params.args.where) {
            if (params.args.where.deletedAt == undefined) {
              // Exclude deleted records if they have not been explicitly requested
              params.args.where['deletedAt'] = null;
            }
          } else {
            params.args['where'] = { deleted: false };
          }
        }
      }
      return next(params);
    });
  }

  public async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
