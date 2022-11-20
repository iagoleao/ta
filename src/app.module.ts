import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@app/db/db.module';
import { EnvModule } from '@app/env/env.module';
import { StudentModule } from '@app/student/student.module';
import { AuthModule } from '@app/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvService } from '@app/env/env.service';
import { UserModule } from '@app/user/user.module';
import { GroupModule } from '@app/group/group.module';
import { SubjectModule } from '@app/subject/subject.module';
import { SubscriptionModule } from '@app/subscription/subscription.module';

@Module({
  imports: [
    DbModule,
    {
      ...JwtModule.registerAsync({
        inject: [EnvService],
        useFactory: async (envService: EnvService) => ({
          secret: envService.JWT_SECRET,
        }),
      }),
      global: true,
    },
    UserModule,
    GroupModule,
    SubjectModule,
    AuthModule,
    StudentModule,
    SubscriptionModule,
    EnvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
