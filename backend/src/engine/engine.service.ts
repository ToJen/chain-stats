import { Injectable } from '@nestjs/common'
const { fork } = require('child_process')
import { pubSub } from './pubsub'
@Injectable()
export class EngineService {
  async callContractFunctions(abi, deployedContractAddress, nodeAddress, initialGasCost) {
    const user = fork(process.cwd() + '/src/engine/solFunctions.ts')
    user.send({ abi, deployedContractAddress, nodeAddress, initialGasCost })
    user.on('message', data => {
      pubSub.publish('userResult', { userResult: JSON.stringify(data) })
      console.log('killing ' + user.pid)
      user.kill('SIGTERM')
    })
  }
}
