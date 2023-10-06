import type { CaipNetwork, CaipNetworkId, Tokens } from '@web3modal/scaffold'
import type { Web3ModalClientOptions } from '../client.js'
import { NAMESPACE } from './constants.js'
import { NetworkImageIds, NetworkNames } from './presets.js'

export function getCaipDefaultChain(chain?: number) {
  if (!chain) {
    return undefined
  }

  return {
    id: `${NAMESPACE}:${chain}`,
    name: NetworkNames[chain],
    imageId: NetworkImageIds[chain]
  } as CaipNetwork
}

export function getCaipTokens(tokens?: Web3ModalClientOptions['tokens']) {
  if (!tokens) {
    return undefined
  }

  const caipTokens: Tokens = {}
  Object.entries(tokens).forEach(([id, token]) => {
    caipTokens[`${NAMESPACE}:${id}`] = token
  })

  return caipTokens
}

export function caipNetworkIdToNumber(caipnetworkId?: CaipNetworkId) {
  return caipnetworkId ? Number(caipnetworkId.split(':')[1]) : undefined
}

export function hexStringToNumber(value: string) {
  const string = value.startsWith('0x') ? value.slice(2) : value
  const number = parseInt(string, 16)

  return number
}