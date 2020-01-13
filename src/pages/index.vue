<template>
  <!-- 主页 -->
  <div class="index">
    <navs></navs>
    <navigationBar @index_sericesArr="childValue"></navigationBar>
    <!-- 菜单 -->
    <div class="menu flex">
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
                  <!-- 3 -->
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
                    <div v-show="paim2">
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
                  <!-- 3 -->
                </el-col>
              </el-row>
            </div>
          </div>
        </li>
      </ul>
      <img class="menu_center" src="@/assets/index.png" />
      <div class="menu_news">
        <p>最新资讯</p>
        <ul class="menu_ul2">
          <li>
            <span>·</span>
            <a href="javascript:;" @click="tozx()">遵义市南环东路超人广告经营部</a>
          </li>
          <li>
            <span>·</span>
            <a href="javascript:;" @click="tozx()">南昌市昌盛服务中心</a>
          </li>
          <li>
            <span>·</span>
            <a href="javascript:;" @click="tozx()">遵义市南环东路超人广告经营部</a>
          </li>
          <li>
            <span>·</span>
            <a href="javascript:;" @click="tozx()">南昌市昌盛服务中心</a>
          </li>
          <li>
            <span>·</span>
            <a href="javascript:;" @click="tozx()">子龙家装有限公司</a>
          </li>
          <li>
            <span>·</span>
            <a href="javascript:;" @click="tozx()">唐山市卓展科技有限公司</a>
          </li>
          <li>
            <span>·</span>
            <a href="javascript:;" @click="tozx()">子龙家装有限公司</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 时间筛选 -->
    <ul class="time_screen">
      <li>时间筛选：</li>
      <li>全部</li>
      <li>最近三天</li>
      <li>一周内</li>
      <li>半个月内</li>
      <li>
        自定义
        <el-date-picker align="right" type="date"></el-date-picker>
      </li>
    </ul>
    <!-- 说明 -->
    <div class="explain">
      <p class="explain_label">
        <span></span>
        <span>拍买拍卖平台说明</span>
      </p>
      <div class="explain_con">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563012361079&di=1c911db4901a657bde196778d1e34d47&imgtype=jpg&src=http%3A%2F%2Fwww.qqma.com%2Fimgpic%2Fcpimagenew%2F2014%2F09%2F13%2F13-18049908-17818.jpg"
        />
        <p>
          拍买拍卖行业协会，成立于2019年10月，现有会员单位266家，其中理事单位66家，
          常务理事22名。会员企业占全省拍卖企业总数的90%以上，其拍卖成交额占全省拍卖业成交总额的99%以上。
          浙拍协是由全省拍卖企业及有关企事业单位、社会团体和相关个人自愿结成的全省性、非营利的行业组织，具有社会团体法人资格。
          注册地点：广东省深圳市。是中国社会组织评估等级5A级单位。
          拍买拍卖行业协会，成立于2019年10月，现有会员单位266家，其中理事单位66家，
          常务理事22名。会员企业占全省拍卖企业总数的90%以上，其拍卖成交额占全省拍卖业成交总额的99%以上。
          浙拍协是由全省拍卖企业及有关企事业单位、社会团体和相关个人自愿结成的全省性、非营利的行业组织，具有社会团体法人资格。
          注册地点：广东省深圳市。是中国社会组织评估等级5A级单位。
        </p>
      </div>
    </div>
    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>
<script>
import bottoms from "../components/bottoms";
import qs from "qs";
import navs from "../components/navs";
import navigationBar from "../components/navigationBar";

export default {
  name: "index",
  components: {
    bottoms,
    navigationBar,
    navs
  },
  data() {
    return {
      show: false,
      paim: true,
      paim2: true,
      listData: [],
      listchildren: [],
      listchild: [],
      cate_id: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取菜单id
    getmenu(item3) {
      console.log(item3, "item3333333333333");
    },
    getList() {
      this.$ajax
        .post(this.HOST + "/api/index/index", qs.stringify({}), {
          headers: { token: localStorage.getItem("token") }
        })
        .then(response => {
          this.listData = response.data.data;
          console.log(this.listData);
        })
        .catch((response, error) => {
          this.$message.error(response);
        });
    },
    childValue(ev) {
      if (ev == 1) {
        this.paim2 = false;
      } else {
        this.paim2 = true;
      }
      if (ev == 2) {
        this.paim = false;
      } else {
        this.paim = true;
      }
    },
    // 鼠标移入加入class
    changeActive($event, index2, index3) {
      this.cate_id = $event.id;
      sessionStorage.setItem("cate_id", this.cate_id);
      console.log($event.id, "event");
      this.show = [index2, index3];
    },
    removeActive($event) {
      this.show = [-1, -1];
    },
    //跳转资讯页面
    tozx() {
      this.$router.push({ path: "/newsdetail" });
    },
    // 拍买发标
    to_purchase() {
      this.$router.push({ path: "/purchase" });
    },
    // 拍买竞标
    to_bidList() {
      this.$router.push({ path: "/bidList" });
    },
    // 拍卖发标
    to_auctionBid() {
      this.$router.push({ path: "/auctionBid" });
    },
    // 拍卖竞标
    to_auctionCompetitive() {
      this.$router.push({ path: "/auctionCompetitive" });
    }
  }
};
</script>
<style scoped>
.time_screen >>> .el-input__inner {
  display: none;
}

.time_screen >>> .el-input__inner,
.el-checkbox__inner,
.el-textarea__inner,
.el-button {
  display: inline-block;
  border: 0px;
  padding-left: 0;
  padding-bottom: 10px;
  width: 0;
}
.time_screen >>> .el-input__prefix {
  left: 25px;
  top: -5px;
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
a {
  color: #666;
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
.menu {
  max-width: 1200px;
  margin: auto;
  color: #333;
}
.menu .menu_ul {
  width: 300px;
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
.menu ul li i:hover {
  color: #1c70c5;
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
</style>



