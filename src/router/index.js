import Vue from "vue";
import VueRouter from "vue-router";

import { loadweb3, userBaseMes } from "@/utils/web3";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
    name: "init",
  },
  {
    path: "/index",
    name: "index",
    redirect: {
      name: "nft_home",
    },
    component: () => import("@/views/home"),
    children: [
      {
        path: "nft_home",
        name: "nft_home",
        component: () => import("@/components/ChooseWay/nft_home"),
      },
      {
        path: "mynft_list",
        name: "mynft_list",
        component: () => import("@/components/ChooseWay/myNFT_card.vue"),
      },
      {
        path: "buy_blindbox",
        name: "buy_blindbox",
        component: () => import("@/components/ChooseWay/buy_blindbox.vue"),
      },
      {
        path: "CurrencyTrading",
        name: "CurrencyTrading", // 货币购买页面
        component: () => import("@/components/ChooseWay"),
      },
      // 个人信息页面 往下
      {
        path: "userInfo",
        name: "userInfo",
        component: () => import("@/components/Nav/right"),
      },
    ],
  },
  {
    path: "/login", //登录
    name: "login",
    component: () => import("@/views/login"),
  },
  {
		path: '/rank_card',
		name: 'rank_card',
		component: () => import('@/components/ChooseWay/rank_card.vue')
	},
  {
		path: '/synthesis_page',
		name: 'synthesis_page',
		component: () => import('@/components/ChooseWay/synthesis_page.vue')
	},
  {
    path: "/hvae_card",
    name: "hvae_card",
    component: () => import("@/components/ChooseWay/hvae_card.vue"),
  },
  {
		path: '/look_all',
		name: 'look_all',
		component: () => import('@/components/ChooseWay/look_all.vue')
	},
  {
    path: "/card_details",
    name: "card_details",
    component: () => import("@/components/ChooseWay/card_details.vue"),
  },
  {
		path: '/order_page',
		name: 'order_page',
		component: () => import('@/components/ChooseWay/order_page.vue')
	},
  {
    path: "/404",
    component: () => import("@/components/NotFound"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const payWhitelist = [
  "order-pay",
  "CompleteOrderPayment",
  "awaitSellerAffirm",
  "outflows-currency",
  "Payment-details",
];

const rightMenu_Whitelist = [
  // "share",
  "pledge",
  "arbitration",
  "arbitrator",
  // "focus",
  // "feedback",
];

const originalReplace = VueRouter.prototype.replace;

VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => {});
};

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {});
};

const router = new VueRouter({
  routes,
});

// function valid_identity(next){

//     return next()
// }

router.beforeEach((to, form, next) => {
  if (to.name === "nft_home" || to.name === "CurrencyTrading") {
    loadweb3(userBaseMes);
    next();
  }
  next();
});

export default router;
