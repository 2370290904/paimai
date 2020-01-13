<template>
  <!-- 拍买 -->
  <!-- 发标+求报价+联合竞标+联合列表-详情 -->
  <div class="goodsDetailGroup">
    <navs></navs>
    <navigationBar></navigationBar>
    <!-- 拍卖-种类选择 -->
    <div class="goodsDetailGroup_con">
      <!-- 当前页面位置 -->
      <present :titles="['拍买','竞标','分类选择','商品列表','发标详情']"></present>
      <div class="w1200">
        <div class="up">
          <!-- goods -->
          <div class="goods">
            <p class="goods_one">
              <span>{{detailList.title}}</span>
               <!-- is_bid_unite==1 可联合竞标 -->
              <img v-if="detailList.is_bid_unite==1" style="margin:0 10px;" src="../assets/goods_ico2.png" />
              <img v-else style="margin:0 10px;" src="../assets/goods_ico1.png" />

              <!-- is_bid_unite==1 可联合采购 -->
              <img v-if="detailList.is_unite==1" style="margin:0 10px;" src="../assets/no_purchase.png" />
              <img v-else style="margin:0 10px;" src="../assets/no_purchase.png" />

            </p>
            <p v-if="end==false" class="goods_two">
              <span>距结束</span>
              <span>{{detailList.endtime}}</span>
              <span>{{detailList.province}}{{detailList.city}}{{detailList.district}}</span>
            </p>
            <p v-else style="margin:20px 0;color:#aaa;font-size:22px;">已结束</p>
            <p class="goods_txt">{{detailList.desc}}</p>
            <!-- 人数 -->
            <p class="unite_num">
              <span>联合人数上限</span>
              <span>{{detailList.unite_people_num}}</span>
            </p>

            <!-- slide -->
            <div class="slide">
              <div class="slide_div">
                <i class="el-icon-arrow-left"></i>
                <img v-for="(item,index) in detailimg" :key="index" :src="item" />
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <!-- 人数列表 -->
            <div class="numList">
              <label>联合发标列表</label>
              <ul>
                <li class="flex" v-for="(item,index) in quteuser" :key="index">
                  <p class="flex align-items">
                    <img :src="item.useravatar" />
                    <span style="margin-left:20px;">{{item.nickname}}</span>
                  </p>
                  <p class="co_F83E3E">{{item.qu_num}}/件</p>
                  <p class="co_666">地址：{{item.qu_province}}  {{item.qu_city}}  {{item.qu_district}}</p>
                </li>
              </ul>
            </div>
            <el-button @click="join" :style="end==false ? '':'background: #e3e3e3;'">
              <i class="el-icon-s-flag"></i>参与联合
            </el-button>
          </div>
        </div>
        <!-- 附件 -->
        <div class="accessory">
          <p class="accessory_tit">
            <span class="flex1">附件</span>
            <span class="flex1">操作</span>
          </p>
           <p v-if="fileList.length==0" style="text-align:center;margin:20px;color:#aaa;">暂无附件</p>
          <ul v-else v-for="(item,index) in fileList" :key="index">
            <li>
              <p class="flex1">
                <span>
                  附件{{index+1}}：<i class="el-icon-files"></i>
                </span>
                <!-- <span>123.doc</span> -->
              </p>
              <p class="flex1">
                <span class="xiazai" @click="download">下载</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="pop_up" v-if="show==true">
      <div class="pop_upCon">
        <i @click="show=false" class="el-icon-close fon20" style="width: 100%;text-align:right"></i>
        <p style="text-align:center;">- 联合信息-</p>
        <p class="other_p">
          <span class="other_span" style="padding-right:20px;">采购数量：</span>
          <el-input-number
            style="border:1px solid #D0D0D0"
            v-model="num"
            controls-position="right"
            :min="1"
            :step="1"
          ></el-input-number>
        </p>
        <p>
          <span style="padding-right:20px;">总&nbsp;预&nbsp;算：</span>
          <input v-model="budget" placeholder="例：￥5000.00" />
        </p>
        <p class="co_333">
          <span style="padding-right:15px;">收货地址：</span>
          <el-cascader
            style="width:60%"
            size="large"
            :options="options"
            v-model="addres"
            @change="handleChange"
          ></el-cascader>
        </p>
        <el-button @click="tackUnite">确认联合</el-button>
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
import {regionData,CodeToText} from "element-china-area-data";
import qs from "qs";
export default {
  name: "goodsDetailGroup",
  components: {
    bottoms,
    present,
    navigationBar,
    navs
  },
  data() {
    return {
      num: 1,
      budget: "",
      num2: 1500,
      show: false,
      detailList: [],
      quteuser: [],
      detailimg: [],
      fileList: [],
      end: false,
      applyList: [
      ],
      options: regionData,
      addres: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    download() {
      window.open(this.fileList);
    },
    // 省市区
    handleChange(value) {
      this.province = value[0];
      this.city = value[1];
      this.district = value[2];
    },
    //参与联合
    tackUnite() {
      this.$ajax
        .post(
          this.HOST + "/api/index/addquote",
          qs.stringify({
            quote_id: this.$route.query.id,
            num: this.num,
            budget: this.budget,
            province: this.province,
            city: this.city,
            district: this.district
          }),
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(response => {
          if (response.data.code == 1) {
            this.$message({
              message: response.data.msg,
              offset: 100,
              duration: 2000,
              type: "success"
            });
            this.$router.push({ path: "/index" });
          } else {
            this.$message.error(response.data.msg);
          }
        })
        .catch((response, error) => {
          this.$message.error(response);
        });
    },
    //获取详情数据
    getList() {
      this.$ajax
        .post(
          this.HOST + "/api/index/quotedetail",
          qs.stringify({
            id: this.$route.query.id
          }),
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(response => {
          this.detailList = response.data.data;
          this.quteuser = this.detailList.quteuser;
          this.EndTime = new Date(this.detailList.endtime * 1000);
          this.getDistanceSpecifiedTime(); //数据到位了，接口调完了，再调用
    
          this.detailList.province = CodeToText[this.detailList.province];
          this.detailList.city = CodeToText[this.detailList.city];
          this.detailList.district = CodeToText[this.detailList.district];
  
          if (response.data.data.files != "") {
            this.fileList = ("http://paimai.9151cc.com" + response.data.data.files).split(",");
          }
          this.detailimg = ("http://paimai.9151cc.com" + response.data.data.images).split(",");
          console.log(response.data.data.files);
        })
        .catch((response, error) => {
          this.$message.error(response);
        });
    },
     //倒计时
    getDistanceSpecifiedTime() {
      //指定日期时间
      var EndTime = this.EndTime;
      // 当前系统时间
      var NowTime = new Date();
      var t = EndTime.getTime() - NowTime.getTime();
      var d = Math.floor(t / 1000 / 60 / 60 / 24);
      var h = Math.floor((t / 1000 / 60 / 60) % 24);
      var m = Math.floor((t / 1000 / 60) % 60);
      var s = Math.floor((t / 1000) % 60);
      var html = d + " 天" + h + " 时" + m + " 分" + s + " 秒";
      this.detailList.endtime = html;
      clearInterval(this.setInterval);
      this.setInterval = setInterval(() => {
        if (t > 0) {
          this.getDistanceSpecifiedTime();
          this.end = false;
        } else {
          clearInterval(this.setInterval);
          this.end = true;
        }
        this.getDistanceSpecifiedTime();
      }, 1000);
    },
    join() {
      if (this.end == false) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }
};
</script>
<style scoped>
.el-input__inner {
  border: 0 !important;
}
.el-input-number.is-controls-right .el-input-number__increase {
  border-radius: 0;
}
</style>

<style scoped>
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
.numList img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.numList ul {
  width: 540px;
  background: #f4f4f4;
  margin-top: 20px;
  color: #333;
}
.numList ul li {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}
.numList ul li p:nth-of-type(2) {
  margin: 0 40px;
}
.numList {
  margin: 10px 0;
  font-size: 14px;
}
.numList label {
  color: #333;
}
.unite_num {
  width: 200px;
  height: 40px;
  line-height: 40px;
  color: #333333;
  text-align: center;
  font-size: 14px;
  background: #f4f4f4;
  margin-top: 20px;
}
.w1200 {
  max-width: 1200px;
  margin: auto;
  /* display: flex; */
  justify-content: space-between;
  padding: 30px 0;
  /* border:1px solid red; */
}
.up {
  display: flex;
  justify-content: space-between;
  /* border:1px solid wheat; */
}
.goods {
  width: 1200px;
  border: 1px solid #e3e3e3;
  padding: 30px 50px;
  box-sizing: border-box;
  letter-spacing: 1px;
}
.goods .goods_one {
  color: #3a3a3a;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.goods_one span:first-of-type,
.goods_one span:nth-of-type(2) {
  font-size: 22px;
}
.goods_two {
  padding: 15px 0;
}
.goods_two span:first-of-type {
  color: #333333;
  font-size: 14px;
  font-weight: bold;
}
.goods_two span:nth-of-type(2) {
  color: #f83e3e;
  font-size: 18px;
  font-weight: bold;
  padding: 0 10px;
}
.goods_two span:last-of-type {
  color: #666666;
  font-size: 12px;
}
.goods_txt {
  width: 654px;
  color: #999999;
  font-size: 12px;
}
.slide {
  width: 420px;
  overflow: auto;
  padding: 20px;
  margin-top: 30px;
  box-sizing: border-box;
}
.slide_div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.slide_p {
  margin-top: 20px;
  padding: 9px;
  display: flex;
  align-items: center;
  background: #f4f4f4;
  box-sizing: border-box;
}
.slide_p span:first-of-type {
  color: #333;
}
.slide_p .slide_price {
  color: #f83e3e;
  font-size: 20px;
}
.slide_p .slide_span {
  padding: 5px 10px;
  font-size: 12px;
  color: #333;
  border: 1px solid #d0d0d0;
  background: #fff;
  margin: 0 20px;
}
.slide_span span {
  display: block;
}
.slide_p span {
  color: #333;
}
.slide_div img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.el-icon-arrow-left,
.el-icon-arrow-right {
  font-size: 26px;
  font-weight: 600;
  color: #acacac;
}
.el-input {
  width: 30%;
  margin-top: 30px;
}
.el-button {
  background: #1c70c5;
  color: #fff;
  border: 0;
  margin-top: 10px;
}
.apply {
  width: 290px;
  box-sizing: border-box;
}
.apply_div {
  border: 1px solid #e3e3e3;
  letter-spacing: 1px;
}
.apply_ps {
  padding: 10px 0;
}
.apply_ps p {
  color: #666666;
  font-size: 12px;
  padding: 5px 20px;
  box-sizing: border-box;
}
.apply_ul {
  margin-top: 15px;
  border: 1px solid #e3e3e3;
}
.apply_ul p {
  color: #1c70c5;
  font-size: 12px;
  padding: 15px 30px;
  border-bottom: 1px solid #dddddd;
}
.apply ul li {
  flex: 1;
}
.apply .p_first {
  border-bottom: 1px solid #dddddd;
  padding: 10px 20px;
  box-sizing: border-box;
}
.apply p:first-of-type span:first-of-type {
  color: #1c70c5;
  font-size: 14px;
  font-weight: bold;
  padding: 0 10px;
  border-left: 4px solid #1c70c5;
}
.apply p:first-of-type span:nth-of-type(2) {
  color: #f83e3e;
  font-size: 12px;
}
.apply p:first-of-type span:last-of-type {
  color: #333;
  font-size: 12px;
}
.apply ul {
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 12px;
  color: #333;
  letter-spacing: 1px;
}
.apply ul li {
  line-height: 25px;
}
.applyList li:nth-of-type(2) {
  color: #f83e3e;
}
.applyList li:last-of-type {
  color: #999999;
}
.no_participation {
  font-size: 18px;
  text-align: center;
  padding: 30px;
}
.participation p:first-of-type {
  padding: 40px 0;
  color: #333;
  font-size: 18px;
}
.participation p:first-of-type span:nth-of-type(2) {
  color: #f83e3e;
}
.participation_two {
  display: flex;
  align-items: center;
}
.participation_two span:first-of-type {
  margin-right: 20px;
}
.participation_two img:first-of-type {
  margin: 0;
}
.participation_two img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: -10px;
}
.accessory {
  width: 100%;
  margin-top: 50px;
}
.accessory ul {
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dfe0eb;
}
.accessory ul li {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.accessory ul li p {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.xiazai {
  color: #1c70c5;
  border-bottom: 1px solid #1c70c5;
  padding: 3px 0;
}
.accessory_tit {
  background: #dfe0eb;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #333;
  display: flex;
  justify-content: space-around;
}
.el-icon-files {
  padding: 0 5px;
}
.flex1 {
  flex: 1;
  text-align: center;
}
.other {
  /* display: flex; */
  margin-top: 20px;
}
.other_p {
  display: flex;
  align-items: center;
}
.other_num {
  width: 130px;
  background: #e3e3e3;
  padding: 10px;
  font-size: 16px;
}
.other2 {
  width: 420px;
  color: #666666;
  font-size: 12px;
  padding: 10px 0;
}
.amount {
  font-size: 18px;
  color: #f83e3e;
  margin-top: 15px;
}
.el-icon-s-flag {
  font-size: 20px;
  padding: 0 5px;
}
</style>



