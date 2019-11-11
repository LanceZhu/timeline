import Home from '../page/home/index'

import HelloWorld from '../components/HelloWorld'

import Wikis from '../page/wikis/index'
import Wiki from '@/page/wiki/index'
import WikiView from '@/page/wiki/view'
import WikiAdd from '../page/wiki/add'
import WikiEdit from '@/page/wiki/edit'
import WikiHistory from '@/page/wiki/history'

import Index from '../page/index/index'

import Login from '../page/login/index'

import Timepoint from '../page/timepoint/index'
import TimepointView from '@/page/timepoint/view'
import TimepointAdd from '@/page/timepoint/add'
import TimepointEdit from '@/page/timepoint/edit'
import TimepointHistory from '@/page/timepoint/history'

import User from '@/page/user/index'

import Search from '@/page/search/index'

import NotFound from '@/page/404/index'

import Timeline from '@/page/timeline/index'
import TimelineDefault from '@/page/timeline/default'
import TimelineView from '@/page/timeline/view'

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
        path: ':id',
        name: 'timeline',
        component: TimelineView
      }, {
        path: '/timepoint/edit/:id',
        name: 'timepoint',
        component: TimepointEdit,
        meta: { requiresAuth: true }
      }, {
        path: '/timepoint/add',
        name: 'timepoint',
        component: TimepointAdd,
        meta: { requiresAuth: true }
      }, {
        path: '/timepoint/history/:id',
        name: 'timepoint',
        component: TimepointHistory
      }]
    }, {
      path: 'index',
      name: 'index',
      component: Index
    }, {
      path: 'helloworld',
      name: 'helloworld',
      component: HelloWorld
    }, {
      path: 'wikis',
      name: 'wikis',
      component: Wikis
    }, {
      path: 'wiki',
      name: 'wiki',
      component: Wiki
    }, {
      path: 'wiki/view/:id',
      name: 'wiki',
      component: WikiView
    }, {
      path: 'wiki/add',
      name: 'wiki',
      component: WikiAdd,
      meta: { requiresAuth: true }
    }, {
      path: 'wiki/edit/:id',
      name: 'wiki',
      component: WikiEdit,
      meta: { requiresAuth: true }
    }, {
      path: 'wiki/history/:id',
      name: 'wiki',
      component: WikiHistory
    }, {
      path: 'login',
      name: 'login',
      component: Login
    }, {
      path: 'timepoint',
      name: 'timepoint',
      component: Timepoint
    }, {
      path: 'timepoint/view/:id',
      name: 'timepoint',
      component: TimepointView
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
