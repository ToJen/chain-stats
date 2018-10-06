import { Injectable } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
const { fork } = require('child_process')
@Injectable()
export class EngineService {
  public pubSub = new PubSub()

  async callContractFunctions(count: number) {
    // const data = await Promise.all([this.FuncOne(count), this.FuncTwo(count)])
    const user = fork(process.cwd() + '/src/engine/solFunctions.ts')
    user.send(count)
    user.on('message', data => {
      this.pubSub.publish('userResult', { userResult: JSON.stringify(data) })
      user.kill('SIGTERM')
    })
  }
}
