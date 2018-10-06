const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}
interface FuncStat {
  [key: string]: {
    gasSpent: number;
    timeTaken: number;
    hasError: boolean;
  }
}
const measureASyncFunc = async (
  fn: (args) => Promise<any>,
  args: any
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

const FuncOne = async args => {
  await sleep(2000)
  return {
    gasUsed: 5869,
    status: true
  }
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

process.on('message', async count => {
  console.log('child process activated with pid ' + process.pid)
  const perFunction = await Promise.all([
    measureASyncFunc(FuncOne, count),
    measureASyncFunc(FuncTwo, count),
    measureASyncFunc(FuncThree, count)
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

  console.log(perUser)
  process.send({
    perFunction,
    perUser
  })
})
