import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'dashboard' }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () =>
        import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
      meta: {
        auth: true,
        layout: 'app'
      }
    },
    {
      path: '/correspondents',
      name: 'correspondents',
      component: () =>
        import(
          /* webpackChunkName: "correspondents" */ './views/Correspondents.vue'
        ),
      meta: {
        auth: true,
        layout: 'app'
      }
    },
    {
      path: '/documents',
      name: 'documents',
      component: () =>
        import(/* webpackChunkName: "documents" */ './views/Documents.vue'),
      meta: {
        auth: true,
        layout: 'app'
      }
    },
    {
      path: '/logs',
      name: 'logs',
      component: () =>
        import(/* webpackChunkName: "logs" */ './views/Logs.vue'),
      meta: {
        auth: true,
        layout: 'app'
      }
    },
    {
      path: '/tags',
      name: 'tags',
      component: () =>
        import(/* webpackChunkName: "tags" */ './views/Tags.vue'),
      meta: {
        auth: true,
        layout: 'app'
      }
    },
    {
      path: '/reminders',
      name: 'reminders',
      component: () =>
        import(/* webpackChunkName: "reminders" */ './views/Reminders.vue'),
      meta: {
        auth: true,
        layout: 'app'
      }
    },

    // Auth
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/Login.vue'),
      props: true,
      meta: {
        auth: false,
        layout: 'standalone'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    // This route requires auth, so we will check if the user is authenticated.
    // If he / she is not, we will redirect to the login page
    if (!store.getters['auth/isAuthenticated']) {
      next({
        name: 'login',
        params: { redirect: to.name }
      })
    } else {
      next()
    }
  } else {
    next() // always call next()
  }
})

export default router
