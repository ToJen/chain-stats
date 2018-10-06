// const Web3 = require('web3')
// const path = require('path')
// const fs = require('fs')
const solc = require('solc')
import getWeb3 from './getWeb3'

const deploy = async (nodeAddress: string, source: string, contractName: string) => {
  const web3 = getWeb3(nodeAddress)
  //   const contractPath = path.resolve(__dirname, 'contracts', 'Bakery.sol')
  //   const source = fs.readFileSync(contractPath, 'utf8')
  const { interface: _interface, bytecode } = solc.compile(source, 1).contracts[
    ':' + contractName
  ]
  const accounts = await web3.eth.getAccounts()

  const result = await new web3.eth.Contract(JSON.parse(_interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] })
  console.log(`Contract deployed to ${result.options.address}`)
  return { abi: _interface, deployedContractAddress: result.options.address }
}

export default deploy
