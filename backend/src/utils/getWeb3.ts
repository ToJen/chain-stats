import * as Web3 from 'web3'

const getWeb3 = (nodeAddress = 'http://127.0.0.1:8545') => {
  const provider = new Web3.providers.HttpProvider(nodeAddress)
  const web3 = new Web3(provider)
  return web3
}
export default getWeb3
