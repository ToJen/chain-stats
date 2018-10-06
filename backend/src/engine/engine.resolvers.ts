import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { EngineService } from './engine.service'
import { Options } from '../graphql.schema'

@Resolver('Cat')
export class EngineResolvers {
  constructor(private readonly engineService: EngineService) {}

  @Mutation('go')
  go(@Args('options') args: Options): boolean {
    console.dir(args)
    for (let count = 0; count < args.noOfUsers; count++) {
      this.engineService.callContractFunctions(count)
    }
    console.log('callContractFunctions successful')
    return true
  }

  @Mutation('parseContract')
  async parseContract(@Args('data') args): Promise<string> {
    console.dir(args)
    return 'parsed'
  }

  @Subscription('userResult')
  userResult() {
    return {
      subscribe: () => this.engineService.pubSub.asyncIterator('userResult')
    }
  }
}
