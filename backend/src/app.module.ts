import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { EngineModule } from './engine/engine.module'

@Module({
  imports: [
    EngineModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      // path: '/',
      // subscriptions: { path: '/graphql' },
      installSubscriptionHandlers: true,
      playground: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class'
      }
    })
  ]
})
export class ApplicationModule {}
