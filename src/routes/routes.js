import home from '../page/home/home'
import helloWorld from '../components/HelloWorld'
import timeline from '../page/timeline/timeline'
import wikis from '../page/wikis/wikis'
import wikiCreate from '../page/wiki/create'
import index from '../page/index/index'
import login from '../page/login/login'

export default [{
    path: '/',
    component: home,
    children: [
        {
            path: '/index',
            component: index
        },{
            path: '/helloworld',
            component: helloWorld
        },{
            path: '/timeline',
            component: timeline
        },{
            path: '/wikis',
            component: wikis
        },{
            path: '/wikiCreate',
            component: wikiCreate
        },{
            path: '/login',
            component: login
        }
    ]
},
]
