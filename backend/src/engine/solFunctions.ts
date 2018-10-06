import getWeb3 from '../utils/getWeb3'
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}
let gas = null
let account = null
let contractInstance = null
interface FuncStat {
  [key: string]: {
    gasSpent: number;
    timeTaken: number;
    hasError: boolean;
  }
}
const measureASyncFunc = async (
  fn: (args) => Promise<any>,
  args?: any
): Promise<FuncStat> => {
  const res = {
    gasSpent: null,
    timeTaken: null,
    hasError: null
  }
  const start = Date.now()
  try {
    const { gasUsed, status } = await fn(args)
    res.gasSpent = gasUsed
    res.hasError = !status
  } catch (err) {
    console.log(err)
    res.hasError = true
  } finally {
    const end = Date.now()
    const elapsed = end - start
    res.timeTaken = elapsed
  }
  return { [fn.name]: res }
}

const addCookie = async address => {
  const { gasUsed, status } = await contractInstance.methods.addCookie(address).send({ from: account, gas })
  return { gasUsed, status }
}

const FuncTwo = async args => {
  await sleep(5000)
  return {
    gasUsed: 7669,
    status: true
  }
}
const FuncThree = async args => {
  await sleep(3000)
  return {
    gasUsed: 7669,
    status: false
  }
}

process.on('message', async ({ abi, deployedContractAddress, nodeAddress, initialGasCost }) => {
  console.log('child process activated with pid ' + process.pid)
  const web3 = getWeb3(nodeAddress)
  const accounts = await web3.eth.getAccounts()
  account = accounts[0]
  gas = initialGasCost
  contractInstance = new web3.eth.Contract(JSON.parse(abi), deployedContractAddress)
  const perFunction = await Promise.all([
    measureASyncFunc(addCookie, accounts[1]),
    measureASyncFunc(FuncTwo),
    measureASyncFunc(FuncThree)
  ])
  const perUser = {
    timeElapsed: [],
    failedFunctions: [],
    gasUsed: []
  }

  perFunction.forEach((element: FuncStat) => {
    const funcName = Object.keys(element)[0]
    const funcStats = element[funcName]
    perUser.timeElapsed.push({ [funcName]: funcStats.timeTaken })
    perUser.gasUsed.push({ [funcName]: funcStats.gasSpent })
    if (funcStats.hasError) {
      perUser.failedFunctions.push(funcName)
    }
  })

  process.send({
    perFunction,
    perUser
  })
})
