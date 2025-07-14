<template>
  <div
    class="pt-[159px] px-[268px] flex flex-col items-center personalcenter-form"
  >
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      require-mark-placement="right-hanging"
    >
      <n-form-item label="姓名" path="name" class="relative">
        <n-input
          v-if="router.currentRoute.value.query.id == '2'"
          v-model:value="model.name"
          :disabled="isRead"
          class="h-[62px] text-18 flex items-center text-left"
          placeholder=""
        />
        <div
          v-else
          class="w-[362px] border h-[62px] rounded-[4px] border-[#ababab] text-18 px-[25px] leading-[62px] text-[#505050]"
        >
          {{ userObj.FullName }}
        </div>
      </n-form-item>
      <n-form-item label="身份证号" path="idCard" class="relative">
        <n-input
          v-if="router.currentRoute.value.query.id == '2'"
          v-model:value="model.idCard"
          :disabled="isRead"
          class="h-[62px] text-18 flex items-center text-left"
          placeholder=""
        />
        <div
          v-else
          class="w-[362px] border h-[62px] rounded-[4px] border-[#ababab] text-18 px-[25px] leading-[62px] text-[#505050]"
        >
          {{ userObj.IdCard }}
        </div>
      </n-form-item>
      <n-form-item label="证件类型" path="userName" class="relative">
        <div
          class="w-[362px] border h-[62px] rounded-[4px] border-[#ababab] text-18 px-[25px] leading-[62px] text-[#505050]"
        >
          身份证
        </div>
      </n-form-item>
    </n-form>
    <button
      v-throttle="{
        method: 'click',
        callback: handleValidateButtonClick,
      }"
      class="w-[300px] h-[60px] text-white rounded-[4px] text-20 bg-[#4f27fc] mt-[94px]"
    >
      确认
    </button>
  </div>
</template>

<script lang="ts" setup>
import { selectUserInfo } from '@/api/personalCenter/personalCenter'
import { realNameAuthLists } from '@/api/personalCenter/personalCenter'
import { FormInst, NFormItem, NForm, NInput, FormItemRule } from 'naive-ui'
import { useRouter } from 'vue-router'
const model = reactive({
  name: '',
  idCard: '',
})
const formRef = ref<FormInst | null>(null)
const rules = {
  name: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('姓名不能为空')
        }
        // 姓名通常不需要特别复杂的验证，这里简单验证非空即可
        return true
      },
      trigger: ['blur'],
    },
  ],
  idCard: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        // 中国大陆身份证号码验证正则表达式
        let reg =
          /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
        if (!value) {
          return new Error('身份证号不能为空')
        } else if (!reg.test(value)) {
          return new Error('请输入有效的实名信息')
        }
        return true
      },
      trigger: ['blur'],
    },
  ],
}
const isRead = ref(false)
const userObj: any = ref({})
const handleValidateButtonClick = async () => {
  if (router.currentRoute.value.query.id == '1') {
    router.push({ name: 'securityCenter' })
  } else {
    try {
      const isValid = await formRef.value?.validate()
      if (isValid) {
        const res: any = await realNameAuthLists(model)
        if (res.code === 200) {
          console.log('认证成功')
          router.push({ name: 'securityCenter' })
        } else {
          console.log('认证失败')
          window.$message.error(res.msg)
        }
      } else {
        console.log('验证失败')
      }
    } catch (error) {
      console.error('验证过程中出现错误:', error)
    }
  }
}
const router = useRouter() // 获取当前的路由器实例

// 创建一个计算属性来获取查询参数 id
onMounted(() => {
  if (router.currentRoute.value.query.id == '1') {
    getUserId()
  }
})
async function getUserId() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const res: any = await selectUserInfo({ userId: userInfo.id })
  userObj.value = res.data
  console.log(userObj.value)
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
</style>
