<template>
  <!--导航栏  -->
  <div class="navigationBar">
    <div class="navigationBar_con">
      <img class="logo2" src="@/assets/logo1.png" />
      <div class="city_location">
        <el-cascader style="width:100%;" :options="options" v-model="city" @change="optionsChange"></el-cascader>
      </div>
      <div class="search">
        <input placeholder-class="place" placeholder="请在这里输入你想搜索的关键字" />
        <el-button type="primary">
          <i class="el-icon-search"></i>
        </el-button>
      </div>
      <div class="dispay">
        <!-- <img class="logo3" src="../assets/header.jpeg" /> -->
        <img class="logo3" :src="avatar" />
        <div style="margin-left:20px;">
          <p class="HI">Hi，上午好~</p>
          <p v-if="!token">
            <el-button id="btn" type="primary" @click="to_login">登录</el-button>
            <el-button id="btn" class="register" type="primary" @click="to_register">注册</el-button>
          </p>
          <p v-else>
            <el-button id="btn" @click="quit">退出登录</el-button>
          </p>
        </div>
      </div>
    </div>
    <div class="navigationBar_type">
      <ul class="nav_ul">
        <router-link
          tag="li"
          :class="{active:actives==1}"
          @click="activeq(1)"
          active-class="active"
          to="index"
        >首页</router-link>
        <router-link
          tag="li"
          class="qazwsx"
          :class="{active:actives==2}"
          @click="activeq(2)"
          active-class="active"
          to="purchase"
        >
          拍买
          <span style="font-size:12px">/采购/招标</span>
          <i class="el-icon-arrow-down"></i>
          <!-- 拍买下划菜单-->
          <!-- <div class="menu">
            <ul class="menu_ul">
              <li v-for="(item,index) in listData" :key="index">
                <p>{{item.name}}</p>
                <i class="el-icon-arrow-right"></i>
                <div class="menu2">
                  <p>当前位置：首页 > 明细分类</p>
                  <div class="type" v-for="(item2,index2) in item.children" :key="index2">
                    <label class="co_1C70C5 fon20">{{item2.name}}</label>
                    <el-row :gutter="10">
                      <el-col :span="4" v-for="(item3,index3) in item2.children" :key="index3">
                        <div
                          @click="changeActive(item3,index2,index3)"
                          class="grid-content bg-purple fon14 co_666 margin_t5 sort"
                        >{{item3.name}}</div>
                        <div class="menu3" v-if="show[0]==index2 && show[1]==index3">
                          <p>当前位置：首页 > 明细分类>分类选择</p>
                          <div v-show="paim">
                            <label>拍买</label>
                            <p @click="to_purchase">
                              <i class="el-icon-s-flag co_333"></i>
                              <span class="co_333">发标</span>
                            </p>
                            <p @click="to_bidList">
                              <i class="el-icon-s-flag co_333"></i>
                              <span class="co_333">竞标</span>
                            </p>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </li>
            </ul>
          </div>-->
        </router-link>
        <router-link
          tag="li"
          class="sell"
          :class="{active:actives==3}"
          @click="activeq(3)"
          active-class="active"
          to="auctionBid"
        >
          拍卖
          <i class="el-icon-arrow-down"></i>
          <!-- 拍卖下划菜单 -->
          <!-- <div class="menu">
            <ul class="menu_ul">
              <li v-for="(item,index) in listData" :key="index">
                <p>{{item.name}}</p>
                <i class="el-icon-arrow-right"></i>
                <div class="menu2">
                  <p>当前位置：拍卖 > 明细分类</p>
                  <div class="type" v-for="(item2,index2) in item.children" :key="index2">
                    <label class="co_1C70C5 fon20">{{item2.name}}</label>
                    <el-row :gutter="10">
                      <el-col :span="4" v-for="(item3,index3) in item2.children" :key="index3">
                        <div
                          @click="changeActive(item3,index2,index3)"
                          class="grid-content bg-purple fon14 co_666 margin_t5 sort"
                        >{{item3.name}}</div>
                        <div class="menu3" v-if="show[0]==index2 && show[1]==index3">
                          <p>当前位置：拍卖 > 明细分类>分类选择</p>
                          <div v-show="paim">
                            <label>拍卖</label>
                            <p @click="to_auctionBid">
                              <i class="el-icon-s-flag co_333"></i>
                              <span class="co_333">发标</span>
                            </p>
                            <p @click="to_auctionCompetitive">
                              <i class="el-icon-s-flag co_333"></i>
                              <span class="co_333">竞标</span>
                            </p>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </li>
            </ul>
          </div>-->
        </router-link>
        <router-link
          tag="li"
          :class="{active:actives==4}"
          @click="activeq(4)"
          active-class="active"
          to="news"
        >资讯中心</router-link>
        <router-link
          tag="li"
          :class="{active:actives==5}"
          @click="activeq(5)"
          active-class="active"
          to="aboutUs"
        >关于我们</router-link>
        <router-link
          tag="li"
          :class="{active:actives==6}"
          @click="activeq(6)"
          active-class="active"
          to="helpCenter"
        >帮助中心</router-link>
        <router-link
          tag="li"
          :class="{active:actives==7}"
          @click="activeq(7)"
          active-class="active"
          to="personalCenter"
        >个人中心</router-link>
      </ul>

      <div class="line"></div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { provinceAndCityData } from "element-china-area-data";
export default {
  name: "navigationBar",
  data() {
    return {
      active: "",
      ischange: 0,
      token: localStorage.getItem("token"),
      options: provinceAndCityData,
      city: "",
      scrollTop: false,
      stati: false,
      sericesArr: [],
      avatar: "http://pic.soutu123.cn/element_origin_min_pic/01/54/05/625746fd5b60878.jpg%21/fw/700/quality/90/unsharp/true/compress/true",
      listData: [],
      paim: true,
      paim2: true,
      actives: Number,
      show: false,
      cate_id: ""
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  created() {
    this.getList();
    this.headPortrait();
  },
  methods: {
    getList() {
      this.$ajax
        .post(this.HOST + "/api/index/index", qs.stringify({}), {
          headers: { token: localStorage.getItem("token") }
        })
        .then(response => {
          this.listData = response.data.data;
          // console.log(this.listData);
        })
        .catch((response, error) => {
          this.$message.error(response);
        });
    },
    // 判断是否登录，如果未登陆，使用默认头像
    headPortrait() {
      let headPor = localStorage.getItem("avatar");
      if (headPor) {
        console.log("头像：" + headPor);
        this.avatar = headPor;
      } else {
        console.log("没有登录");
        // this.avatar = "@/assets/timg.jpg";
      }
    },
    optionsChange(value) {
      // 城市
      this.navCity = value.slice(",").pop();
      console.log(this.navCity);
      this.$emit("index_City", this.navCity);
    },
    activeq(index) {
      this.actives = index;
    },
    changeActive($event, index2, index3) {
      this.cate_id = $event.id;
      sessionStorage.setItem("cate_id", this.cate_id);
      console.log($event.id, "event");
      this.show = [index2, index3];
    },
    removeActive($event) {
      this.show = [-1, -1];
    },
    quit() {
      this.$ajax
        .post(this.HOST + "/api/user/logout", qs.stringify({}), {
          headers: { token: localStorage.getItem("token") }
        })
        .then(response => {
          if (response.data.code == 1) {
            this.$message({
              message: response.data.msg,
              offset: 100,
              duration: 2000,
              type: "success"
            });
            // 清空本地数据
            localStorage.clear();
            this.$router.push({ path: "/login" });
          } else {
            this.$message.error(response.data.msg);
          }
        })
        .catch((response, error) => {
          this.$message.error(response);
        });
    },
    to_login() {
      this.$router.push({ path: "/login" });
    },
    to_purchase() {
      this.$router.push({ path: "/purchase" });
    },
    to_bidList() {
      this.$router.push({ path: "/bidList" });
    },
    to_register() {
      this.$router.push({ path: "/register" });
    },
    to_auctionBid() {
      this.$router.push({ path: "/auctionBid" });
    },
    // 拍卖竞标
    to_auctionCompetitive() {
      this.$router.push({ path: "/auctionCompetitive" });
    },
    handleScroll(e) {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 176) {
        this.scrollTop = true;
        this.stati = true;
      } else {
        this.scrollTop = false;
        this.stati = false;
      }
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    }

    // to_auctionBid(index) {
    //   this.$router.push({ path: "/auctionBid", query: { index: index } });
    // },
    // to_auctionCompetitive() {
    //   this.$router.push({ path: "/auctionCompetitive" });
    // }
  }
};
</script>
<style scoped>
.el-input__inner {
  /* border: 0;  */
  border: 1px solid #222222;
}
.el-input--suffix .el-input__inner {
  padding-right: 0px;
}
</style>
<style scoped>
.el-cascader-menu {
  color: #222222;
}
#cascader-menu-3305-0-0 {
  color: #222222;
}
.active {
  color: #f8e03e;
}
.menu {
  display: none;
  position: absolute;
  top: 226px;
  left: 350px;
  z-index: 9;
}
.menu .menu_ul {
  width: 300px;
  height: 402px;
  background: #fff;
  border: 1px solid #1c70c5;
  border-top: 0;
  position: relative;
}
.menu .menu_ul li {
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.menu .menu_ul li:hover {
  color: #1c70c5;
  background: #bfdefd;
}
.menu .menu_ul li:hover > div {
  display: block;
}
.qazwsx:hover .menu {
  display: block;
}
.sell:hover .menu,
.menu2,
.menu3 {
  display: block;
}
.sell .menu {
  position: absolute;
  top: 226px;
  left: 600px;
}
.nav_ul {
  color: #fff;
  display: flex;
  height: 50px;
  line-height: 50px;
  width: 1200px;
  margin: auto;
  justify-content: space-around;
  font-size: 16px;
}
.nav_ul:hover {
  cursor: pointer;
}
.city_location {
  color: #1c70c5;
}
.navigationBar {
  background: #fff;
  font-size: 14px;
}
.navigationBar_con {
  max-width: 1200px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
}
.logo2 {
  width: 50px;
  height: 50px;
}
.logo3 {
  width: 65px;
  height: 65px;
  border-radius: 50%;
}
.dispay {
  display: flex;
  align-items: center;
}
.HI {
  color: #2f2f2f;
  padding: 10px 0;
}
.search {
  position: relative;
}
.search input {
  width: 400px;
  height: 35px;
  border: 2px solid #409eff;
  padding: 0 5px;
}
.search button {
  width: 50px;
  height: 37px;
  border: 0;
  /* background: #1c70c5; */
  position: absolute;
  top: 0;
  right: 0;
}
.headFixed {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 1;
}
.navigationBar_type {
  background: #1c70c5;
}
.register {
  background: #1c70c5 !important;
  border-color: #1c70c5 !important;
}
/* element ui */
#btn {
  width: 83px;
  height: 27px;
  line-height: 27px;
  padding: 0px !important;
}
#btn .el-icon-search {
  color: #fff;
  font-size: 16px;
}

/* #btn.el-button--primary {
  border-color: #3e9bf8;
  background: #3e9bf8;
} */
.el-menu {
  max-width: 1200px;
  margin: auto;
  color: #fff;
  font-size: 18px;
  background: transparent;
}
.el-menu.el-menu--horizontal {
  border-bottom: 0px;
}
.el-menu--horizontal > .el-menu-item {
  color: #fff !important;
}
.el-menu-demo {
  display: flex;
  justify-content: space-between;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  color: #fff !important;
}
.el-submenu__title i {
  color: #fff !important;
}
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: transparent !important;
  color: #f8e03e !important;
}
.son,
.el-menu--popup {
  /* background: #fff !important;
  color: #333 !important; */
  text-align: center;
}

.el-icon-date {
  margin: 0px 5px;
}
.time_screen {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.time_screen li {
  margin: 0 15px;
  color: #666;
  font-size: 18px;
}
.el-row {
  position: initial !important;
}
.sort:hover {
  background: #bfdefd;
  color: #1c70c5;
}

.sort {
  text-align: center;
  padding: 5px;
}
.type {
  margin-top: 10px;
}
.menu2 {
  display: none;
  width: 498px;
  min-height: 402px;
  background: #fff;
  border: 1px solid #1c70c5;
  border-top: 0;
  padding: 0 20px;
  position: absolute;
  box-sizing: border-box;
  top: 0;
  right: 0;
  transform: translateX(100%);
}
.menu3 {
  width: 300px;
  min-height: 402px;
  background: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  border: 1px solid #1c70c5;
  border-top: 0;
  position: absolute;
  top: 0;
  right: 0;
  text-align: left;
  transform: translateX(100%);
}
.menu3 div p:hover {
  background: #bfdefd;
  color: #1c70c5;
}
.menu3 div p span:hover {
  color: #1c70c5;
}
.menu3 div label {
  /* border:1px solid red; */
  display: inline-block;
  padding: 10px 0;
}
.menu3 div p {
  width: 40%;
  text-align: center;
}
.menu2 p {
  color: #999;
  font-size: 12px;
  padding: 10px 0;
  box-sizing: border-box;
}
.menu_ul2 {
  width: 220px;
  border: 1px solid #f2f2f2;
  padding: 0 15px;
  color: #333;
}
.menu_ul2 li span {
  font-size: 20px;
  color: #ccc;
  margin: 0 5px;
}
.menu_ul2 li {
  /* list-style: outside; */
  margin: 15px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.menu_news {
  min-height: 402px;
}
.menu_news ul {
  min-height: 90%;
}
.menu_news p {
  font-size: 14px;
  color: #2f2f2f;
  padding: 10px;
  background: #f2f2f2;
}
.explain {
  max-width: 1200px;
  margin: auto;
  padding: 50px 0;
}
.explain .explain_label {
  color: #333333;
  font-size: 26px;
  letter-spacing: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.explain_con {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0;
}
.explain_con img {
  width: 490px;
  height: 240px;
}
.explain_con p {
  width: 670px;
  color: #333;
  padding-left: 40px;
  line-height: 25px;
  letter-spacing: 2px;
}
.explain_label span:first-of-type {
  display: inline-block;
  background: #1c70c5;
  width: 6px;
  height: 30px;
  margin: 0 15px;
}
p {
  color: #333333;
}
</style>

