import event_one from '@/assets/images/eventCenter/event_one.jpg'
import event_two from '@/assets/images/eventCenter/event_two.jpg'
import event_three from '@/assets/images/eventCenter/event_three.jpg'
import event_four from '@/assets/images/eventCenter/event_four.jpg'
import event_five from '@/assets/images/eventCenter/event_five.jpg'
import event_six from '@/assets/images/eventCenter/event_six.jpg'
import event_seven from '@/assets/images/eventCenter/event_seven.jpg'
import event_eight from '@/assets/images/eventCenter/event_eight.jpg'
import recommend_one from '@/assets/images/eventCenter/recommend_one.jpg'
import recommend_two from '@/assets/images/eventCenter/recommend_two.jpg'
import recommend_three from '@/assets/images/eventCenter/recommend_three.jpg'
import recommend_four from '@/assets/images/eventCenter/recommend_four.jpg'

export const eventList: any[] = [
  {
    host: '政府',
    hostColor: '#ec2424',
    bg: event_one,
    location: '武汉',
    name: '武汉市CS2夏季赛',
    bonus: 64000,
    date: '2024/6/24-2024/9/24',
    apply: '12/16',
    deadline: 18,
    like: 108,
    state: false,
  },
  {
    host: '官方',
    hostColor: '#8969ff',
    bg: event_two,
    location: '武汉',
    name: '湖北襄阳市CS2秋季赛',
    bonus: 68000,
    date: '2024/6/24-2024/9/24',
    apply: '16/16',
    deadline: 34,
    like: 563,
    state: false,
  },
  {
    host: '高校',
    hostColor: '#1379F3',
    bg: event_three,
    location: '武汉',
    name: '襄阳市CS2高校比赛',
    bonus: 15200,
    date: '2024/6/24-2024/9/24',
    apply: '8/16',
    deadline: 20,
    like: 98,
    state: false,
  },
  {
    host: '政府',
    hostColor: '#ec2424',
    bg: event_four,
    location: '武汉',
    name: '湖北枣阳市CS2夏季赛',
    bonus: 45000,
    date: '2024/6/24-2024/9/24',
    apply: '15/16',
    deadline: 34,
    like: 368,
    state: false,
  },
  {
    host: '政府',
    hostColor: '#ec2424',
    bg: event_five,
    location: '武汉',
    name: '湖北襄阳市CS2秋季赛',
    bonus: 80000,
    date: '2024/6/24-2024/9/24',
    apply: '14/16',
    deadline: 13,
    like: 230,
    state: false,
  },
  {
    host: '政府',
    hostColor: '#ec2424',
    bg: event_six,
    location: '武汉',
    name: '枣阳市CS2夏季赛',
    bonus: 52000,
    date: '2024/6/24-2024/9/24',
    apply: '12/16',
    deadline: 6,
    like: 210,
    state: false,
  },
  {
    host: '政府',
    hostColor: '#ec2424',
    bg: event_seven,
    location: '武汉',
    name: '襄阳市CS2高校比赛',
    bonus: 20000,
    date: '2024/6/24-2024/9/24',
    apply: '11/16',
    deadline: 34,
    like: 460,
    state: false,
  },
  {
    host: '个人',
    hostColor: '#00c589',
    bg: event_eight,
    location: '武汉',
    name: '襄阳市CS2高校比赛',
    bonus: 20000,
    date: '2024/6/24-2024/9/24',
    apply: '10/16',
    deadline: 42,
    like: 236,
    state: false,
  },
]

export const recommendTeamList: any[] = [
  {
    name: '自然选择战队',
    school: '华中科技大学',
    bg: recommend_one,
    date: '36:46:24',
    like: 222,
    status: '4/6',
    slogan: '加入我们，我们就是最牛的!',
    state: 1,
    collectState: false,
  },
  {
    name: '青铜时代战队',
    school: '武汉大学',
    bg: recommend_two,
    date: '36:46:24',
    like: 222,
    status: '5/5',
    slogan: '加入我们，我们就是最牛的!',
    state: 1,
    collectState: false,
  },
  {
    name: '蓝色空间战队',
    school: '华中师范大学',
    bg: recommend_two,
    date: '36:46:24',
    like: 222,
    status: '2/5',
    slogan: '加入我们，我们就是最牛的!',
    state: 2,
    collectState: false,
  },
  {
    name: '终极规律战队',
    school: '中南财经政法大学',
    bg: recommend_three,
    date: '36:46:24',
    like: 222,
    status: '3/5',
    slogan: '加入我们，我们就是最牛的!',
    state: 2,
    collectState: false,
  },
  {
    name: '水滴战队',
    school: '中南民族大学',
    bg: recommend_four,
    date: '36:46:24',
    like: 222,
    status: '4/7',
    slogan: '加入我们，我们就是最牛的!',
    state: 3,
    collectState: false,
  },
]

export const infoSelectOptions = [
  {
    label: '按时间排序',
    value: 1,
  },
  {
    label: '按热度排序',
    value: 2,
  },
]

export const infoTitleList = [
  'MONTE新阵容首秀不敌ZT 赛后队员动态一览',
  '数据对比:AX1LE在CS新版本表现对比CSGO...',
  '官宣:LMPERIAL招入TRY作为第五人',
  'FALLEN:我们要全力以赴，相信队伍首轮能够战胜NAVI',
  'OVERDRIVE:DONK这辈子都不会去CLOUD9',
  'HOBBIT透露在加入GAMBIT之前曾剃了光头告别CS',
  'HOBBIT透露在加入GAMBIT之前曾剃了光头告别CS',
]

export const infoVideoTypeOptions = [
  {
    label: '全部',
    value: 1,
  },
  {
    label: 'CS电竞赛事',
    value: 2,
  },
  {
    label: 'DOTA电竞赛事',
    value: 3,
  },
]
