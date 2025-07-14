<template>
  <div class="flex justify-center mb-[142px] mt-[152px] personalcenter-form">
    <n-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-placement="left"
      require-mark-placement="right-hanging"
    >
      <n-form-item label="输入邮箱号" path="eEmail">
        <n-input
          v-model:value="formData.eEmail"
          style="width: 362px; border: none"
          class="h-[62px] text-18 flex items-center"
          placeholder=""
          @input="e => changeRuleWay(e, 'eEmail')"
        />
      </n-form-item>
      <n-form-item label="验证码" path="verificationCode">
        <n-input-group>
          <n-input
            v-model:value="formData.verificationCode"
            maxlength="4"
            style="width: 208px"
            class="h-[62px] text-18 flex items-center"
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
import { sendEMail, verifyEMail } from '@/api/personalCenter/personalCenter'
import { FormInst, NFormItem, NForm, NInput, FormItemRule } from 'naive-ui'
const formData = reactive({
  eEmail: '',
  verificationCode: '',
})
const msg = ref(false)
// 验证码按钮相关（时间函数、是否禁用、多少秒后可发送、验证码按钮文字）
const timer = ref<any>(null)
const btnDisabled = ref<boolean>(false)
const second = ref<number>(0)
const codeword = computed(() =>
  second.value > 0 ? `获取验证码(${second.value}s)` : '获取验证码',
)
const changeRuleWay = (e: any, inputname: string) => {
  const erroList = document.getElementsByClassName('n-input--error-status')
  if (
    erroList.length > 0 &&
    (erroList[0]?.className.indexOf(inputname) > -1 ||
      erroList[1]?.className.indexOf(inputname) > -1)
  ) {
    if (formRef.value) {
      formRef.value.rules[inputname][0].trigger = ['blur', 'input']
    }
  }
}
//发送验证码
const sendCodes = async () => {
  formRef.value?.validate(
    async errors => {
      if (!errors) {
        if (btnDisabled.value) {
          return
        }
        let parmans = {
          eMail: formData.eMail,
          // verificationCode: 2,
        }
        const res: any = await sendEMail(parmans)
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
    },
    rule => {
      return rule?.key === 'eEmail'
    },
  )
}
const formRef = ref<FormInst | null>(null)
// 验证规则
const rules = {
  eEmail: [
    {
      key: 'eEmail',
      required: true,
      validator(rule: FormItemRule, value: string) {
        const emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        if (!emailReg.test(value)) {
          return new Error('请输入正确邮箱地址')
        }
        return true
      },
      trigger: 'blur',
    },
  ],
  verificationCode: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        let reg = /^\d{4}/
        if (!reg.test(value)) {
          return new Error('请输入正确验证码')
        } else if (msg) {
          return new Error('请输入正确验证码')
        }
        return true
      },
      trigger: ['change'],
    },
  ],
}
// 验证按钮点击事件处理函数
function handleValidateButtonClick() {
  formRef.value?.validate(errors => {
    if (!errors) {
      const res: any = verifyEMail(formData)
      if (res.code === 200) {
        window.$message.error('绑定成功')
      }
    } else {
      console.log('验证失败')
    }
  })
}
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
