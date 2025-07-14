<template>
  <div class="h-[113px] w-[100%] leading-[113px] px-[48px] font security-size">
    <div class="border-b-[1px] h-[113px] w-[100%] flex justify-between">
      <div class="flex">
        <div class="security-size w-[100px]">手机号 ：</div>
        <div class="ml-[41px] security-size">{{ phoneNum || '' }}</div>
      </div>
      <div
        class="mr-[52px] security-size text-[#4f27fc] cursor-pointer text-center w-[90px]"
      >
        <span class="border-btm text-center" @click="goDetail('changePhone')">
          更换手机号</span
        >
      </div>
    </div>
    <div class="border-b-[1px] h-[113px] w-[100%] flex justify-between">
      <div class="flex">
        <div class="security-size w-[100px]">邮箱 ：</div>
        <div class="ml-[41px] security-size">{{ e_mail ?? '未绑定' }}</div>
      </div>
      <div
        class="mr-[52px] security-size text-[#4f27fc] cursor-pointer text-center w-[90px]"
      >
        <span
          v-if="!e_mail"
          class="border-btm text-center"
          @click="goDetail('goEmail')"
        >
          绑定
        </span>
      </div>
    </div>
    <div class="border-b-[1px] h-[113px] w-[100%] flex justify-between">
      <div class="flex">
        <div class="security-size w-[100px]">我的密码 ：</div>
        <div class="ml-[41px] security-size">************</div>
      </div>
      <div
        class="mr-[52px] security-size text-[#4f27fc] cursor-pointer text-center w-[90px]"
      >
        <span class="border-btm text-center" @click="goDetail('pushUpdPhone')">
          修改</span
        >
      </div>
    </div>
    <div class="border-b-[1px] h-[113px] w-[100%] flex justify-between">
      <div class="flex">
        <div class="security-size w-[100px]">实名认证 ：</div>
        <div class="ml-[41px] security-size">
          {{ userInfo.realNameStatus == 1 ? '已认证' : '未实名' }}
        </div>
      </div>
      <div
        class="mr-[52px] security-size text-[#4f27fc] cursor-pointer text-center w-[90px]"
      >
        <span
          class="border-btm text-center"
          @click="goNameAuthentication(userInfo.realNameStatus)"
        >
          {{ userInfo.realNameStatus === 1 ? '查看' : '去认证' }}</span
        >
      </div>
    </div>
    <div class="border-b-[1px] h-[113px] w-[100%] flex justify-between">
      <div class="flex">
        <div class="security-size w-[100px]">高校认证 ：</div>
        <div class="ml-[41px] security-size text-center">
          {{ type === 1 ? '已认证' : type === 2 ? '未认证' : '暂无' }}
        </div>
      </div>
      <div
        class="mr-[52px] security-size text-[#4f27fc] cursor-pointer text-center w-[90px]"
      >
        <span class="border-btm">
          {{ type === 1 ? '去认证' : type === 2 ? ' 查看' : '' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { selectUserInfo } from '@/api/personalCenter/personalCenter'
import router from '@/modules/personalcenter/router'
const userInfo = ref<any>({})
const phoneNum = ref('')
const type = ref(3)
const e_mail = ref()

const goDetail = (val: string) => {
  switch (val) {
    case 'changePhone':
      router.push({ name: 'changePhoneNumber' })
      break
    case 'goEmail':
      router.push({ name: 'mailbox' })
      break
    case 'pushUpdPhone':
      router.push({ name: 'changePassword' })
      break
    default:
      return
  }
}
function goNameAuthentication(val: any) {
  if (val === 1) {
    console.log('查看')
    router.push({ name: 'nameAuthentication', query: { id: val } })
  } else {
    router.push({ name: 'nameAuthentication', query: { id: val } })
  }
}
// 获取用户信息
async function getUserId() {
  const user = JSON.parse(localStorage.getItem('userInfo'))

  const res: any = await selectUserInfo({ userId: user.id })
  phoneNum.value = res.data.phoneNum

  // 假设 formData 是一个包含 phoneNum 属性的对象
  const phone = phoneNum.value
  // 使用正则表达式匹配并替换中间四位数字
  const maskedPhoneNum = phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
  // 更新 formData
  phoneNum.value = maskedPhoneNum
  userInfo.value = { ...res.data }
  console.log(res)
}
console.log(userInfo.value, 123123)
onMounted(() => {
  getUserId()
})
</script>

<style lang="scss" scoped>
.security-size {
  font-size: 18px;
}
.border-btm:hover {
  border-bottom: 1px solid #4f27fc;
}
</style>
