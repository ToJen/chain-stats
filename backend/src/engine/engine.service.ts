import { Injectable } from '@nestjs/common'
const { fork } = require('child_process')
import { pubSub } from './pubsub'
@Injectable()
export class EngineService {
  async callContractFunctions(count: number) {
    const user = fork(process.cwd() + '/src/engine/solFunctions.ts')
    user.send(count)
    user.on('message', data => {
      pubSub.publish('userResult', { userResult: JSON.stringify(data) })
      console.log('killing ' + user.pid)
      user.kill('SIGTERM')
    })
  }
}
