import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {
        title: '首页',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/goods',
    meta: {
      title: '商城管理',
      icon: 'dashboard'
    },
    children: [{
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/blank.vue'),
        meta: {
          title: '商品管理',
        },
        children: [{
          path: 'goodsList',
          name: 'goodsList',
          component: () => import('@/views/shop/goods/index.vue'),
          meta: {
            title: '商品列表',
          }
        }, {
          path: 'addGoods',
          name: 'addGoods',
          component: () => import('@/views/shop/goods/addGoods'),
          meta: {
            title: '添加商品',
          }
        }]
      },
      {
        path: 'classFiy',
        name: 'classFiy',
        component: () => import('@/views/blank.vue'),
        meta: {
          title: '分类管理',
        },
        children: [{
          path: 'classFiyList',
          name: 'classFiyList',
          component: () => import('@/views/shop/classFiy/index'),
          meta: {
            title: '分类列表',
          }
        }, {
          path: 'addFiy',
          name: 'addFiy',
          hidden: true,
          component: () => import('@/views/shop/classFiy/addFiy'),
          meta: {
            title: '添加分类',
          }
        }]
      }, {
        path: 'article',
        name: 'article',
        component: () => import('@/views/blank.vue'),
        meta: {
          title: '文章管理',
        },
        children: [{
          path: 'articleList',
          name: 'articleList',
          component: () => import('@/views/shop/article/index'),
          meta: {
            title: '文章列表',
          }
        }, {
          path: 'articleFiy',
          name: 'articleFiy',
          component: () => import('@/views/shop/article/articleFiy'),
          meta: {
            title: '文章分类',
          }
        }]
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/orederIndex',
    children: [{
      path: 'orederIndex',
      name: 'orederIndex',
      component: () => import('@/views/order/index'),
      meta: {
        title: '订单管理',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userIndex',
    meta: {
      title: '用户管理',
      icon: 'dashboard'
    },
    children: [{
      path: 'userIndex',
      name: 'userIndex',
      component: () => import('@/views/user/index'),
      meta: {
        title: '用户管理',
      }
    }, {
      path: 'etditUser',
      name: 'etditUser',
      hidden: true,
      component: () => import('@/views/user/edit'),
      meta: {
        title: '查看用户',
      }
    }]
  },
  {
    path: '/distributor',
    component: Layout,
    redirect: '/distributor/butor_Index',
    meta: {
      title: '供应商管理',
      icon: 'dashboard'
    },
    children: [{
      path: 'butor_Index',
      name: 'butor_Index',
      component: () => import('@/views/distributor/index'),
      meta: {
        title: '供应商列表',
      }
    }, {
      path: 'add_butor',
      name: 'add_butor',
      component: () => import('@/views/distributor/add_butor'),
      meta: {
        title: '供应商注册',
      }
    }]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
