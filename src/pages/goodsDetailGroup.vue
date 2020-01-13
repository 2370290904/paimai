<template>
  <!-- 组合品--详情 -->
  <!-- 组合品公开+荷兰式/英式+不可联合 -->
  <!-- 主页 -->
  <div class="goodsDetail">
    <!-- 拍卖-种类选择 -->
    <div class="goodsDetail_con">
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
              <span>地址：广东省深圳市龙华区</span>
            </p>
            <p class="goods_txt">
              详情：商品详情商品详情商品详情商品详情商品详情商品详情详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情详商品详情商品详情
              商品详情商品详情商品详情商品详情商品详情商品详情商品详详情商品详情商品详情
              商品详情商品详情商品详情商品详情
            </p>
            <div class="flex justify-content">
              <!-- slide -->
              <div class="slide">
                <!-- 图片滑动 -->
                <div>
                  <p class="slide_title">商品一：木桌*1+木凳*3张</p>
                  <div class="slide_div">
                    <i class="el-icon-arrow-left"></i>
                    <img src="../assets/fu1.jpg" />
                    <img src="../assets/fu2.jpg" />
                    <img src="../assets/fu1.jpg" />
                    <i class="el-icon-arrow-right"></i>
                  </div>
                </div>
                <!-- 图片滑动 end -->
                <div class="slide_right">
                  <!-- 英式 -->
                  <p class="slide_p">
                    <span style="font-size:14px;">当前单价：</span>
                    <span class="slide_price">￥2200.00</span>
                    <span class="slide_span">起拍价：￥1200.00</span>
                  </p>
                  <!-- 英式  end-->

                  <!-- 荷兰式 -->
                  <!-- <div class="slide_p" style="display:flex;align-items:center;">
                <span style="font-size:14px;">当前单价：</span>
                <span class="slide_price">￥2200.00</span>
                <p class="slide_span">
                  <span>起拍价：￥1200.00</span>
                  <span>保底价：￥1200.00</span>
                </p>
                  </div>-->
                  <!-- 荷兰式  end -->

                  <!-- 价格不公开 -->
                  <!-- <span style="font-size:14px;">起拍单价：</span> -->

                   
                    <div class="dc">
                      <div class="other">
                        <p class="other_p">
                          <span class="other_span">出价￥</span>
                          <el-input-number
                            v-model="num2"
                            controls-position="right"
                            :min="1500"
                            :step="200"
                          ></el-input-number>
                        </p>
                      </div>
                      <div class="other2">
                        <!-- 英式 -->
                        <p>升价幅度：￥200.00</p>

                        <!-- 荷兰式 -->
                        <!-- <p>降价幅度：￥2000.00</p> -->
                      </div>
                    </div>
                </div>
              </div>
              <!-- slide end -->

              <!-- slide2 -->
              <div class="slide">
                <!-- 图片滑动 -->
                <div>
                  <p class="slide_title">商品二：木桌*1+木凳*3张</p>
                  <div class="slide_div">
                    <i class="el-icon-arrow-left"></i>
                    <img src="../assets/fu1.jpg" />
                    <img src="../assets/fu2.jpg" />
                    <img src="../assets/fu1.jpg" />
                    <i class="el-icon-arrow-right"></i>
                  </div>
                </div>
                <!-- 图片滑动 end -->
                <div class="slide_right">
                  <!-- 英式 -->
                  <!-- <p class="slide_p">
                    <span style="font-size:14px;">当前单价：</span>
                    <span class="slide_price">￥2200.00</span>
                    <span class="slide_span">起拍价：￥1200.00</span>
                  </p> -->
                  <!-- 英式  end-->

                  <!-- 荷兰式 -->
                  <!-- <div class="slide_p" style="display:flex;align-items:center;">
                <span style="font-size:14px;">当前单价：</span>
                <span class="slide_price">￥2200.00</span>
                <p class="slide_span">
                  <span>起拍价：￥1200.00</span>
                  <span>保底价：￥1200.00</span>
                </p>
                  </div>-->
                  <!-- 荷兰式  end -->

                  <!-- 价格不公开 -->
                  <!-- <span style="font-size:14px;">起拍单价：</span> -->

                  <!-- 英式 -->
                  <div class="dc"></div>

                  <!-- 荷兰式 -->
                  <!-- <div class="dc">
                  <div class="other">
                    <p class="other_p">
                      <span class="other_span">出价￥</span>
                      <el-input-number
                        v-model="num2"
                        controls-position="right"
                        :min="1500"
                        :step="200"
                      ></el-input-number>
                    </p>
                  </div>
                  <div class="other2">
                  <-- 英式-->
                  <!-- <p>升价幅度：￥2000.00</p>   -->

                  <!-- 荷兰式 -->
                  <!-- <p>降价幅度：￥2000.00</p> -->
                  <!-- </div>
                  </div>-->
                </div>
              </div>
              <!-- slide2 end -->
            </div>

            <!-- 商品选择 -->
            <div class="goods_select">
              <p class="select_p">商品选择：</p>
              <!-- <el-button
                :class="{btn2: !isshow,click: isshow}"
                class="btn2"
                @click="isshow=!isshow"
              >商品一</el-button>
              <el-button
                :class="{btn2: !isshow2,click: isshow2}"
                class="btn2"
                @click="isshow2=!isshow2"
              >商品二</el-button>-->

              <el-button
                v-for="(list,index) in payconfigEntities"
                :key="index"
                v-bind:class="{colorChange:index==dynamic}"
                class="btn2"
                @click="getMoney(index)"
              >{{list.name}}</el-button>
            </div>
            <p class="amount">总计：￥230,000.00</p>
            <el-button class="rebtn" style="margin:20px 40px 0px 40px;">
              <i class="el-icon-s-flag"></i>确认投标
            </el-button>
          </div>
          <!-- apply -->
          <div class="apply">
            <div class="apply_div">
              <p class="p_first">
                <span>拍卖</span>
                <span>15人报名</span>
              </p>
              <!-- 英式 -->
              <div class="apply_ps">
                <p>起拍价：￥3,200.00</p>
                <p>升价幅度：￥200.00</p>
                <p>类型：拍卖</p>
                <p>竞价周期：一天</p>
              </div>

              <!-- 荷兰式 -->
              <!-- <div class="apply_ps">
                <p>起拍价：￥3,200.00</p>
                <p>降价幅度：￥200.00</p>
                <p>类型：拍卖</p>
                <p>竞价周期：一天</p>
              </div>-->

              <!-- 价格不公开 -->
              <!-- <div class="apply_ps">
                <p>起拍价：￥3,200.00</p>
                <p>类型：拍卖</p>
                <p>竞价周期：一天</p>
              </div>-->
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

        <!-- <div class="participation">
          <p>
            <span>可联合竞标，已有</span>
            <span>15人</span>
            <span>参与</span>
          </p>
          <p class="participation_two">
            <span>
              <img src="../assets/tou1.jpeg" />
              <img src="../assets/tou2.jpeg" />
              <img src="../assets/tou3.jpeg" />
            </span>
            <span>花花</span>
            <span>+</span>
            <span>咪咪</span>
            <span>+</span>
            <span>小小</span>
            <span>...</span>
          </p>
        </div>-->

        <!-- 状态：不支持联合竞标 -->
        <!-- <div class="no_participation">该商品不支持联合竞标！</div> -->

        <!-- 状态：支持联合竞标-->
        <!-- <div class="no_participation"></div> -->

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
    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>
<script>
import present from "../components/present";
import bottoms from "../components/bottoms";
export default {
  name: "goodsDetail",
  components: {
    bottoms,
    present
  },
  data() {
    return {
      num: 1,
      num2: 1500,
      isshow: false,
      isshow2: false,
      payconfigEntities: [{ name: "商品1*9" }, { name: "商品2*2" }],
      dynamic: 0,
      applyList: [
        {
          phone: 18570414200,
          num: 550 ,
          price: 100000
        },
        {
          phone: 14540527000,
          num: 340 ,
          price: 100000
        },
        {
          phone: 12345678901,
          num: 320 ,
          price: 100000
        },
        {
          phone: 18570414200,
          num: 550 ,
          price: 100000
        },
        {
          phone: 0,
          num: 0,
          price: 0
        },
        {
          phone: 12345678901,
          num: 320 ,
          price: 100000
        },
        {
          phone: 18570414200,
          num: 220 ,
          price: 100000
        }
      ]
    };
  },
  methods: {
    to_itembid() {
      this.$router.push({ path: "/itembid" });
    },
    to_combinedBid() {
      this.$router.push({ path: "/combinedBid" });
    },
    getMoney: function(index) {
      console.log(index);
      //点击添加字体颜色，其他的删除class名称
      this.dynamic = index;
    }
  }
};
</script>
<style scoped>
.el-input__inner {
  border: 0 !important;
}
.el-input-number {
  width: 160px;
}
.el-input-number.is-controls-right .el-input-number__increase {
  border-radius: 0;
}
</style>

<style scoped>
.group_num {
  width: 120px;
  text-align: center;
  background: #f4f4f4;
  font-size: 14px;
  color: #333;
  height: 40px;
  line-height: 20px;
  margin-right: 10px;
  padding: 10px;
  box-sizing: border-box;
}
.click {
  color: #fff !important;
  border: 0 !important;
  background: #f83e3e !important;
}
.colorChange {
  color: #fff !important;
  border: 0 !important;
  background-color: #f83e3e !important;
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
  padding: 20px 30px;
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
  width: 100%;
  color: #999999;
  font-size: 12px;
}
.slide {
  /* width: 420px; */
  overflow: auto;
  margin-top: 40px;
  box-sizing: border-box;
 
  /* border: 1px solid wheat; */
}
.slide_div {
  width: 360px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.slide_title {
  color: #1c70c5;
  font-size: 18px;
  padding-bottom: 30px;
  padding: 0 30px 20px 40px;
}
.slide_p {
  height: 50px;
  margin-bottom: 10px;
  padding: 10px;
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
.slide_right {
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  margin-top: 20px;
  margin-left: 42px;
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
  margin-top: 10px;
  border-radius: 0px;
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
  display: flex;
  margin-top: 20px;
}
.other_p {
  /* width: 100%; */
  /* margin-right: 10px; */
  border: 1px solid #d0d0d0;
  display: flex;
  align-items: center;
}
.other_span {
  padding: 0 20px;
  font-size: 14px;
  box-sizing: border-box;
}
.other2 {
  color: #666666;
  font-size: 12px;
  padding-top: 5px;
  text-align: left;
}
.amount {
  font-size: 18px;
  color: #f83e3e;
  margin: 0 40px;
}
.el-icon-s-flag {
  font-size: 20px;
  padding: 0 5px;
}
.btn2 {
  width: 140px;
  color: #fff;
  background: #a3a3a3;
  /* border: 1px solid #666666; */
}
.goods_select {
  padding: 30px 40px;
}
.select_p {
  color: #333333;
  font-size: 18px;
  font-weight: bold;
}
.rebtn {
  background: #f83e3e;
  color: #fff;
  width: 180px;
  border: 0;
  font-size: 18px;
}
</style>



