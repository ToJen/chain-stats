import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { join } from 'path'

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      typePaths: ['./**/*.graphql'],
      playground: true,
      path: '/',
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class'
      }
    }
  }
}
