<template>
  <!-- 主页 -->
  <div class="auctionCompetitive">
    <navs></navs>
    <navigationBar @index_City="nvCity"></navigationBar>
    <!-- 拍卖-种类选择 -->
    <div class="auctionCompetitive_con">
      <!-- 当前页面位置 -->
      <present :titles="['拍卖','竞标','分类选择','竞标信息列表']"></present>
      <div class="w1200">
        <div class="Competitive_t">
          <p
            v-for="(item,index) in typeList"
            :key="index"
            @click="switchTo(index)"
            :class="index==thisIndex?'this':''"
          >{{item}}</p>
          <!-- 时间筛选 -->
          <ul class="time_screen">
            <li>时间筛选：</li>
            <li>全部</li>
            <li>最近三天</li>
            <li>一周内</li>
            <li>半个月内</li>
            <li>
              自定义
              <i class="el-icon-date"></i>
            </li>
          </ul>
        </div>
        <div class="competitive_list" v-if="thisIndex==0">
          <p class="list_t">
            <span>于：</span>
            <span>A类农、林、牧、渔业>农业类>谷物种植</span>
            <span>分类下，已查询到</span>
            <span>{{this.total}}条</span>
            <span>相关信息</span>
          </p>
          <ul class="list" v-for="(item,index) in contentList" :key="index">
            <li @click="to_goodsDetail(0,item)">
              <div :class="!item.type==true ? 'no_bid':''">
                <p>{{!item.type?'暂未开标':'进行中'}}</p>
                <p>{{item.bid}}人投标</p>
              </div>
              <div>
                <p>
                  <span>{{item.title}}</span>
                </p>
                <p>
                  <span style="margin-right:20px;">编码：{{item.order}}</span>
                  {{!item.type?'距开标':'距结束'}}：{{item.time}}
                </p>
                <p>详细信息：{{item.desc}}</p>
              </div>
            </li>
          </ul>
          <!-- fenye -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <div class="competitive_list" v-if="thisIndex==1">
          <p class="list_t">
            <span>于：</span>
            <span>A类农、林、牧、渔业>农业类>谷物种植</span>
            <span>分类下，已查询到</span>
            <span>{{this.total}}条</span>
            <span>相关信息</span>
          </p>
          <ul class="list" v-for="(item,index) in contentList" :key="index">
            <li @click="to_goodsDetail(0,item)">
              <div :class="!item.type==true ? 'no_bid':''">
                <p>{{!item.type?'暂未开标':'进行中'}}</p>
                <p>{{item.bid}}人投标</p>
              </div>
              <div>
                <p>
                  <span>{{item.title}}</span>
                </p>
                <p>
                  <span style="margin-right:20px;">编码：{{item.order}}</span>
                  {{!item.type?'距开标':'距结束'}}：{{item.time}}
                </p>
                <p>详细信息：{{item.desc}}</p>
              </div>
            </li>
          </ul>
          <!-- fenye -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--自动匹配 -->
    <div class="self_motion" @click="tanchuang">
      <i class="el-icon-s-platform"></i>
      <p class="fon12">预设自动匹配</p>
    </div>
    <!-- 弹窗 -->
    <!-- 弹窗 -->
    <div class="pop_up" v-if="show==true">
      <div class="pop_upCon">
        <i @click="show=false" class="el-icon-close fon20" style="width: 100%;text-align:right"></i>
        <p style="text-align:center;">- 预设自动匹配-</p>
        <p class="other_p">
          <span style="padding:10px 0;display: inherit;text-align: left;">选择分类</span>
          <el-select v-model="value" placeholder="选择商品分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="value" placeholder="选择明细分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p>
          <span style="padding:10px 0;display: inherit;text-align: left;">预设价格：</span>
          <el-input v-model="input" placeholder="例：￥5000.00 - 8000.00"></el-input>
        </p>
        <p>
          <span style="padding:10px 0;display: inherit;text-align: left;">匹配时间：</span>
          <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>&nbsp;-
          <el-time-select
            v-model="value"
            :picker-options="{ start: '08:30',step: '00:15',end: '18:30'}"
            placeholder="选择时间"
          ></el-time-select>
        </p>
        <p>
          <span style="padding:10px 0;display: inherit;text-align: left;">截止时间：</span>
          <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>&nbsp;-
          <el-time-select
            v-model="value"
            :picker-options="{ start: '08:30',step: '00:15',end: '18:30'}"
            placeholder="选择时间"
          ></el-time-select>
        </p>
        <p>
          <span style="padding:10px 0;display: inherit;text-align: left;">地址：</span>
          <el-cascader v-model="address" :options="options2" @change="handleChange"></el-cascader>
        </p>
        <el-button style="background:#1C70C5;color:#fff;">自动匹配</el-button>
        <el-button @click="show=false">取消</el-button>
      </div>
    </div>
    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>
<script>
import present from "../components/present";
import bottoms from "../components/bottoms";
import navs from "../components/navs";
import navigationBar from "../components/navigationBar";
import contentListParse from "../js/contentListParse.js";
import qs from "qs";
export default {
  name: "auctionCompetitive",
  components: {
    bottoms,
    present,
    navigationBar,
    navs
  },
  data() {
    return {
      city: 110100,
      input: "",
      date: "",
      address: [],
      activeName: "first",
      thisIndex: 1,
      show: false,
      options2: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      typeList: ["求报价", "求商品详情"],
      contentList: [],
      page: 1,
      rows: 10,
      total: 0,
      page2: 1,
      rows2: 10,
      total2: 0,
      timeGo: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$ajax
        .post(
          this.HOST + "/api/index/qutebidlistall",
          qs.stringify({
            cate_id: sessionStorage.getItem("cate_id"),
            type: this.thisIndex,
            city: this.city,
            page: this.thisIndex == 0 ? this.page : this.page2,
            rows: this.thisIndex == 0 ? this.rows : this.rows2
          }),
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(response => {
          console.log(response)
          let contentList = response.data.data.list;
          this.total = response.data.data.total;

          if (contentList) {
            clearInterval(this.timeGo);
            this.timeGo = setInterval(() => {
              this.contentList = contentListParse(contentList);
            }, 1000);
          }
        })
        .catch((response, error) => {
          this.$message.error(response);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`); //分页
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`); //分页
    },
    handleCurrentChange2(val) {
      this.page2 = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
    nvCity(ev) {
      console.log(ev, "页面获取城市code");
      this.city = ev;
      this.getList();
    },
    switchTo(index) {
      this.thisIndex = index;
      this.getList();
      console.log(this.thisIndex, "thisIndex");
    },
    tanchuang() {
      this.show = true;
    },
    to_goodsDetail(index, item) {
      let id = item.id;
      console.log(index,"列表id");
      if (item.type != 1) {
        this.$message({
          message: "暂未开标",
          offset: 100,
          duration: 2000,
          type: "warning"
        });
      }else{ 
         this.$router.push({ path: "/bid_detail?id=" + id + "&type="+this.thisIndex });
      }
     
    },
    to_goodsDetailGroup() {
      this.$router.push({ path: "/bid_Goodsdetail" });
    }
  }
};
</script>
<style>
.self_motion {
  width: 90px;
  height: 90px;
  color: #fff;
  position: fixed;
  box-shadow: 0px 0px 0px 0px rgba(196, 196, 196, 0.65);
  top: 50%;
  right: 0;
  background: #3e9bf8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.self_motion p {
  margin: 10px 0;
}
.self_motion i {
  font-size: 32px;
}
.time_screen {
  margin: auto;
  display: flex;
  justify-content: center;
}
.time_screen li {
  margin: 0 15px;
  color: #666;
  font-size: 18px;
}
.el-pagination {
  text-align: center;
  margin: 50px 0;
}
</style>

<style scoped>
.el-cascader {
  width: 100%;
}
.el-select {
  width: 49%;
}
.pop_upCon p:nth-of-type(3) input {
  background: #ebebeb;
  border: 0;
  padding: 10px;
}
.pop_upCon p:nth-of-type(3),
.pop_upCon p:nth-of-type(4) {
  text-align: left;
}
.pop_upCon p {
  margin: 15px 0;
}
.pop_upCon {
  width: 30%;
  background: #fff;
  color: #333;
  padding: 20px 50px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 6px;
}
.pop_up {
  position: fixed;
  background: rgba(182, 182, 182, 0.6);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.w1200 {
  max-width: 1200px;
  margin: auto;
  padding: 40px 0;
}
.Competitive_t {
  width: 100%;
  display: flex;
  justify-content: center;
}
.Competitive_t p {
  width: 160px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
}
.this {
  color: #fff !important;
  background: #1c70c5 !important;
  border: 1px solid #1c70c5 !important;
}
.Competitive_t p {
  color: #333333;
  border: 1px solid rgba(153, 153, 153, 1);
}
.list_t {
  font-size: 14px;
  color: #999;
  padding-top: 50px;
  padding-bottom: 10px;
}
.list_t span:nth-of-type(2) {
  display: inline-block;
  color: #333333;
}
.list_t span:nth-of-type(4) {
  display: inline-block;
  color: #f83e3e;
}
.list li {
  display: flex;
  border-top: 1px solid #e3e3e3;
}
.list li div:first-of-type {
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1c70c5;
  text-align: center;
  color: #fff;
}
.no_bid {
  background: #ebebeb !important;
  color: #999999 !important;
}
.list li div:first-of-type p:first-of-type {
  font-size: 20px;
}
.list li div:first-of-type p:last-of-type {
  font-size: 14px;
  padding: 5px 0;
}
.list li div:last-of-type {
  padding: 20px;
}
.list li div:last-of-type p:first-of-type span:last-of-type {
  color: #f83e3e;
  font-size: 20px;
}
.list li div:last-of-type p:nth-of-type(2) {
  padding: 7px 0;
}
.list li div:last-of-type p:nth-of-type(2),
.list li div:last-of-type p:last-of-type {
  color: #999999;
  font-size: 14px;
}
</style>



