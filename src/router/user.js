const UserBase = r => require.ensure([], () => r(require('../pages/user/base')), 'user')
const UserStudentList = r => require.ensure([], () => r(require('../pages/user/student/list')), 'user')
const UserParentList = r => require.ensure([], () => r(require('../pages/user/parent/list')), 'user')
const UserTeacherList = r => require.ensure([], () => r(require('../pages/user/teacher/list')), 'user')

const userList = [
  {
    path: '/user',
    name: 'user-base',
    component: UserBase,
    meta: { layout: { header: true, left: true } },
    children: [
      { path: 'student/list', component: UserStudentList, meta: { layout: { header: true, left: true } } },
      { path: 'parent/list', component: UserParentList, meta: { layout: { header: true, left: true } } },
      { path: 'teacher/list', component: UserTeacherList, meta: { layout: { header: true, left: true } } }
    ]
  }
]
export default userList
