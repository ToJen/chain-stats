import { Injectable } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
const { fork } = require('child_process')
@Injectable()
export class EngineService {
  public pubSub = new PubSub()

  async callContractFunctions(count: number) {
    const user = fork(process.cwd() + '/src/engine/solFunctions.ts')
    user.send(count)
    user.on('message', data => {
      this.pubSub.publish('userResult', { userResult: JSON.stringify(data) })
      console.log('killing ' + user.pid)
      user.kill('SIGTERM')
    })
  }
}
