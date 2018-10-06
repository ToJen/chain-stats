import { Module } from '@nestjs/common'
import { EngineResolvers } from './engine.resolvers'
import { EngineService } from './engine.service'

@Module({
  providers: [EngineService, EngineResolvers]
})
export class EngineModule {}
