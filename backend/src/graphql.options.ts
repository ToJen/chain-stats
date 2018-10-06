import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { join } from 'path'

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      typePaths: ['./**/*.graphql'],
      playground: true,
      path:'/api/graphql',
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      subscriptions: { path: '/api/graphql' },
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class'
      }
    }
  }
}
