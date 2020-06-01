const Home = () => import('../page/home/index')

const Timeline = () => import('@/page/timeline/index')
const TimelineDefault = () => import('@/page/timeline/default')
const TimelineView = () => import('@/page/timeline/view')

const Login = () => import('../page/login/index')

const NotFound = () => import('@/page/404/index')

const TimepointAdd = () => import('@/page/timepoint/add')
const TimepointEdit = () => import('@/page/timepoint/edit')
const TimepointHistory = () => import('@/page/timepoint/history')
const TimepointDiff = () => import('@/page/timepoint/historyDiff')

const User = () => import('@/page/user/index')

const Devlog = () => import('@/page/devlog/index')

const Feedback = () => import('@/components/Feedback')

export default [{
  path: '/',
  component: Home,
  children: [
    {
      path: '',
      redirect: 'timeline'
    }, {
      path: '/timeline',
      name: 'timeline',
      component: Timeline,
      children: [{
        path: '',
        name: 'timeline',
        component: TimelineDefault
      }, {
        path: 'add',
        name: 'timepoint',
        component: TimepointAdd,
        meta: { requiresAuth: true }
      }, {
        path: ':id',
        name: 'timeline',
        component: TimelineView
      }, {
        path: ':id/edit',
        name: 'timepoint',
        component: TimepointEdit,
        meta: { requiresAuth: true }
      }, {
        path: ':id/history',
        name: 'timepoint',
        component: TimepointHistory
      }, {
        path: ':id/history/diff/:id1/:id2',
        name: 'historyDiff',
        component: TimepointDiff
      }]
    }, {
      path: 'login',
      name: 'login',
      component: Login
    }, {
      path: 'timepoint/add/:id',
      name: 'timepoint',
      component: TimepointAdd,
      meta: { requiresAuth: true }
    }, {
      path: 'user',
      name: 'user',
      component: User,
      meta: { requiresAuth: true }
    }, {
      path: 'devlog',
      name: 'devlog',
      component: Devlog
    }, {
      path: 'feedback',
      name: 'feedback',
      component: Feedback
    }, {
      path: '*',
      component: NotFound
    }
  ]
}
]
