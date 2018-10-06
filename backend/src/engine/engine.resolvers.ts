import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { EngineService } from './engine.service'
import { pubSub } from './pubsub'
import { Options } from '../graphql.schema'
import deploy from '../utils/deploy'
// import {parse} from 'typechain/dist/parser/abiParser'
@Resolver()
export class EngineResolvers {
  constructor(private readonly engineService: EngineService) {}

  @Mutation('go')
  async go(@Args('options') args: Options): Promise<boolean> {
    console.dir(args)

    const { deployedContractAddress, abi } = await deploy(
      args.nodeAddress,
      args.sol,
      args.contractName
    )
    // console.dir(parse(JSON.parse(abi), args.contractName))

    for (let count = 0; count < args.noOfUsers; count++) {
      this.engineService.callContractFunctions(
        abi,
        deployedContractAddress,
        args.nodeAddress,
        args.initialGasCost
      )
    }
    console.log('callContractFunctions successful')
    return true
  }

  @Subscription('userResult')
  userResult() {
    return {
      subscribe: () => pubSub.asyncIterator('userResult')
    }
  }
}
