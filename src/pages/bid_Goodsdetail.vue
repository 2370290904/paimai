<template>
  <!-- 单品--详情 -->

  <!-- 多量卖+公开+荷兰式+不可联合竞标 -->
  <div class="goodsDetailGroup">
     <navs></navs>
    <navigationBar></navigationBar>
    <!-- 拍卖-种类选择 -->
    <div class="goodsDetailGroup_con">
      <!-- 当前页面位置 -->
      <present :titles="['拍卖','竞标','分类选择','商品列表','商品详情']"></present>
      <div class="w1200">
        <div class="up">
          <!-- goods -->
          <div class="goods">
            <p class="goods_one">
              <span>单鞋</span>
              <!-- 是否可以联合竞标 -->

              <!-- ke -->
              <!-- <img style="margin:0 10px;" src="../assets/goods_ico2.png" /> -->

              <!-- buke -->
              <img style="margin:0 10px;" src="../assets/goods_ico1.png" />

              <!-- 是否可以联合竞标 end -->
            </p>
            <p class="goods_two">
              <span>距结束</span>
              <span>00天16时32分18秒</span>
              <span></span>
            </p>
            <p class="goods_txt">
              详情：商品详情商品详情商品详情商品详情商品详情商品详情详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情详商品详情商品详情
              商品详情商品详情商品详情商品详情商品详情商品详情商品详详情商品详情商品详情
              商品详情商品详情商品详情商品详情
            </p>
            <p style="margin-top:20px;" class="co_999 fon14">
              <span>供货时间</span>
              <span>2019-10-10 19：20</span>
            </p>
            <!-- slide -->
            <div class="slide">
              <div class="slide_div">
                <i class="el-icon-arrow-left"></i>
                <img src="../assets/fu1.jpg" />
                <img src="../assets/fu2.jpg" />
                <img src="../assets/fu1.jpg" />
                <i class="el-icon-arrow-right"></i>
              </div>
              <p class="other_num" style="margin-top:30px;">
                <span class="other_span">采购总数</span>
                <span style="color:#333;padding:0 10px;">10</span>
              </p>
              <div class="flex align-items" style="margin-top:30px;">
                <p class="slide_p">
                  <span style="font-size:14px;">单价：</span>
                  <span class="slide_price">￥2200.00</span>
                </p>
                <p class="other_num">
                  <span class="other_span">数量</span>
                  <span style="color:#F83E3E;padding:0 10px;">1000</span>
                </p>
              </div>
            </div>

            <div class="other">
              <p class="other_p">
                <span class="other_span">总价</span>
                <span class="slide_price">￥2200.00</span>
              </p>
            </div>
            <el-button style="margin-top:40px;" @click="want_bit">
              <i class="el-icon-s-flag"></i>确认投标
            </el-button>
          </div>
          <!-- apply -->
          <div class="apply">
            <div class="apply_div">
              <p class="p_first">
                <span>拍买</span>
                <span>15人报名</span>
              </p>
              <!-- 英式 -->
              <div class="apply_ps">
                <p>类型：拍买</p>
                <p>竞价周期：一天</p>
              </div>
            </div>
            <div class="apply_ul">
              <p>商品竞标列表</p>
              <ul style="padding-top:10px;">
                <li>竞标人</li>
                <li>数量</li>
                <li>价格</li>
              </ul>
              <ul
                style="padding-bottom:10px;"
                class="applyList"
                v-for="(item,index) in applyList"
                :key="index"
              >
                <li>{{item.phone ? item.phone : '-----'}}</li>
                <li>{{item.num ? item.num : '-'}}</li>
                <li>{{item.price ? item.price : '-----'}}</li>
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
          <ul>
            <li>
              <p class="flex1">
                <span>
                  附件一：
                  <i class="el-icon-files"></i>
                </span>
                <span>123.doc</span>
              </p>
              <p class="flex1">
                <span class="xiazai">下载</span>
              </p>
            </li>
          </ul>
          <ul>
            <li>
              <p class="flex1">
                <span>
                  附件一：
                  <i class="el-icon-files"></i>
                </span>
                <span>123.doc</span>
              </p>
              <p class="flex1">
                <span class="xiazai">下载</span>
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
        <p style="text-align:center;">- 投标信息-</p>
        <p class="other_p">
          <span style="padding:10px 0;display: inherit;
      text-align: left;">文字描述：</span>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="例：我们是xxx公司，可以给您提供XXX（商品），我们的商品全国供应，正品保障。"
            v-model="textarea"
          ></el-input>
        </p>
        <p>
          <span style="padding:10px 0;display: inherit;">添加图片：</span>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </p>
        <p class="co_999 fon14">最多可上传3张商品详情</p>
        <el-button>确认投标</el-button>
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
      num2: 1500,
      show: false,
      dialogImageUrl: "",
      dialogVisible: false,
      applyList: [
        {
          phone: 18570414200,
          num: 550 + "",
          price: 100000
        },
        {
          phone: 14540527000,
          num: 340 + "",
          price: 100000
        },
        {
          phone: 12345678901,
          num: 320 + "",
          price: 100000
        },
        {
          phone: 18570414200,
          num: 550 + "",
          price: 100000
        },
        {
          phone: 0,
          num: 0,
          price: 0
        },
        {
          phone: 12345678901,
          num: 320 + "",
          price: 100000
        },
        {
          phone: 18570414200,
          num: 220 + "",
          price: 100000
        }
      ]
    };
  },
  
  methods: {
   
    want_bit() {
      this.show = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
.el-textarea {
  width: 100%;
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
  padding: 20px 0;
  margin-top: 30px;
  box-sizing: border-box;
}
.slide_div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.slide_p {
  width: 50%;
  height: 40px;
  padding: 9px;
  display: flex;
  align-items: center;
  border: 1px solid #d0d0d0;
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
.other_num {
  width: 130px;
  background: #f4f4f4;
  padding: 10px;
  font-size: 16px;
}
.other_span {
  padding: 0 12px;
  font-size: 14px;
  box-sizing: border-box;
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



