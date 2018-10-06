const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}

const FuncOne = async count => {
  await sleep(2000)
  return (
    'Reply from Func One @' +
    new Date().toLocaleTimeString() +
    ' for user ' +
    count
  )
}
const FuncTwo = async count => {
  await sleep(5000)
  return (
    'Reply from Func Two @' +
    new Date().toLocaleTimeString() +
    ' for user ' +
    count
  )
}

process.on('message', async count => {
  console.log('child process activated with pid ' + process.pid)
  const data = await Promise.all([FuncOne(count), FuncTwo(count)])
  process.send(JSON.stringify(data))
})
