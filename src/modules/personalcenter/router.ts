import { createRouter, createWebHashHistory } from 'vue-router'
import { useLoginStore } from '@/store'

const routes = [
  {
    path: '/',
    redirect: '/myprofile',
  },
  {
    name: 'myprofile',
    path: '/myprofile',
    component: () => import('./myProfile/MyProfile.vue'),
    meta: { title: '我的资料' },
  },
  {
    name: 'securityCenter',
    path: '/securitycenter',
    component: () => import('./securityCenter/SecurityCenter.vue'),
    meta: { title: '安全中心' },
  },
  {
    name: 'changePassword',
    path: '/securitycenter/changepassword',
    component: () => import('./securityCenter/ChangePassword.vue'),
    meta: { title: '修改密码' },
  },
  {
    name: 'changePhoneNumber',
    path: '/securitycenter/changephonenumber',
    component: () => import('./securityCenter/ChangePhoneNumber.vue'),
    meta: { title: '更绑手机号' },
  },
  {
    name: 'mailbox',
    path: '/securitycenter/mailbox',
    component: () => import('./securityCenter/Mailbox.vue'),
    meta: { title: '邮箱绑定' },
  },
  {
    name: 'nameAuthentication',
    path: '/securitycenter/nameauthentication',
    component: () => import('./securityCenter/NameAuthentication.vue'),
    meta: { title: '实名认证' },
  },
  {
    name: 'universityCertification',
    path: '/securitycenter/universitycertification',
    component: () => import('./securityCenter/UniversityCertification.vue'),
    meta: { title: '高校认证' },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useLoginStore()
  const token = localStorage.getItem('token')
  if (!token) {
    store.changeLoginFlagReload(false)
  } else {
    next()
  }
})

export default router
