import Err404 from '../pages/error/err404'

const errorList = [
  { path: '*', name: 'err404', component: Err404, meta: { auth: false, layout: { header: true } } }
]
export default errorList
