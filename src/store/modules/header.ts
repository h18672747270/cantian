//header
import { defineStore } from 'pinia'
export const useHeaderStore = defineStore({
  id: 'header', // id必填，且需要唯一
  // state
  state() {
    return {
      headerImg: '',
    }
  },
  // getters
  getters: {},
  // actions
  actions: {
    changeHeaderChange(value: string) {
      this.headerImg = value
    },
  },
})
