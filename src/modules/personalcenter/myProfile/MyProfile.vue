<template>
  <div class="px-[110px] pt-[77px] pb-[80px] text-center relative">
    <div class="flex">
      <div class="flex flex-col items-center mr-[72px]">
        <img
          :src="assetsPrefix + model.headPortrait"
          class="w-[154px] h-[154px] rounded-[77px]"
          alt=""
        />
        <button
          class="w-[120px] h-[40px] flex justify-center items-center text-18 bg-[#4F27FC] hover:bg-[#5930ff] text-white rounded-[4px] mt-[30px]"
          @click="findHeader"
        >
          更换头像
        </button>
      </div>
      <div class="flex-1 text-505050">
        <div class="flex justify-between text-18 mb-[56px]">
          <span>我的关注：100</span>
          <span>我的粉丝：100</span>
          <span>我参与过的赛事：0</span>
        </div>
        <n-form
          ref="formRef"
          :model="model"
          :rules="rules"
          label-placement="left"
          require-mark-placement="right-hanging"
        >
          <n-form-item label="昵称" path="userName" class="relative pr-[66px]">
            <n-input
              v-model:value="model.userName"
              class="h-[64px] text-18 flex items-center text-left"
              placeholder=""
              @input="filter"
            />
            <span
              v-if="model.userNameStatus === 1"
              class="absolute right-[-60px] text-[#fa2a31] text-14"
              >审核中</span
            >
          </n-form-item>

          <n-form-item label="性别" path="sex">
            <n-radio-group
              v-model:value="model.sex"
              :disabled="model.realNameStatus === 1"
              name="sex"
            >
              <n-space>
                <n-radio :value="1"> 男</n-radio>
                <n-radio :value="2"> 女</n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="个性签名" path="personalSign">
            <n-input
              v-model:value="model.personalSign"
              class="w-[478px] h-[92px] text-18 text-left"
              placeholder=""
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5,
              }"
              @input="filterTextarea"
            />
          </n-form-item>
          <n-form-item label="游戏截图" path="sex">
            <div class="flex w-[478px] justify-between">
              <img
                v-for="(item, index) in model.gameImage"
                :key="index"
                :src="assetsPrefix + item"
                class="w-[137px] h-[137px] rounded-[4px]"
                alt=""
              />
            </div>
          </n-form-item>
        </n-form>
      </div>
    </div>
    <div
      v-if="headerShow"
      class="w-[598px] h-[366px] bg-cover absolute top-[76px] right-[110px]"
      :style="{ backgroundImage: `url(${headerImg})` }"
    >
      <div class="px-[54px] text-[18px]">
        <span class="font-bold text-white mt-[10px] inline-block">头像库</span>
        <div class="grid grid-cols-5 gap-[34px] mt-[38px]">
          <img
            v-for="(item, index) in headerImgsLists"
            :key="index"
            :src="assetsPrefix + item"
            :class="[
              'w-[74px] h-[74px] rounded-[37px] cursor-pointer inline-block z-10',
              { 'border-4 border-[#4f27fc] h': selectedIndex === index },
            ]"
            alt=""
            @click="selectHeader(index, item)"
          />
        </div>
        <div class="flex justify-end absolute bottom-[40px] right-[54px]">
          <button
            class="bg-[#e2ddfc] border border-[#4f27fc] w-[80px] h-[36px] text-[#4f27fc] text-16 rounded-[4px]"
            @click="cancelHeader"
          >
            取消
          </button>
          <button
            v-throttle="{ method: 'click', callback: submitHeader }"
            class="bg-[#4f27fc] border border-[#4f27fc] hover:bg-[#5930ff] w-[80px] h-[36px] text-white text-16 rounded-[4px] ml-[24px]"
          >
            确定
          </button>
        </div>
      </div>
    </div>
    <button
      :disabled="isThrottled"
      class="bg-[#4f27fc] hover:bg-[#5930ff] h-[60px] w-[300px] text-white rounded-[4px] text-20 mt-[96px]"
      @click="handleSubmit"
    >
      确认保存
    </button>
  </div>
</template>

<script lang="ts" setup>
import headerImg from '@/assets/images/personalcenter/headerImg.png'
import type { FormInst } from 'naive-ui'
import {
  selectAllHeadPortraitLists,
  selectUserInfoDetail,
  updateUserInfoCreate,
} from '../../../api/personalCenter/myprofile'
import fivep from '@/assets/images/csgoCab/fivep.png'
import firstp from '@/assets/images/csgoCab/firstp.png'
import fourp from '@/assets/images/csgoCab/fourp.png'
import { useHeaderStore } from '@/store'
// @ts-ignore
// eslint-disable-next-line no-undef
const assetsPrefix = GLOBAL_VARIABLE.VITE_APP_ASSETS_BASE_URL

const model = ref({
  userId: '',
  headPortrait: '',
  userName: '',
  sex: null,
  personalSign: '',
  gameImage: [fivep, firstp, fourp],
  userNameStatus: 2,
  realNameStatus: 1,
})
const headPortrait = ref<any>(null)

const rules = ref({
  userName: [
    {
      required: true,
      message: '昵称不能为空',
      trigger: 'change',
    },
  ],
})
const formRef = ref<FormInst | null>(null)
const headerShow = ref(false)
const selectedIndex = ref<any | null>(null)
const headerImgsLists = ref([])
const isThrottled = ref(false)

onMounted(() => {
  init()
})

const filter = (value: string) => {
  const maxLength = 50
  if (value.length > maxLength) {
    model.value.userName = value.slice(0, maxLength)
  } else {
    model.value.userName = value
  }
}

const filterTextarea = (value: string) => {
  const maxLength = 100
  if (value.length > maxLength) {
    model.value.personalSign = value.slice(0, maxLength)
  } else {
    model.value.personalSign = value
  }
}
const handleSubmit = () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      await updateUserInfoCreate({
        userId: model.value.userId,
        headPortrait: model.value.headPortrait,
        userName: model.value.userName,
        sex: model.value.sex,
        personalSign: model.value.personalSign,
      })
      await init()
      const local = JSON.parse(<any>window.localStorage.getItem('userInfo'))
      window.localStorage.setItem(
        'userInfo',
        JSON.stringify({
          ...local,
          headPortrait: model.value.headPortrait,
        }),
      )
      const store = useHeaderStore()
      store.changeHeaderChange(model.value.headPortrait)
    }
  })
}

const cancelHeader = () => {
  headerShow.value = false
  headPortrait.value = ''
  selectedIndex.value = ''
}

const submitHeader = () => {
  if (headPortrait.value) {
    model.value.headPortrait = headPortrait.value
    selectedIndex.value = ''
  }
  headerShow.value = false
}

const selectHeader = (index: any, img: any) => {
  selectedIndex.value = index
  headPortrait.value = img
}

const findHeader = async () => {
  headerShow.value = true
  const res: any = await selectAllHeadPortraitLists({})
  if (res.code === 200) {
    headerImgsLists.value = res.data.HeadPortraits
  }
}
const init = async () => {
  const local = JSON.parse(<any>window.localStorage.getItem('userInfo'))
  if (local) {
    const res: any = await selectUserInfoDetail({ userId: local.id })
    if (res.code === 200) {
      model.value = {
        userId: local.id,
        ...res.data,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.n-form-item) {
  --n-feedback-height: 34px !important;

  &:nth-child(3) {
    .n-form-item-feedback-wrapper {
      min-height: 58px;
    }
  }

  &:last-child {
    .n-form-item-feedback-wrapper {
      min-height: 0;
    }
  }

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

:deep(.n-form-item.n-form-item--left-labelled) {
  .n-form-item-label {
    display: flex;
    align-items: center;

    .n-form-item-label__asterisk {
      display: none;
    }
  }

  .n-form-item-label .n-form-item-label__text {
    display: flex;
    font-size: 18px;
    text-wrap: nowrap !important;
  }

  .n-form-item-label.n-form-item-label--right-hanging-mark {
    width: 120px;
    min-height: 58px;
    max-height: 92px;
  }
}

:deep(.n-radio) {
  --n-box-shadow-hover: inset 0 0 0 1px #4f27fc !important;
  display: flex;
  align-items: center;

  .n-radio-group {
    height: 62px;
  }

  .n-radio__dot {
    width: 26px;
    height: 26px;

    &::before {
      background: #4f27fc !important;
      width: 16px;
      height: 16px;
      left: 5px;
      top: 5px;
    }
  }

  .n-radio__label {
    padding: 0 26px;
    color: #505050;
    font-size: 18px;
  }

  .n-radio__dot.n-radio__dot--checked {
    box-shadow: inset 0 0 0 1px #4f27fc !important;
  }
}

:deep(.n-radio.n-radio--disabled .n-radio-input) {
  cursor: auto !important;
}
</style>
