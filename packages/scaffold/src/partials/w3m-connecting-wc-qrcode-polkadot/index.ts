import { AssetUtil, ConnectionController, ThemeController } from '@web3modal/core'
import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { W3mConnectingWidget } from '../../utils/w3m-connecting-widget/index.js'
import styles from './styles.js'

@customElement('w3m-connecting-wc-qrcode-polkadot')
export class W3mConnectingWcQrcodePolkadot extends W3mConnectingWidget {
  public static override styles = styles

  public constructor() {
    super()
    window.addEventListener('resize', this.forceUpdate)
  }

  public override disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('resize', this.forceUpdate)
  }

  // -- Render -------------------------------------------- //
  public override render() {
    this.onRenderProxy()


    return html`
      <wui-flex padding="xl" flexDirection="column" gap="xl" alignItems="center">
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone_
        </wui-text>

        <wui-button variant="fullWidth" @click=${this.onCopyUriPolkadot}>
          <wui-icon size="sm" color="inherit" slot="iconLeft" name="copy"></wui-icon>
          Copy Link_
        </wui-button>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `
  }

  // -- Private ------------------------------------------- //
  private onRenderProxy() {

    if (!this.ready && this.uriPolkadot) {

      this.timeout = setTimeout(() => {
        this.ready = true
      }, 200)
    }
  }

  private qrCodeTemplate() {
    if (!this.ready || !this.uriPolkadot) {
      return null
    }
    const size = this.getBoundingClientRect().width - 40
    const alt = this.wallet ? this.wallet.name : undefined
    ConnectionController.setWcLinking(undefined)
    ConnectionController.setRecentWallet(this.wallet)

    return html`<wui-qr-code
      size=${size}
      theme=${ThemeController.state.themeMode}
      uri=${this.uriPolkadot}
      imageSrc=${ifDefined(AssetUtil.getWalletImage(this.wallet))}
      alt=${ifDefined(alt)}
    ></wui-qr-code>`
  }

  private forceUpdate = () => {
    this.requestUpdate()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-connecting-wc-qrcode-polkadot': W3mConnectingWcQrcodePolkadot
  }
}
