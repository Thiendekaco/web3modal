import {
  createWeb3Modal,
  defaultWagmiConfig,
  useWeb3Modal,
  useWeb3ModalState,
  useWeb3ModalTheme
} from '@web3modal/wagmi/exports/react'
import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'


const projectId = '16c6ad72b95e09bfdddfde13bf7f90b4'
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

// 2. Create wagmiConfig
const chains = [mainnet, arbitrum]
const chainsPolkadot = [ 'polkadot', 'kusama' ]
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'Web3Modal React Example',
    url : 'http://localhost:3001/'
  }
})



// 3. Create modal
createWeb3Modal({
    wagmiConfig,
    chainsPolkadot,
    projectId,
    chains,
    themeMode: 'light',
    themeVariables: {
        '--w3m-color-mix': '#00DCFF',
        '--w3m-color-mix-strength': 20
    }
})

export default function App() {
  // 4. Use modal hook
  const modal = useWeb3Modal()
  const state = useWeb3ModalState()
  const theme = useWeb3ModalTheme()

  return (
    <WagmiConfig config={wagmiConfig}>
      <w3m-button />
      <w3m-network-button />
      <w3m-connect-button />
      <w3m-account-button />

      <button onClick={() => modal.open()}>Connect Wallet</button>
      <button onClick={() => modal.open({ view: 'Networks' })}>Choose Network</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre>{JSON.stringify(theme, null, 2)}</pre>
    </WagmiConfig>
  )
}
