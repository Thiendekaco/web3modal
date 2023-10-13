import { subscribeKey as subKey } from 'valtio/utils'
import { proxy, subscribe as sub } from 'valtio/vanilla'
import type { AccountControllerState } from "./AccountController.js";


// -- Types --------------------------------------------- //
export interface AccountsControllerState {
    accounts : AccountControllerState[],
    accountIsSelected : number
}

type StateKey = keyof AccountsControllerState

// -- State --------------------------------------------- //
const state = proxy<AccountsControllerState>({
    accounts : [],
    accountIsSelected : 0
})

// -- Controller ---------------------------------------- //
export const AccountsController = {
    state,

    subscribeKey<K extends StateKey>(key: K, callback: (value: AccountsControllerState[K]) => void) {
        return subKey(state, key, callback)
    },

    subscribe(callback: (newState: AccountsControllerState) => void) {
        return sub(state, () => callback(state))
    },

    setIsAccountToList( account: AccountControllerState) {
        state.accounts.push(account)
    },

    setIsAccountIsSelected( index : number) {
        state.accountIsSelected = index;
    },

    resetAccount() {
        state.accounts = []
    }
}
