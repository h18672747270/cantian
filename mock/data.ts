export const menuList: any[] = [
  {
    key: 'sub2',
    label: '角色管理',
    children: [
      {
        key: '/home/sss',
        label: '角色管理1',
        title: 'Option 9',
      },
      {
        key: '10',
        label: '角色管理2',
        title: 'Option 10',
      },
      {
        key: 'sub3',
        label: '角色管理3',
        title: 'Submenu',
        children: [
          {
            key: '/home/role',
            label: '角色管理3-1',
            title: 'Option 11',
          },
          {
            key: '12',
            label: '角色管理3-2',
            title: 'Option 12',
          },
        ],
      },
    ],
  },
]
export const menuTreeList: any[] = [
  {
    Id: '1',
    title: '应用管理',
    path: '',
    icon: 'application',
    children: [
      {
        Id: '3',
        path: '/home/crudFeat',
        title: '角色管理',
        icon: 'roleicon',
        children: [],
      },
      {
        Id: '4',
        path: '/home/s',
        title: '角色管理3',
        icon: 'roleicon',
        children: [
          {
            Id: '5',
            path: '/home/ss',
            title: '角色管理3-1',
            icon: 'roleicon',
            children: [],
          },
          {
            Id: '6',
            path: '/home/sss',
            title: '角色管理3-2',
            icon: 'roleicon',
            children: [],
          },
        ],
      },
    ],
  },
  {
    Id: '7',
    title: '文档管理',
    path: '/home/document',
    icon: 'document',
    children: [
      {
        Id: '8',
        path: '/home/sss22',
        title: '文档',
        icon: '',
        children: [],
      },
    ],
  },
]
