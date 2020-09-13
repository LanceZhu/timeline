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

const Discuss = () => import('@/page/discuss/index')
const DiscussList = () => import('@/page/discuss/list')
const DiscussAdd = () => import('@/page/discuss/add')
const DiscussView = () => import('@/page/discuss/view')

export default [{
  path: '/',
  component: Home,
  children: [
    {
      path: '',
      redirect: 'timeline'
    }, {
      path: '/timeline',
      component: Timeline,
      children: [{
        path: '',
        name: 'TimelineDefault',
        component: TimelineDefault
      }, {
        path: 'add',
        name: 'TimepointAdd',
        component: TimepointAdd,
        meta: { requiresAuth: true }
      }, {
        path: ':id',
        name: 'TimelineView',
        component: TimelineView
      }, {
        path: ':id/edit',
        name: 'TimepointEdit',
        component: TimepointEdit,
        meta: { requiresAuth: true }
      }, {
        path: ':id/history',
        name: 'TimepointHistory',
        component: TimepointHistory
      }, {
        path: ':id/history/diff/:id1/:id2',
        name: 'TimepointDiff',
        component: TimepointDiff
      }]
    }, {
      path: '/discuss',
      component: Discuss,
      children: [
        {
          path: '',
          name: 'list',
          component: DiscussList
        }, {
          path: 'add',
          name: 'add',
          component: DiscussAdd,
          meta: { requiresAuth: true }
        }, {
          path: ':id',
          name: 'view',
          component: DiscussView
        }
      ]
    }, {
      path: 'login',
      name: 'login',
      component: Login
    }, {
      path: 'user',
      name: 'User',
      component: User,
      meta: { requiresAuth: true }
    }, {
      path: 'devlog',
      name: 'Devlog',
      component: Devlog
    }, {
      path: 'feedback',
      name: 'Feedback',
      component: Feedback
    }, {
      path: '*',
      component: NotFound
    }
  ]
}
]
