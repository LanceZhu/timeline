import Home from '../page/home/index'

import Login from '../page/login/index'

import Timeline from '@/page/timeline/index'
import TimelineDefault from '@/page/timeline/default'
import TimelineView from '@/page/timeline/view'

const Search = () => import('@/page/search/index')

const NotFound = () => import('@/page/404/index')

const TimepointAdd = () => import('@/page/timepoint/add')
const TimepointEdit = () => import('@/page/timepoint/edit')
const TimepointHistory = () => import('@/page/timepoint/history')

const User = () => import('@/page/user/index')

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
      path: 'search',
      name: 'search',
      component: Search
    }, {
      path: '*',
      component: NotFound
    }
  ]
}
]
