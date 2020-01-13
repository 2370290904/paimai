<template>
  <!-- 单品--详情 -->

  <!-- 求报价+单独采购+联合竞标-->
  <div class="goodsDetailGroup">
    <navs></navs>
    <navigationBar></navigationBar>
    <!-- 拍买-种类选择 -->
    <div class="goodsDetailGroup_con">
      <!-- 当前页面位置 -->
      <present :titles="['拍卖','竞标','分类选择','商品列表','商品详情']"></present>
      <div class="w1200">
        <div class="up">
          <!-- goods -->
          <div class="goods">
            <p class="goods_one">
              <span>{{detailList.title}}</span>
              <!-- is_bid_unite==1 可联合竞标 -->
              <img
                v-if="detailList.is_bid_unite==1"
                style="margin:0 10px;"
                src="../assets/goods_ico2.png"
              />
              <img v-else style="margin:0 10px;" src="../assets/goods_ico1.png" />

              <!-- is_bid_unite==1 可联合采购 -->
              <img
                v-if="detailList.is_unite==1"
                style="margin:0 10px;"
                src="../assets/purchase.png"
              />
              <img v-else style="margin:0 10px;" src="../assets/no_purchase.png" />
            </p>
            <p v-if="end==false" class="goods_two">
              <span>距结束</span>
              <span>{{detailList.endtime}}</span>
              <span>{{detailList.province}}{{detailList.city}}{{detailList.district}}</span>
            </p>
            <p style="margin:20px 0;color:#aaa;font-size:22px;" v-else>已结束</p>
            <p class="goods_txt">{{detailList.desc}}</p>
            <!-- slide -->
            <div class="slide">
              <div class="slide_div">
                <i class="el-icon-arrow-left"></i>
                <img v-for="(item,index) in detailimg" :key="index" :src="item" />
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>

            <div class="other2">
              <p class="other_num" style="margin-top:30px;">
                <span class="other_span">采购总数</span>
                <span style="color:#F83E3E;padding:0 10px;">{{detailList.num}}</span>
              </p>
            </div>
             <div v-if="type==1" class="flex align-items" style="margin:20px 0;">
                <p class="slide_p">
                  <span style="font-size:14px;">单价：</span>
                  <span class="slide_price">￥{{detailList.one_price}}</span>
                </p>
                <p class="other_num">
                  <span class="other_span">数量</span>
                  <span style="color:#F83E3E;padding:0 10px;">{{detailList.num}}</span>
                </p>
              </div>
              <div v-if="type==1" class="other">
              <p class="other_p">
                <span class="other_span">总价</span>
                <span class="slide_price">￥{{detailList.budget}}</span>
              </p>
            </div>
            <!-- 人数列表 -->
            <div v-if="quteuser.length!=0" class="numList">
              <label>联合发标列表</label>
              <ul>
                <li class="flex" v-for="(item,index) in quteuser" :key="index">
                  <p class="flex align-items">
                    <img :src="item.useravatar" />
                    <span style="margin-left:20px;">{{item.nickname}}</span>
                  </p>
                  <p class="co_F83E3E">{{item.qu_num}}/件</p>
                  <p class="co_666">地址：{{item.qu_province}}{{item.qu_city}}{{item.qu_district}}</p>
                  <!-- <el-radio style="margin-left:30px;" v-model="radio" label="1">&nbsp;</el-radio>   -->
                </li>
              </ul>
            </div>
            <el-button v-if="type==0" @click="want_bit" :style="end==false ? '':'    background: #e3e3e3;'">
              <i class="el-icon-s-flag"></i>我要竞标
            </el-button>
            <el-button v-else @click="want_bit2" :style="end==false ? '':'    background: #e3e3e3;'">
              <i class="el-icon-s-flag"></i>确认竞标
            </el-button>
          </div>
          <!-- apply -->
          <div class="apply">
            <div class="apply_div">
              <p class="p_first">
                <span>拍买</span>
                <span>{{bidlist.total}}人报名</span>
              </p>
              <!-- 英式 -->
              <div class="apply_ps">
                <p>类型：拍买</p>
                <p>竞标周期：{{bidlist.date}}</p>
              </div>
            </div>
            <div class="apply_ul">
              <p>商品竞标列表</p>
              <ul style="padding-top:10px;">
                <li>竞标人</li>
                <li>数量</li>
                <!-- <li>价格</li> -->
              </ul>
              <p v-if="list.length==0" style="color:#aaa;text-align:center">暂无竞标</p>
              <ul
                v-else
                style="padding-bottom:10px;"
                class="applyList"
                v-for="(item,index) in list"
                :key="index"
              >
                <li>{{item.mobile}}</li>
                <li>{{item.num}}</li>
                <!-- <li>{{item.price ? item.price : '-----'}}</li> -->
              </ul>
            </div>
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
                  附件{{index+1}}：
                  <i class="el-icon-files"></i>
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
        <p style="text-align:center;">- 竞标报价信息-</p>
        <p class="other_p">
          <span class="other_span" style="padding-right:20px;">供货数量：</span>
          <el-input-number
            style="border:1px solid #D0D0D0"
            v-model="num"
            controls-position="right"
            :min="1"
            :step="1"
          ></el-input-number>
          <!-- <span>324</span> -->
        </p>
        <p>
          <span style="padding-right:20px;">单件报价：</span>
          <input v-model="one_price" placeholder="请输入单件商品报价金额" />
        </p>
        <p class="co_999">总价：￥{{one_price*num}}</p>
        <el-button @click="takeQuotebid">确认竞标</el-button>
      </div>
    </div>
    <!-- 求商品弹窗 -->
    <!-- 弹窗 -->
    <div class="pop_up" v-if="show2==true">
      <div class="pop_upCon pop_upCon2">
        <i @click="show2=false" class="el-icon-close fon20" style="width: 100%;text-align:right"></i>
        <p style="text-align:center;">- 投标信息-</p>
        <p class="other_p">
          <span style="padding:10px 0;display: inherit;
      text-align: left;">文字描述：</span>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="例：我们是xxx公司，可以给您提供XXX（商品），我们的商品全国供应，正品保障。"
            v-model="desc"
          ></el-input>
        </p>
        <p>
          <span style="padding:10px 0;display: inherit;">添加图片：</span>
          <el-upload
              :action="HOST+'/api/common/upload'"
              list-type="picture-card"
              :limit="3"
              :on-exceed="handleExceed"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="imageChange"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </p>
        <p class="co_999 fon14">最多可上传3张商品详情</p>
        <el-button @click="takeQuotebid">确认投标</el-button>
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
      one_price: "",
      total_price: "",
      dialogVisible: false,
      dialogImageUrl: "",
      desc:'',
      radio: "1",
      show: false,
      show2: false,
      detailList: {},
      detailimg: [],
      quteuser: [],
      bidlist: [],
      list: [],
      fileList: [],
      end: false,
      setInterval: null,
      type: this.$route.query.type
    };
  },
  created() {
    this.getList();
    this.getBidList();
  },
  // filters: {
  //   phonefilters(val) {
  //     let reg = /^(.{3}).*(.{4})$/;
  //     return val.replace(reg, "$1****$2");
  //   }
  // },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
     handleRemove(file, fileList) {
      console.log("执行了删除方法");
      console.log(file, fileList);
    },
     imageChange(file, fileList) {
      let imageList = [];
      fileList.forEach(item => {
        if (item.response) {
          imageList.push(item.response.data.url);
        }
      });
      // 圖片列表 this.imageList
      this.imageList = imageList.join();
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
     handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    download() {
      window.open(this.fileList);
    },
    want_bit() {
      if (this.end == false) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
     want_bit2() {
      if (this.end == false) {
        this.show2 = true;
      } else {
        this.show2 = false;
      }
    },
    //竞价
    takeQuotebid() {
      this.$ajax
        .post(
          this.HOST + "/api/index/quotebid",
          qs.stringify({
            qute_id: this.$route.query.id,
            num: this.num,
            type: this.type, //类型 0:求报价 1:求商品
            one_price: this.one_price,
            desc:this.desc,
            images:this.imageList,
            total_price: this.one_price * this.num
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
            // this.$router.push({ path: "/index" });
            this.show = false;
            this.show2 = false;
          } else {
            this.$message.error(response.data.msg);
            this.show = false;
            this.show2 = false;
          }
        })
        .catch((response, error) => {
          this.$message.error(response);
        });
    },
    //竞标列表
    getBidList() {
      this.$ajax
        .post(
          this.HOST + "/api/index/bidlist",
          qs.stringify({
            qute_id: this.$route.query.id
          }),
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(response => {
          this.bidlist = response.data.data;
          this.list = this.bidlist.list;
          console.log(this.list, "list");
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
            this.fileList = (
              "http://paimai.9151cc.com" + response.data.data.files
            ).split(",");
          }

          if (response.data.data.images != "") {
            this.detailimg = (
              "http://paimai.9151cc.com" + response.data.data.images
            ).split(",");
          }

          console.log(this.fileList, "file");
        })
        .catch((response, error) => {
          this.$message.error(response);
        });
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
.end_ccc {
  background: #ccc;
}
</style>

<style scoped>
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
.pop_upCon p:nth-of-type(3) input {
  background: #ebebeb;
  border: 0;
  padding: 10px;
}
.pop_upCon p:nth-of-type(3),
.pop_upCon p:nth-of-type(4) {
  text-align: center;
}
.pop_upCon2 p:nth-of-type(3),
.pop_upCon2 p:nth-of-type(4) {
  text-align: left;
}
.pop_upCon p {
  margin: 15px 0;
}
.pop_upCon {
  width: 50%;
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
.goodsDetailGroup {
  position: relative;
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
  width: 880px;
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
  padding: 8px;
  display: flex;
  align-items: center;
  background: #f4f4f4;
  box-sizing: border-box;
  margin-right: 20px;
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
  background: #f83e3e;
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
  color: #f83e3e;
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
  /* display: flex; */
  align-items: center;
  /* border:1px solid #D0D0D0; */
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



