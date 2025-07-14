//主题按钮
import { defineStore } from 'pinia'
export const useThemetypeStore = defineStore({
  id: 'themeType', // id必填，且需要唯一
  // state
  state() {
    return {
      themeType: true,
    }
  },
  // getters
  getters: {},
  // actions
  actions: {
    changeType() {
      this.themeType = !this.themeType
    },
  },
})
