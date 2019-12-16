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
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [{
      path: "/home",
      name: "home",
      component: () => import("@/views/home/index"),
      meta: {
        title: "首页",
        icon: "dashboard"
      }
    }]
  }, {
    path: "/shop",
    component: Layout,
    redirect: "/shop/index",
    meta: {
      title: "店铺管理",
      icon: "shop"
    },
    children: [{
        path: "index",
        name: "index",
        component: () => import("@/views/shopSystem/index"),
        meta: {
          title: "店铺信息"
        }
      }, {
        path: "addDealis",
        name: "addDealis",
        hidden: true,
        component: () => import("@/views/shopSystem/addDealis"),
        meta: {
          title: "修改店铺信息"
        }
      }, {
        path: "clafiyList",
        name: "clafiyList",
        component: () => import("@/views/shopSystem/clafiyList"),
        meta: {
          title: "店铺分类"
        }
      }, {
        path: "addClfiy",
        name: "addClfiy",
        hidden: true,
        component: () => import("@/views/shopSystem/addClfiy"),
        meta: {
          title: "添加店铺分类"
        }
      }, {
        path: "goodsClassify",
        name: "goodsClassify",
        component: () => import("@/views/shopSystem/goodsClassify"),
        meta: {
          title: "商品归类"
        }
      }, {
        path: "freightList",
        name: "freightList",
        component: () => import("@/views/shopSystem/freightList"),
        meta: {
          title: "物流工具"
        }
      }, {
        path: "addFreight",
        name: "addFreight",
        hidden: true,
        component: () => import("@/views/shopSystem/addFreight"),
        meta: {
          title: "添加运费模板"
        }
      }
      //  {
      //   path: "shopStrategy",
      //   name: "shopStrategy",
      //   component: () => import("@/views/shopSystem/shopStrategy"),
      //   meta: {
      //     title: "商店策略"
      //   }
      // }
    ]
  }, {
    path: "/goodSystem",
    component: Layout,
    redirect: "/goodSystem/goodList",
    meta: {
      title: "商品管理",
      icon: "goods"
    },
    children: [{
        path: "goodList",
        name: "goodList",
        component: () => import("@/views/goodSystem/goodList"),
        meta: {
          title: "商品列表"
        }
      },
      {
        path: "addGoods",
        name: "addGoods",
        component: () => import("@/views/goodSystem/addGoods"),
        meta: {
          title: "添加商品",
          keepAlive: true
        }
      },
      {
        path: "goodsRecycle",
        name: "goodsRecycle",
        component: () => import("@/views/goodSystem/goodsRecycle"),
        meta: {
          title: "商品回收站"
        }
      }
    ]
  }, {
    path: "/orderSystem",
    component: Layout,
    redirect: "/orderSystem/orderIndex",
    meta: {
      title: "订单管理",
      icon: "order"
    },
    children: [{
        path: "orderIndex",
        name: "orderIndex",
        component: () => import("@/views/orderSystem/index"),
        meta: {
          title: "订单管理"
        }
      },
      {
        path: "goodsEvaluation",
        name: "goodsEvaluation",
        component: () => import("@/views/orderSystem/goodsEvaluation"),
        meta: {
          title: "商品评价"
        }
      },
      {
        path: "lookOrder",
        name: "lookOrder",
        component: () => import("@/views/orderSystem/lookOrder"),
        meta: {
          title: "查看订单"
        },
        hidden: true
      }
    ]
  }, {
    path: "/marketSystem",
    component: Layout,
    redirect: "/marketSystem/marketIndex",
    meta: {
      title: "营销管理",
      icon: "marketing"
    },
    children: [{
      path: "marketIndex",
      name: "marketIndex",
      component: () => import("@/views/marketSystem/index"),
      meta: {
        title: "营销活动"
      }
    }, {

      path: "addMarket",
      name: "addMarket",
      hidden: true,
      component: () => import("@/views/marketSystem/addMarket"),
      meta: {
        title: "添加策略"
      }
    }]
  }, {
    path: "/saleSystem",
    component: Layout,
    redirect: "/saleSystem/saleIndex",
    meta: {
      title: "售后管理",
      icon: "sale"
    },
    children: [{
      path: "saleIndex",
      name: "saleIndex",
      component: () => import("@/views/saleSystem/index"),
      meta: {
        title: "售后管理"
      }
    }, {
      path: "lookSale",
      name: "lookSale",
      component: () => import("@/views/saleSystem/lookSale"),
      meta: {
        title: "售后处理"
      },
      hidden: true

    }]
  }, {
    path: "/moneySystem",
    component: Layout,
    redirect: "/moneySystem/moneyIndex",
    meta: {
      title: "财务管理",
      icon: "money"
    },
    children: [{
      path: "moneyIndex",
      name: "moneyIndex",
      component: () => import("@/views/moneySystem/index"),
      meta: {
        title: "财务管理"
      }
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'example'
  //   },
  //   children: [{
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: {
  //         title: 'Table',
  //         icon: 'table'
  //       }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: {
  //         title: 'Tree',
  //         icon: 'tree'
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     name: 'Form',
  //     component: () => import('@/views/form/index'),
  //     meta: {
  //       title: 'Form',
  //       icon: 'form'
  //     }
  //   }]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [{
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: {
  //         title: 'Menu1'
  //       },
  //       children: [{
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: {
  //             title: 'Menu1-1'
  //           }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: {
  //             title: 'Menu1-2'
  //           },
  //           children: [{
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: {
  //                 title: 'Menu1-2-1'
  //               }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: {
  //                 title: 'Menu1-2-2'
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: {
  //             title: 'Menu1-3'
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: {
  //         title: 'menu2'
  //       }
  //     }
  //   ]
  // },

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
