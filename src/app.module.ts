import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, TasksModule, DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, UsersService, DatabaseService],
})
export class AppModule {}
