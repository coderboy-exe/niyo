import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global() // Not the best design decision to make everything "Global, but it's acceptablt for things like DB connections"
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
