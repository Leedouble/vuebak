import Index from '../pages/index'
import Login from '../pages/login'
import FindPassword from '../pages/find-password'

const baseList = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: { layout: { header: true, footer: true } }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { auth: false, type: 'noLogin' }
  },
  {
    path: '/find-password',
    name: 'find-password',
    component: FindPassword,
    meta: { auth: false, type: 'noLogin', layout: {} }
  }
]
export default baseList
