<!--
 * @Author: Wuzl
 * @Date: 2024-07-04 14:09:09
 * @Description: 登录注册弹窗
-->
<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :mask-closable="false"
    class="loginmodal"
    :close-on-esc="false"
    :class="{ morebottom: checkLoginWay === 'right' }"
    :auto-focus="false"
  >
    <template #default>
      <div v-if="errorTip" class="tips">{{ tipsWord }}</div>
      <div class="closebutton">
        <svg-icon
          class-name="login_closecircle"
          color="#bfbfbf"
          @click="closeModal('close')"
        />
      </div>
      <div class="title">
        <div
          class="check-line"
          :class="{ checkr: checkLoginWay === 'right' }"
        ></div>
        <div
          class="nocheck-title"
          :class="{ 'check-title': checkLoginWay === 'left' }"
          @click="changeCheck('left')"
        >
          <span>验证码登录</span>
        </div>
        <div
          class="nocheck-title"
          :class="{ 'check-title': checkLoginWay === 'right' }"
          @click="changeCheck('right')"
        >
          <span>密码登录</span>
        </div>
      </div>
      <n-form
        ref="formRef"
        :label-width="80"
        :model="formValue"
        :rules="rules"
        label-placement="left"
        :show-label="false"
      >
        <n-form-item v-if="checkLoginWay === 'left'" path="phone">
          <n-input
            v-model:value="formValue.phone"
            placeholder="手机号"
            class="phone"
            maxlength="11"
            @input="e => changeRuleWay(e, 'phone')"
          >
            <template #prefix>
              <svg-icon class-name="login_phone" color="#595959" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item v-else path="username">
          <n-input
            v-model:value="formValue.username"
            placeholder="帐号"
            class="username"
            maxlength="50"
            @input="e => changeRuleWay(e, 'username')"
          >
            <template #prefix>
              <svg-icon class-name="login_user" color="#595959" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item v-if="checkLoginWay === 'left'" path="code">
          <n-input
            v-model:value="formValue.code"
            placeholder="手机验证码"
            class="code"
            maxlength="4"
            @input="e => changeRuleWay(e, 'code')"
          >
            <template #prefix>
              <svg-icon class-name="login_phonecode" color="#595959" />
            </template>
          </n-input>
          <button class="getCodebtn" :disabled="btnDisabled" @click="getCode">
            {{ codeword }}
          </button>
        </n-form-item>
        <n-form-item v-else path="password">
          <n-input
            v-model:value="formValue.password"
            type="password"
            show-password-on="click"
            placeholder="密码"
            maxlength="50"
            class="password"
            @input="e => changeRuleWay(e, 'password')"
          >
            <template #prefix>
              <svg-icon class-name="login_password" color="#595959" />
            </template>
            <template #password-visible-icon>
              <svg-icon class-name="login_showpassword" color="#BFBFBF" />
            </template>
            <template #password-invisible-icon>
              <svg-icon class-name="login_hidepassword" color="#BFBFBF" />
            </template>
          </n-input>
        </n-form-item>
        <button class="gologin" @click="handleValidateClick">
          登&nbsp;&nbsp;&nbsp;录
        </button>
        <n-form-item path="remeber" class="chekitem">
          <div class="boss">
            <div
              class="check"
              :class="{ checked: formValue.remeber }"
              @click="formValue.remeber = !formValue.remeber"
            >
              <svg-icon
                v-if="formValue.remeber"
                class-name="login_checkbox"
                color="#5325fe"
              />
            </div>
          </div>
          <span>7天内免登录</span>
        </n-form-item>
        <n-form-item
          v-if="checkLoginWay === 'left'"
          path="agree"
          class="chekitem agreebox"
        >
          <div class="boss">
            <div
              class="check"
              :class="{ checked: formValue.agree }"
              @click="formValue.agree = !formValue.agree"
            >
              <svg-icon
                v-if="formValue.agree"
                class-name="login_checkbox"
                color="#5325fe"
              />
            </div>
          </div>
          <span
            >我已阅读并同意<a :href="licenseagreement" target="_blank"
              >许可协议</a
            >和<a :href="privacyagreement" target="_blank">隐私政策</a
            >，未注册手机登录时会自动创建账号</span
          >
        </n-form-item>
        <n-form-item v-else path="agree" class="chekitem ragreebox">
          <div class="boss">
            <div
              class="check"
              :class="{ checked: formValue.agree }"
              @click="formValue.agree = !formValue.agree"
            >
              <svg-icon
                v-if="formValue.agree"
                class-name="login_checkbox"
                color="#5325fe"
              />
            </div>
          </div>
          <span
            >我已阅读并同意<a :href="licenseagreement" target="_blank"
              >许可协议</a
            >和<a :href="privacyagreement" target="_blank">隐私政策</a></span
          >
        </n-form-item>
      </n-form>
      <slider-check
        :show-modal="showSlider"
        @close-modal="closeSlider"
      ></slider-check>
    </template>
  </n-modal>
</template>
<script lang="ts">
export default {
  name: 'LoginModal',
}
</script>
<script setup lang="ts">
import {
  FormInst,
  NFormItem,
  NForm,
  NInput,
  FormItemRule,
  NModal,
} from 'naive-ui'
import { sendCode, userLogin } from '@/api/login/login'
import { Md5 } from 'ts-md5'
import privacyagreement from '@/assets/docs/privacyagreement.pdf'
import licenseagreement from '@/assets/docs/licenseagreement.pdf'
import { throttle } from 'lodash'
// 控制弹窗显隐
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
    required: true,
  },
})
const showModal = computed(() => props.showModal)
//控制人机校验滑块弹窗显隐
const showSlider = ref<boolean>(false)
const sliderTitle = ref<string>('')
//提示信息
const tipsTimer = ref<any>(null)
const tipsWord = ref<string>('')
const errorTip = ref<boolean>(false)
//区分选中登录方式
const checkLoginWay = ref<string>('left')
// 验证码按钮相关（时间函数、是否禁用、多少秒后可发送、验证码按钮文字）
const timer = ref<any>(null)
const btnDisabled = ref<boolean>(false)
const second = ref<number>(0)
const codeword = computed(() =>
  second.value > 0 ? `${second.value}s` : '立即发送',
)
//表单相关（表单ref、表单值、表单正则）
const formRef = ref<FormInst | null>(null)
const formValue = reactive<any>({
  phone: '',
  code: '',
  password: '',
  username: '',
  remeber: false,
  agree: false,
})
const rules = {
  phone: [
    {
      key: 'phone',
      required: true,
      validator(rule: FormItemRule, value: string) {
        let reg = /^1[3456789]\d{9}/
        if (!reg.test(value)) {
          return new Error('请输入正确手机号')
        }
        return true
      },
      trigger: ['blur'],
    },
  ],
  username: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        let reg = /^\d{11}/
        if (!reg.test(value) || value.length > 11) {
          return new Error('请输入正确账号')
        }
        return true
      },
      trigger: ['blur'],
    },
  ],
  code: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        let reg = /^\d{4}/
        if (!reg.test(value)) {
          return new Error('请输入正确验证码')
        }
        return true
      },
      trigger: ['blur'],
    },
  ],
  password: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('请输入密码')
        }
        return true
      },
      trigger: ['blur'],
    },
  ],
  agree: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('请同意相关协议内容')
        }
        return true
      },
    },
  ],
}
//改变输入框校验方式
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
//切换登录方式
const changeCheck = (value: string) => {
  checkLoginWay.value = value
  clearForm()
}
//点击获取验证码
const getCode = () => {
  formRef.value?.validate(
    async errors => {
      if (!errors) {
        sliderTitle.value = 'code'
        showSlider.value = true
      }
    },
    rule => {
      return rule?.key === 'phone'
    },
  )
}
//点击登录
const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async errors => {
    if (!errors) {
      if (checkLoginWay.value === 'right') {
        sliderTitle.value = 'login'
        showSlider.value = true
      } else {
        await login()
      }
    }
  })
}

//关闭slider弹窗
const closeSlider = (value: string) => {
  if (value === 'success') {
    sliderTitle.value === 'login' ? login() : sendCodes()
  }
  showSlider.value = false
}
//登录
const login = throttle(async () => {
  const data: object =
    checkLoginWay.value === 'left'
      ? {
          loginMark: 1,
          phoneNum: formValue.phone,
          verificationCode: formValue.code,
          secretAccess: formValue.remeber ? 1 : 0,
        }
      : {
          loginMark: 2,
          phoneNum: formValue.username,
          password: encryptPassword(),
          secretAccess: formValue.remeber ? 1 : 0,
        }
  const res: any = await userLogin(data)
  if (res.code === 200) {
    window.localStorage.setItem('token', res.data.token)
    window.localStorage.setItem('userInfo', JSON.stringify(res.data))
    closeModal('success')
  } else {
    showTips(res.msg)
  }
}, 1000)
//发送验证码
const sendCodes = async () => {
  if (btnDisabled.value) {
    return
  }
  const res: any = await sendCode({
    phoneNum: formValue.phone,
    sendCodeMark: 1,
  })
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
  } else {
    showTips(res.msg)
  }
}
//显示错误提示
const showTips = (word: string) => {
  if (tipsTimer.value) {
    errorTip.value = false
    tipsWord.value = ''
    clearInterval(tipsTimer.value)
    tipsTimer.value = null
  }
  errorTip.value = true
  tipsWord.value = word
  tipsTimer.value = setInterval(() => {
    errorTip.value = false
    tipsWord.value = ''
    clearInterval(tipsTimer.value)
    tipsTimer.value = null
  }, 2500)
}
//密码加密
const encryptPassword = () => {
  let mdPassword = ''
  mdPassword = Md5.hashStr(formValue.password)
  return mdPassword
}
//清空弹窗相关信息
const clearForm = () => {
  if (formRef.value) {
    formRef.value.rules.phone[0].trigger = ['blur']
    formRef.value.rules.username[0].trigger = ['blur']
    formRef.value.rules.password[0].trigger = ['blur']
    formRef.value.rules.code[0].trigger = ['blur']
  }

  formRef.value?.restoreValidation()
  formValue.code = ''
  formValue.password = ''
  formValue.phone = ''
  formValue.username = ''
  formValue.remeber = false
  formValue.agree = false
  btnDisabled.value = false
  clearInterval(timer.value)
  timer.value = null
  errorTip.value = false
  tipsWord.value = ''
  clearInterval(tipsTimer.value)
  tipsTimer.value = null
  second.value = 0
}
//关闭弹窗
const emit = defineEmits(['closeModal'])
const closeModal = (vlaue: string) => {
  clearForm()
  checkLoginWay.value = 'left'
  emit('closeModal', vlaue)
}
</script>
<style lang="scss">
.loginmodal {
  height: 450px;
  width: 400px !important;
  background: #ffffff;
  border-radius: 4px;
  padding: 0;
  font-style: normal !important;

  .n-dialog__close {
    display: none;
  }

  .n-dialog__title {
    display: none;
  }

  .n-dialog__content {
    height: 450px;
    margin: 0 !important;
    padding: 0 50px;
    padding-top: 50px;

    .title {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 36px;
      position: relative;

      .check-line {
        width: 52px;
        height: 2px;
        background: #5325fe;
        position: absolute;
        left: 16px;
        top: 36px;
        transition: 0.2s all;
      }

      .checkr {
        left: 126px;
      }

      .nocheck-title {
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        font-size: 16px;
        color: #8c8c8c;
        text-align: center;
        margin-right: 36px;
      }

      .check-title {
        font-weight: bold;
        font-size: 18px;
        color: #262626;
      }
    }

    .tips {
      position: absolute;
      top: 10px;
      left: 0;
      right: 0;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      width: 180px;
      height: 48px;
      background: rgba($color: #595959, $alpha: 0.9);
      font-size: 14px;
      color: #eee;
    }

    .closebutton {
      position: absolute;
      right: 18px;
      top: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      cursor: pointer;
    }

    .n-form {
      .n-form-item {
        height: 68px;

        .n-form-item-blank {
          min-height: 42px;
        }
      }

      .n-input__eye {
        font-size: 24px;
      }

      .n-input__state-border {
        border: 1px solid #989a9c;
        box-shadow: none !important;
        transition: none !important;
        border-radius: 4px;
      }

      .n-input__border {
        border: 1px solid #989a9c;
        box-shadow: none !important;
        transition: none !important;
        border-radius: 4px;
      }

      .n-input {
        &:hover {
          .n-input__state-border {
            border: none;
          }
        }

        .n-input-wrapper {
          padding-left: 0;
          padding-right: 10px;

          .n-input__prefix {
            position: relative;
            margin-right: 10px;
            width: 42px;

            &:before {
              content: '';
              position: absolute;
              width: 1px;
              height: 18px;
              background: #595959;
              border-radius: 0;
              top: 0;
              bottom: 0;
              margin: auto 0;
              right: 0;
            }

            .svg-icon {
              font-size: 20px;
            }

            .svg-icon-login_phone {
              font-size: 22px;
              margin-left: 4px;
            }

            .svg-icon-login_password {
              font-size: 22px;
            }
          }
        }
      }

      .n-input__input {
        height: 42px;

        .n-input__input-el {
          height: 42px;
          line-height: 42px !important;
          caret-color: #595959;
          font-size: 14px;
          color: #595959;
          position: absolute;
        }

        .n-input__placeholder {
          font-size: 14px;
          color: #bfbfbf;

          span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .n-input--focus {
        background: #f7f5fd;

        .n-input__state-border {
          border: 1px solid #5325fe !important;
        }

        .n-input__prefix {
          .svg-icon {
            color: #5325fe !important;
          }
        }
      }

      .n-input--error-status {
        &:hover {
          .n-input__state-border {
            border: 1px solid #ff2e00;
          }
        }

        .n-input__state-border {
          border: 1px solid #ff2e00 !important;
        }

        .n-input__input {
          .n-input__input-el {
            caret-color: #ff2e00;
          }
        }
      }

      .n-form-item-feedback-wrapper {
        height: 26px;
        padding: 0;

        .n-form-item-feedback--error {
          height: 100%;

          .n-form-item-feedback__line {
            height: 100%;
            line-height: 20px;
            font-size: 12px;
            color: #fa2a31;
            animation: headShake;
            animation-duration: 1s;
          }
        }
      }

      .code {
        width: calc(100% - 100px);
      }

      .getCodebtn {
        width: 106px;
        height: 42px;
        cursor: pointer;
        font-size: 14px;
        color: #fff;
        background: #5325fe;
        border-radius: 4px;
        border: 1px solid #5325fe;
        margin-left: -6px;
        z-index: 1;

        &:disabled {
          cursor: no-drop;
          border: none;
          background: #bfbfbf;
          color: #fff;
        }
      }

      .gologin {
        width: 100%;
        height: 40px;
        background: #5325fe;
        border-radius: 4px;
        border: none;
        font-weight: bold;
        font-size: 16px;
        color: #ffffff;
        cursor: pointer;
        margin-bottom: 24px;
      }

      .chekitem {
        height: 40px;
        cursor: pointer;

        .n-form-item-blank {
          align-items: start;
        }

        .boss {
          height: 20px;
          display: flex;
          align-items: center;
        }

        .check {
          width: 14px;
          height: 14px;
          border-radius: 2px;
          display: flex;
          border: 1px solid #666666;
          align-items: center;
          justify-content: center;
        }

        .svg-icon {
          transition: 0.3s all;
        }

        .checked {
          border: 1px solid #5325fe;
        }

        span {
          cursor: default;
          height: 20px;
          width: calc(100% - 20px);
          margin-left: 6px;
          font-size: 12px;
          color: #8c8c8c;
        }

        a {
          color: #5325fe;
          font-weight: bold;
        }
      }

      .agreebox {
        margin-top: -14px;
      }

      .ragreebox {
        margin-top: -14px;

        .n-form-item-feedback-wrapper {
          margin-top: -18px;
        }
      }
    }
  }
}
</style>
