<template>
  <div class="pt-[258px] px-[240px] flex flex-col items-center">
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      require-mark-placement="right-hanging"
    >
      <n-form-item
        v-if="!isRead"
        label="学信网在线验证码"
        path="verificationCode"
        class="relative"
      >
        <n-input
          v-model:value="model.verificationCode"
          :disabled="isRead"
          class="h-[62px] text-18 flex items-center text-left"
          placeholder=""
        />
      </n-form-item>
      <n-form-item
        v-if="isRead"
        label="姓名"
        path="verificationCode"
        class="relative"
      >
        <n-input
          v-model:value="model.verificationCode"
          :disabled="isRead"
          class="h-[62px] text-18 flex items-center text-left"
          placeholder=""
        />
      </n-form-item>
      <n-form-item
        v-if="isRead"
        label="学校"
        path="verificationCode"
        class="relative"
      >
        <n-input
          v-model:value="model.verificationCode"
          :disabled="isRead"
          class="h-[62px] text-18 flex items-center text-left"
          placeholder=""
        />
      </n-form-item>
    </n-form>
    <button
      class="w-[300px] h-[60px] text-white rounded-[4px] text-20 bg-[#4f27fc] mt-[94px]"
      @click="handleSubmit"
    >
      确认
    </button>
  </div>
</template>

<script lang="ts" setup>
import { realNameAuthLists } from '@/api/personalCenter/personalCenter'

const model = ref({
  verificationCode: '',
})

const rules = ref({
  verificationCode: [
    {
      required: true,
      message: '学信网在线验证码',
      trigger: 'change',
    },
  ],
})
const isRead = ref(false)

const handleSubmit = async () => {
  await realNameAuthLists(model.value)
}
</script>

<style lang="scss" scoped>
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
  color: #505050;
  min-width: 130px;
  width: 130px;
  height: 20px;
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
  margin-right: 70px;
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
}
</style>
