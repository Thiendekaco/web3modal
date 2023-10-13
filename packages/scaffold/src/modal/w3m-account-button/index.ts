import {
  AccountController, AccountsController,
  AssetController,
  CoreHelperUtil,
  ModalController,
  NetworkController
} from '@web3modal/core'
import type { WuiAccountButton } from '@web3modal/ui'
import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('w3m-account-button')
export class W3mAccountButton extends LitElement {
  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  private readonly networkImages = AssetController.state.networkImages

  // -- State & Properties -------------------------------- //
  @property({ type: Boolean }) public disabled?: WuiAccountButton['disabled'] = false

  @property() public balance?: 'show' | 'hide' = 'show'

  @state() private address = AccountController.state.address

  @state() private balanceVal = AccountController.state.balance

  @state() private balanceSymbol = AccountController.state.balanceSymbol

  @state() private profileName = AccountController.state.profileName

  @state() private profileImage = AccountController.state.profileImage

  @state() private network = NetworkController.state.caipNetwork

  @state() private accountList = AccountsController.state.accounts

  // -- Lifecycle ----------------------------------------- //
  public constructor() {
    super()
    this.unsubscribe.push(
      ...[
        AccountController.subscribe(val => {
          if (val.isConnected) {
            this.address = val.address
            this.balanceVal = val.balance
            this.profileName = val.profileName
            this.profileImage = val.profileImage
            this.balanceSymbol = val.balanceSymbol
            this.accountList = []
          } else {
            this.address = ''
            this.balanceVal = ''
            this.profileName = ''
            this.profileImage = ''
            this.balanceSymbol = ''
          }
        }),

        NetworkController.subscribeKey('caipNetwork', val => (this.network = val)),
        AccountsController.subscribeKey('accounts', value => {
          this.accountList = value
          this.address = ''
          this.balanceVal = ''
          this.profileName = ''
          this.profileImage = ''
          this.balanceSymbol = ''
        })
      ]
    )
  }

  public override disconnectedCallback() {
    this.unsubscribe.forEach(unsubscribe => unsubscribe())
  }

  // -- Render -------------------------------------------- //
  public override render() {
    const networkImage = this.networkImages[this.network?.imageId ?? '']
    const showBalance = this.balance === 'show'

    return this.address ? html`
      <wui-account-button
        .disabled=${Boolean(this.disabled)}
        address=${ifDefined(this.profileName ?? this.address)}
        ?isProfileName=${Boolean(this.profileName)}
        networkSrc=${ifDefined(networkImage)}
        avatarSrc=${ifDefined(this.profileImage)}
        balance=${showBalance
          ? CoreHelperUtil.formatBalance(this.balanceVal, this.balanceSymbol)
          : ''}
        @click=${this.onClick.bind(this)}
      >
      </wui-account-button>
    ` : this.accountList.map((account, index) => (
        html`
           <wui-account-button
            .disabled=${Boolean(this.disabled)}
            address=${account.address} 
            ?isProfileName=${Boolean(account.profileName)}
            networkSrc=${ifDefined(networkImage)}
            avatarSrc=${ifDefined(account.profileImage)}
            balance=${showBalance
                ? CoreHelperUtil.formatBalance(account.balance, account.balanceSymbol)
                : ''}
            @click=${() => this.onClickOfPolkadot(index)}
          >
        `
    ))
  }

  // -- Private ------------------------------------------- //
  private onClick() {
    ModalController.open()
  }

  private  onClickOfPolkadot( index : number){
    ModalController.open()
    AccountsController.setIsAccountIsSelected(index)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-account-button': W3mAccountButton
  }
}
