import {
  mdiAccountCircle,
  mdiAlertCircle,
  mdiFoodApple,
  mdiGithub,
  mdiLock,
  mdiMonitor,
  mdiReact,
  mdiResponsive,
  mdiSquareEditOutline,
  mdiTable,
  mdiTelevisionGuide,
  mdiViewList,
} from '@mdi/js'

export default [
  {
    to: '/',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    to: '/products',
    label: 'Products',
    icon: mdiFoodApple,
  },
  {
    to: '/tables',
    label: 'Tables',
    icon: mdiTable,
  },
  {
    to: '/forms',
    label: 'Forms',
    icon: mdiSquareEditOutline,
  },
  {
    to: '/ui',
    label: 'UI',
    icon: mdiTelevisionGuide,
  },
  {
    to: '/responsive',
    label: 'Responsive',
    icon: mdiResponsive,
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
  {
    to: '/login',
    label: 'Login',
    icon: mdiLock,
  },
  {
    to: '/error',
    label: 'Error',
    icon: mdiAlertCircle,
  },
  {
    label: 'Dropdown',
    icon: mdiViewList,
    menu: [
      {
        label: 'Item One',
      },
      {
        label: 'Item Two',
      },
    ],
  },
  {
    href: 'https://github.com/justboil/admin-one-vue-tailwind',
    label: 'GitHub',
    icon: mdiGithub,
    target: '_blank',
  },
  {
    href: 'https://github.com/justboil/admin-one-react-tailwind',
    label: 'React version',
    icon: mdiReact,
    target: '_blank',
  },
]
