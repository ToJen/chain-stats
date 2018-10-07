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
    cumulativeGasUsed: number;
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
    hasError: null,
    cumulativeGasUsed: null
  }
  const start = Date.now()
  try {
    const { gasUsed, status, cumulativeGasUsed } = await fn(args)
    res.gasSpent = gasUsed
    res.cumulativeGasUsed = cumulativeGasUsed
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
  const {
    gasUsed,
    status,
    cumulativeGasUsed
  } = await contractInstance.methods
    .addCookie(address)
    .send({ from: account, gas })
  return { gasUsed, status, cumulativeGasUsed }
}
const stockUp = async count => {
  const {
    gasUsed,
    status,
    cumulativeGasUsed
  } = await contractInstance.methods
    .stockUp(count)
    .send({ from: account, gas })
  return { gasUsed, status, cumulativeGasUsed }
}
const bakeCookie = async count => {
  const {
    gasUsed,
    status,
    cumulativeGasUsed
  } = await contractInstance.methods
    .bakeCookie(count)
    .send({ from: account, gas })
  return { gasUsed, status, cumulativeGasUsed }
}

process.on(
  'message',
  async ({ abi, deployedContractAddress, nodeAddress, initialGasCost }) => {
    console.log('child process activated with pid ' + process.pid)
    const web3 = getWeb3(nodeAddress)
    const accounts = await web3.eth.getAccounts()
    account = accounts[0]
    gas = Math.floor(Math.random() * 5940000) + 28000
    contractInstance = new web3.eth.Contract(
      JSON.parse(abi),
      deployedContractAddress
    )
    const addCookieAcc = accounts[Math.floor(Math.random() * 11)]
    const perFunction = await Promise.all([
      // will fail if gas conditions not met
      measureASyncFunc(addCookie, addCookieAcc), // will fail if addCookieAcc invalid
      measureASyncFunc(stockUp, Math.floor(Math.random() * 25) + 5), // will fail if above 20
      measureASyncFunc(bakeCookie, Math.floor(Math.random() * 25) + 5) // will fail if above 20
    ])
    const perUser = {
      timeElapsed: [],
      failedFunctions: [],
      gasUsed: [],
      cumulativeGasUsed: []
    }

    perFunction.forEach((element: FuncStat) => {
      const funcName = Object.keys(element)[0]
      const funcStats = element[funcName]
      perUser.timeElapsed.push({ [funcName]: funcStats.timeTaken })
      perUser.cumulativeGasUsed.push({
        [funcName]: funcStats.cumulativeGasUsed
      })
      perUser.gasUsed.push({ [funcName]: funcStats.gasSpent })
      if (funcStats.hasError) {
        perUser.failedFunctions.push(funcName)
      }
    })

    process.send({
      perFunction,
      perUser
    })
  }
)
