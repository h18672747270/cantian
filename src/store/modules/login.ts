//主题按钮
import { defineStore } from 'pinia'
export const useLoginStore = defineStore({
  id: 'login', // id必填，且需要唯一
  // state
  state() {
    return {
      loginFlag: true,
      isReload: true,
    }
  },
  // getters
  getters: {},
  // actions
  actions: {
    changeLoginFlag(value: boolean) {
      this.loginFlag = value
    },
    changeLoginFlagReload(value: boolean) {
      this.loginFlag = value
      this.isReload = value
    },
  },
})
