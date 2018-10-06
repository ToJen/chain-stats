import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphqlOptions } from './graphql.options'
import { EngineModule } from './engine/engine.module'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions
    }),
    EngineModule
  ]
})
export class ApplicationModule {}
