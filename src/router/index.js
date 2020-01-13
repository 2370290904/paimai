import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import news from '@/pages/news'
import newsdetail from '@/pages/newsdetail'
import aboutUs from '@/pages/aboutUs'
import helpCenter from '@/pages/helpCenter'
import auctionBid from '@/pages/auctionBid'
import purchase from '@/pages/purchase'
import itemBid from '@/pages/itemBid'
import puritem_bid from '@/pages/puritem_bid'
import auctionCompetitive from '@/pages/auctionCompetitive'
import combinedBid from '@/pages/combinedBid'
import goodsDetail from '@/pages/goodsDetail'
import goodsDetail2 from '@/pages/goodsDetail2'
import goodsDetail3 from '@/pages/goodsDetail3'
import goodsDetailGroup from '@/pages/goodsDetailGroup'
import goodsDetailGroup2 from '@/pages/goodsDetailGroup2'
import goodsDetailGroup3 from '@/pages/goodsDetailGroup3'
import uniteList from '@/pages/uniteList'
import uniteDetail from '@/pages/uniteDetail'
import bidList from '@/pages/bidList'
import bid_detail from '@/pages/bid_detail'
import bid_Goodsdetail from '@/pages/bid_Goodsdetail'
import personalCenter from '@/pages/personalCenter'

import forget from '@/pages/forget'
import login from '@/pages/login'
import register from '@/pages/register'
import VueRouter from 'vue-router'

Vue.use(Router)

const routes = [
    { path: '/', name: 'index', component: index },
    { path: '/login', name: 'login', component: login },
    { path: '/register', name: 'register', component: register },
    { path: '/forget', name: 'forget', component: forget },
    { path: '/index', name: 'index', component: index },
    { path: '/news', name: 'news', component: news },
    { path: '/newsdetail', name: 'newsdetail', component: newsdetail },
    { path: '/aboutUs', name: 'aboutUs', component: aboutUs },
    { path: '/helpCenter', name: 'helpCenter', component: helpCenter },
    { path: '/auctionBid', name: 'auctionBid', component: auctionBid },
    { path: '/purchase', name: 'purchase', component: purchase },
    { path: '/itemBid', name: 'itemBid', component: itemBid },
    { path: '/puritem_bid', name: 'puritem_bid', component: puritem_bid },
    { path: '/auctionCompetitive', name: 'auctionCompetitive', component: auctionCompetitive },
    { path: '/combinedBid', name: 'combinedBid', component: combinedBid },
    { path: '/goodsDetail', name: 'goodsDetail', component: goodsDetail },
    { path: '/goodsDetail2', name: 'goodsDetail2', component: goodsDetail2 },
    { path: '/goodsDetail3', name: 'goodsDetail3', component: goodsDetail3 },
    { path: '/goodsDetailGroup', name: 'goodsDetailGroup', component: goodsDetailGroup },
    { path: '/goodsDetailGroup2', name: 'goodsDetailGroup2', component: goodsDetailGroup2 },
    { path: '/goodsDetailGroup3', name: 'goodsDetailGroup3', component: goodsDetailGroup3 },
    { path: '/uniteList', name: 'uniteList', component: uniteList },
    { path: '/uniteDetail', name: 'uniteDetail', component: uniteDetail },
    { path: '/bidList', name: 'bidList', component: bidList },
    { path: '/bid_detail', name: 'bid_detail', component: bid_detail },
    { path: '/bid_Goodsdetail', name: 'bid_Goodsdetail', component: bid_Goodsdetail },
    { path: '/personalCenter', name: 'personalCenter', component: personalCenter },
]
const router = new VueRouter({
    routes
})
export default router
// export default new Router({
//   routes: [
//   { path: '/login',name: 'login',component: login},
//   { path: '/register',name: 'register',component: register},
//   {path: '/forget',name: 'forget',component: forget},
//   {path: '/index',name: 'index',component: index},
//   {path: '/news',name: 'news',component: news},
//   {path: '/newsdetail',name: 'newsdetail',component: newsdetail},
//   {path: '/aboutUs',name: 'aboutUs',component: aboutUs},
//   {path: '/helpCenter',name: 'helpCenter',component: helpCenter},
//   {path: '/auctionBid',name: 'auctionBid',component: auctionBid},
//   {path: '/purchase',name: 'purchase',component: purchase},
//   {path: '/itemBid',name: 'itemBid',component: itemBid},
//   {path: '/puritem_bid',name: 'puritem_bid',component: puritem_bid},
//   {path: '/auctionCompetitive',name: 'auctionCompetitive',component: auctionCompetitive},
//   {path: '/combinedBid',name: 'combinedBid',component: combinedBid},
//   {path: '/goodsDetail',name: 'goodsDetail',component: goodsDetail},
//   {path: '/goodsDetail2',name: 'goodsDetail2',component: goodsDetail2},
//   {path: '/goodsDetail3',name: 'goodsDetail3',component: goodsDetail3},
//   {path: '/goodsDetailGroup',name: 'goodsDetailGroup',component: goodsDetailGroup},
//   {path: '/goodsDetailGroup2',name: 'goodsDetailGroup2',component: goodsDetailGroup2},
//   {path: '/goodsDetailGroup3',name: 'goodsDetailGroup3',component: goodsDetailGroup3},
//   {path: '/uniteList',name: 'uniteList',component: uniteList},
//   {path: '/uniteDetail',name: 'uniteDetail',component: uniteDetail},
//   {path: '/bidList',name: 'bidList',component: bidList},
//   {path: '/bid_detail',name: 'bid_detail',component: bid_detail},
//   {path: '/bid_Goodsdetail',name: 'bid_Goodsdetail',component: bid_Goodsdetail},
//   {path: '/personalCenter',name: 'personalCenter',component: personalCenter},
//   ]
// })