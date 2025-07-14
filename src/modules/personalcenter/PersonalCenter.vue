<template>
  <top-center-bottom>
    <template #header>
      <comm-header />
    </template>
    <template #content>
      <div class="flex h-full bg-f3f3f3 px-[260px] pt-[45px] pb-[74px] box">
        <div class="w-[332px] bg-white mr-[24px] h-[990px]">
          <n-menu
            v-model:value="activeKey"
            :default-expanded-keys="defaultExpandedKeys"
            :options="menuOptions"
            @update:value="handleUpdate"
          >
          </n-menu>
        </div>
        <div class="flex-1 flex flex-col">
          <div class="bg-white h-[80px] mb-[18px] flex items-center px-[26px]">
            <n-breadcrumb>
              <n-breadcrumb-item :clickable="false">
                我的位置
                <template #separator>
                  <svg-icon
                    class-name="detailReturn"
                    class="rotate-[-90deg] w-[28px] h-[28px]"
                    color="#ababab"
                  ></svg-icon>
                </template>
              </n-breadcrumb-item>
              <n-breadcrumb-item
                v-for="item in breadcrumb"
                :key="item.key"
                :clickable="item.clickable"
                @click="item.clickable && handleBreadcrumbClick(item)"
              >
                {{ item.label }}
                <template #separator>
                  <svg-icon
                    class-name="detailReturn"
                    class="rotate-[-90deg] w-[28px] h-[28px]"
                    color="#ababab"
                  ></svg-icon>
                </template>
              </n-breadcrumb-item>
            </n-breadcrumb>
          </div>
          <div class="bg-white flex-1">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <common-footer />
    </template>
  </top-center-bottom>
</template>

<script lang="ts" setup>
import router from '@/modules/personalcenter/router'
import type { MenuOption } from 'naive-ui'
import svg from '@/modules/personalcenter/components/svg.vue'

const activeKey = ref<string | null>('')
const defaultExpandedKeys = ref(['1'])
const breadcrumb: any = ref([])
const menuOptions = ref<MenuOption[]>([])

const renderIcon = (icon: any, isSelected: boolean) => {
  const color = isSelected ? '#4f27fc' : '#ababab'
  return () => h(svg, { className: icon, color })
}

// 更新菜单选项
const updateMenuOptions = () => {
  menuOptions.value = [
    {
      label: '个人中心',
      key: '1',
      children: [
        {
          label: '我的资料',
          key: '/myprofile',
          path: '/myprofile',
          icon: renderIcon('menu-datum', activeKey.value === '/myprofile'),
        },
        {
          label: '安全中心',
          key: '/securitycenter',
          path: '/securitycenter',
          icon: renderIcon(
            'menu-safety',
            activeKey.value === '/securitycenter',
          ),
        },
      ],
    },
  ]
}

onMounted(() => {
  router.afterEach(to => {
    const pathLists = to.fullPath.split('/')
    if (pathLists.length > 2) {
      const pathName = '/' + pathLists[1]
      activeKey.value = pathName
      breadcrumb.value = findPath(menuOptions.value, pathName)
      breadcrumb.value.push({
        label: to.meta.title,
        key: pathName,
        clickable: false,
      })
      updateMenuOptions()
    } else {
      console.log(to.fullPath)
      activeKey.value = to.fullPath
      breadcrumb.value = findPath(menuOptions.value, to.fullPath)
      updateMenuOptions()
    }
  })

  // 初始更新
  updateMenuOptions()
})

// 递归找到菜单的path
const findPath = (menuOptions: any, targetPath: string) => {
  for (const option of menuOptions) {
    if (option.path === targetPath) {
      return [{ label: option.label, key: option.key, clickable: true }]
    }

    if (option.children) {
      const childPath: any = findPath(option.children, targetPath)
      if (childPath.length > 0) {
        return [
          { label: option.label, key: option.key, clickable: false },
          ...childPath,
        ]
      }
    }
  }
  return []
}
const handleUpdate = (key: any) => {
  router.push({ path: key })
}

const handleBreadcrumbClick = (item: any) => {
  if (item.key) {
    router.push({ path: item.key })
  }
}
</script>

<style lang="scss" scoped>
:deep(.footer) {
  .common-footer {
    opacity: 1;
    bottom: 0;
  }
}
.box {
  position: relative;
  &:after {
    content: '';
    border: 30px solid transparent;
    border-top: 30px solid #f3f3f3;
    position: absolute;
    bottom: -58px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
}
:deep(.n-menu) {
  .n-submenu {
    margin-top: 0;
  }
  .n-menu-item {
    height: 64px;
  }
  .n-menu-item-content {
    height: 64px;
    padding-left: 92px !important;
    padding-right: 42px;
    .n-menu-item-content__icon {
      margin-right: 18px !important;
      width: 24px !important;
      height: 24px !important;
      font-size: 20px !important;
    }
  }
  .n-menu-item-content:not(.n-menu-item-content--disabled):hover::before {
    background: #f3f3f3;
    right: 12px;
    left: 12px;
    border-radius: 32px;
    height: 64px;
  }
  .n-menu-item-content.n-menu-item-content--selected::before {
    height: 64px;
    background-color: #f5f3fd !important;
    right: 12px;
    left: 12px;
    border-radius: 32px;
  }
  .n-menu-item-content.n-menu-item-content--selected {
    .n-menu-item-content__icon {
      margin-right: 18px !important;
    }
    .n-menu-item-content-header {
      color: #4f27fc;
    }
  }

  .n-menu-item-content-header {
    font-size: 18px;
    font-weight: 400;
  }
  .n-menu-item-content:not(
      .n-menu-item-content--disabled
    ).n-menu-item-content--selected:hover
    .n-menu-item-content-header {
    color: #4f27fc;
  }
  .n-menu-item-content::before {
    right: 12px;
    left: 12px;
    border-radius: 32px;
    height: 64px;
  }
  .n-menu-item-content.n-menu-item-content--child-active {
    .n-menu-item-content-header {
      color: #4f27fc;
      font-weight: 700;
    }
  }

  .n-base-icon svg {
    width: 18px;
    height: 18px;
    color: #ababab;
    margin-top: 3px;
  }
  .n-menu-item-content:not(
      .n-menu-item-content--disabled
    ).n-menu-item-content--child-active:hover
    .n-menu-item-content-header {
    color: #4f27fc;
  }
}
:deep(.n-breadcrumb) {
  ul {
    display: flex;
  }
  .n-breadcrumb-item:first-child .n-breadcrumb-item__link:hover {
    color: #ababab;
  }
  .n-breadcrumb-item:last-child .n-breadcrumb-item__link {
    font-weight: 700;
    color: #505050;
    font-size: 16px;
  }
  .n-breadcrumb-item .n-breadcrumb-item__link {
    color: #ababab;
    font-size: 16px;
  }
  .n-breadcrumb-item .n-breadcrumb-item__separator {
    color: #ababab;
    margin: 0;
  }
}
</style>
