<template>
  <div class="flex justify-center mb-[142px] mt-[85px]">
    <div v-for="item in steps" :key="item.number" class="w-[316px]">
      <div
        class="flex justify-center items-center gap-[28px] text-center mb-[11px]"
      >
        <div
          v-if="currentStep <= item.number && currentStep !== 3"
          :class="[
            'step-circle',
            currentStep == item.number
              ? 'phone-number-start'
              : 'phone-number-stop',
            'w-[30px]',
            'h-[30px]',
            'rounded-[50%]',
            'text-white',
            'flex',
            'justify-center',
            'items-center',
          ]"
        >
          {{ item.number }}
        </div>

        <div
          v-else
          class="bg-[#17D017] w-[30px] h-[30px] rounded-[50%] text-center flex justify-center items-center"
        >
          <svg-icon
            class-name="password-success"
            class="w-[19px] h-[14px]"
            color="#ffffff"
          ></svg-icon>
        </div>
        <div
          :style="{
            color:
              currentStep > item.number || currentStep === 3 ? '#17D017' : '',
          }"
        >
          {{ item.title }}
        </div>
      </div>
      <div
        v-if="currentStep > item.number || currentStep == 3"
        class="bg-[#17D017] w-[100%] h-[1px]"
      ></div>
      <div>
        <img
          v-if="currentStep == item.number && currentStep !== 3"
          src="@/assets/personalCenter/phone-number-space.png"
          alt="#"
        />
      </div>
      <div
        v-if="currentStep < item.number && item.number != currentStep"
        class="bg-[#c7c7c7] w-[100%] h-[1px] opacity-[0.5]"
      ></div>
    </div>
  </div>
  <div class="flex justify-center mb-[92px] personalcenter-form">
    <n-form
      v-if="currentStep == 1 || currentStep == 2"
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-placement="left"
      require-mark-placement="right-hanging"
    >
      <n-form-item
        label="输入手机号"
        :path="currentStep != 1 ? 'phoneNum' : ''"
      >
        <n-input
          v-model:value="formData.phoneNum"
          :disabled="currentStep == 1"
          maxlength="50"
          style="border: none"
          class="w-[362px] h-[62px] text-18 flex items-center"
          placeholder=""
        />
      </n-form-item>
      <n-form-item label="验证码" path="verificationCode">
        <n-input-group>
          <n-input
            v-model:value="formData.verificationCode"
            maxlength="4"
            class="w-[208px] h-[62px] text-18 flex items-center"
            placeholder=""
          />
          <button
            v-throttle="{
              method: 'click',
              callback: sendCodes,
            }"
            style="z-index: 2"
            :class="[
              'w-[154px]',
              'flex',
              'justify-center',
              'items-center',
              'text-18',
              'text-white',
              'rounded-[4px]',
              btnDisabled ? 'bg-[#ababab]' : 'bg-[#4f27fc]',
              btnDisabled ? '' : 'hover:bg-[#5930ff]',
            ]"
            type="primary"
            ghost
          >
            {{ codeword }}
          </button>
        </n-input-group>
      </n-form-item>
    </n-form>
    <div v-else class="flex flex-col justify-items-center items-center">
      <img
        class="mb-[50px]"
        src="@/assets/personalCenter/succes-confirm.png"
        alt="#"
      />
      <div class="text-[20px]">更绑成功,请重新登录</div>
    </div>
  </div>
  <div class="flex justify-center">
    <button
      v-throttle="{
        method: 'click',
        callback: handleValidateButtonClick,
      }"
      class="w-[300px] h-[60px] flex justify-center items-center text-18 bg-[#4f27fc] hover:bg-[#5930ff] text-white rounded-[4px]"
    >
      确定
    </button>
  </div>
</template>

<script lang="ts" setup>
import { sendCode } from '@/api/login/login'
import {
  selectUserInfo,
  verifyOldPhoneNum,
  verifyNewPhoneNum,
} from '@/api/personalCenter/personalCenter'
import { FormInst, NFormItem, NForm, NInput, FormItemRule } from 'naive-ui'
const formData = reactive({
  phoneNum: '',
  verificationCode: '',
  newPhoneNum: '',
})
// 验证码按钮相关（时间函数、是否禁用、多少秒后可发送、验证码按钮文字）
const timer = ref<any>(null)
const btnDisabled = ref<boolean>(false)
const second = ref<number>(0)
const codeword = computed(() =>
  second.value > 0 ? `获取验证码(${second.value}s)` : '获取验证码',
)
//发送验证码
const sendCodes = async () => {
  if (btnDisabled.value) {
    return
  }
  let parmans = {
    phoneNum: currentStep.value == 1 ? formData.newPhoneNum : formData.phoneNum,
    sendCodeMark: 2,
  }
  const res: any = await sendCode(parmans)
  if (res.code === 200) {
    let s = 60 //倒计时间
    if (!timer.value) {
      second.value = s
      btnDisabled.value = true
      timer.value = setInterval(() => {
        if (second.value > 0 && second.value <= s) {
          second.value--
          if (second.value === 0) {
            btnDisabled.value = false
          }
        } else {
          clearInterval(timer.value)
          timer.value = null
        }
      }, 1000)
    }
  } else if (res) {
    window.$message.error(res.msg)
    console.log(res.msg)
  }
}
let hasValidated = ref(false)
const formRef = ref<FormInst | null>(null)
// 验证规则
const rules = {
  phoneNum: [
    {
      key: 'phoneNum',
      required: true,
      validator: (rule: FormItemRule, value: string) => {
        const reg = /^\d{11}$/ // 正则表达式，确保是11位数字
        if (!reg.test(value)) {
          return new Error('请输入正确手机号')
        }
        return true
      },
      trigger: ['blur'], // 触发验证的时机，在失去焦点时触发
    },
  ],
  verificationCode: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        let reg = /^\d{4}/
        if (!reg.test(value)) {
          return new Error('请输入正确验证码')
        }
        return true
      },
      trigger: ['change'],
    },
  ],
}
const steps = [
  {
    number: 1,
    title: '身份认证',
    hasImage: true,
    image: '@/assets/phone-number-space.png',
  },
  {
    number: 2,
    title: '输入手机号',
    hasImage: true,
    image: '@/assets/phone-number-space.png',
  },
  { number: 3, title: '完成', hasImage: false },
]
const currentStep = ref(1)

function nextStep() {
  currentStep.value++
  localStorage.setItem('current', JSON.stringify(currentStep.value))

  formData.phoneNum = ''
  formData.verificationCode = ''
}
function getCurrent() {
  const num = Number(localStorage.getItem('current'))

  if (num) {
    currentStep.value = num
  } else {
    currentStep.value = 1
  }
}
// 验证按钮点击事件处理函数
function handleValidateButtonClick() {
  if (currentStep.value == 1 || currentStep.value == 2) {
    formRef.value?.validate(errors => {
      if (!errors) {
        if (currentStep.value == 1) {
          verifyOldPhoneNums()
        } else if (currentStep.value == 2) {
          verifyNewPhoneNums()
        } else {
          localStorage.removeItem('current')
        }
      }
    })
  } else {
    localStorage.removeItem('current')
    localStorage.removeItem('token')
    location.href = location.origin + `/`
  }
}
// 获取用户信息
async function getUserId() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const res: any = await selectUserInfo({ userId: userInfo.id })
  formData.phoneNum = res.data.phoneNum
  formData.newPhoneNum = res.data.phoneNum

  // 假设 formData 是一个包含 phoneNum 属性的对象
  const phoneNum = formData.phoneNum
  // 使用正则表达式匹配并替换中间四位数字
  const maskedPhoneNum = phoneNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
  // 更新 formData
  formData.phoneNum = maskedPhoneNum
}
// 检验旧手机号
async function verifyOldPhoneNums() {
  let parmans = {
    phoneNum: formData.newPhoneNum,
    verificationCode: formData.verificationCode,
  }
  const res: any = await verifyOldPhoneNum(parmans)
  if (res.code === 200) {
    hasValidated.value = false
    nextStep()
    clearInterval(timer.value)
    timer.value = null
    btnDisabled.value = false
    second.value = 0
  } else if (res) {
    window.$message.error(res.msg)
  }
}
//检验新手机号
async function verifyNewPhoneNums() {
  const res: any = await verifyNewPhoneNum(formData)
  if (res.code === 200) {
    hasValidated.value = false
    nextStep()
    clearInterval(timer.value)
    timer.value = null
    btnDisabled.value = false
    second.value = 0
  } else if (res) {
    window.$message.error(res.msg)
  }
}
onMounted(() => {
  getCurrent()
  getUserId()
})
onUnmounted(() => {
  localStorage.removeItem('current')
})
</script>
<style lang="scss" scoped>
.personalcenter-form {
  :deep(.n-form-item.n-form-item--left-labelled) {
    font-size: 18px;
    .n-form-item-label__asterisk {
      display: none;
    }
  }
  :deep(
      .n-form-item.n-form-item--left-labelled
        .n-form-item-label.n-form-item-label--right-hanging-mark
    ) {
    font-size: 18px;
    margin-right: 20px;
    color: #505050;
    min-width: 130px;
    width: 130px;
    height: 20px;
    display: flex;
    align-items: flex-start;
    margin-top: 20px;
    .n-form-item-label__text {
      width: 80px;
      text-align: left;
      text-wrap: nowrap;
    }
  }

  :deep(.n-form-item) {
    --n-blank-height: 44px !important;
    --n-feedback-height: 44px !important;
    .n-form-item-blank {
      display: flex;
      align-items: center;
      min-height: 44px;
      width: 362px;

      .n-input:not(.n-input--autosize),
      .n-input.n-input--textarea {
        --n-border: 1px solid #ababab !important;
        --n-box-shadow-focus: transparent !important;
        --n-border-hover: 1px solid #4f27fc !important;
        --n-border-focus: 1px solid #4f27fc !important;
        --n-loading-color: #4f27fc;
        --n-color-disabled: transparent !important;
        --n-padding-left: 25px !important;
        --n-padding-right: 25px !important;
        --n-border-radius: 4px !important;
        --n-border-disabled: 1px solid #ababab !important;
        --n-text-color-disabled: #505050 !important;
        --n-border-error: 1px solid #fa2a31 !important;
        --n-box-shadow-focus-error: transparent !important;
      }
      .n-input.n-input--disabled {
        cursor: auto;
      }
      .n-input .n-input-wrapper {
        color: #505050;
      }
      .n-input.n-input--disabled .n-input__input-el {
        cursor: auto;
      }
      .n-input {
        .n-input__input-el {
          caret-color: #4f27fc;
        }

        .n-input__textarea-el {
          padding: 0;
          caret-color: #4f27fc;
        }
      }
    }
    .n-form-item-feedback-wrapper {
      display: flex;
      justify-content: flex-start;

      &:not(:empty) {
        padding: 11px 0 0 2px;
      }

      .n-form-item-feedback.n-form-item-feedback--error {
        color: #fa2a31;
        font-size: 14px;
      }
    }
  }
}
.phone-number-stop {
  background: #bfbfbf;
}
.phone-number-start {
  background: #4f27fc;
}
:deep(.n-form-item.n-form-item--left-labelled .n-form-item-label) {
  height: 62px !important;
}
:deep(.n-form-item .n-form-item-label .n-form-item-label__asterisk) {
  display: none;
}
</style>
<style lang="scss">
.personalcenter-form {
  .n-form-item-blank {
    display: flex;
    align-items: center;
    min-height: 58px;

    .n-input:not(.n-input--autosize),
    .n-input.n-input--textarea {
      --n-border: 1px solid #ababab !important;
      --n-box-shadow-focus: transparent !important;
      --n-border-hover: 1px solid #4f27fc !important;
      --n-border-focus: 1px solid #4f27fc !important;
      --n-loading-color: #4f27fc !important;
      --n-border-error: 1px solid #fa2a31 !important;
      --n-box-shadow-focus-error: transparent !important;
    }

    .n-input .n-input-wrapper {
      padding: 16px 26px;
      color: #505050;
    }

    .n-input {
      .n-input__input-el {
        caret-color: #4f27fc !important;
      }
    }
  }
}
</style>
