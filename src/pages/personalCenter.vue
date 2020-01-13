<template>
  <!-- 主页 -->
  <div class="helpCenter">
    <navs></navs>
    <navigationBar></navigationBar>
    <!-- 个人中心 -->
    <div class="helpCenter_con">
      <div class="helpMenu">
        <p>发标记录</p>
        <ul class="helpMenu_ul">
          <li
            :class="index==thisIndex?'this':''"
            :style="index==0 || index==1 ?'':'background: #C3DDFF;color: #333;padding:10px 30px;'"
            v-for="(item,index) in typeList"
            :key="index"
            @click="switchTo(index)"
          >
            <span v-if="index==0 || index==1 "></span>
            {{item}}
          </li>
        </ul>
      </div>
      <!-- 拍买 -->
      <div v-if="thisIndex==0" class="help_notice">
        <div style="text-align: right;" v-show="quote && bid">
          <button :class="play==true ? 'center_btn' : 'center_btn2'" @click="price">求报价</button>
          <button
            :class="play==false ? 'center_btn' : 'center_btn2'"
            @click="goods"
            style="margin-left:15px;"
          >求商品</button>
        </div>
        <!-- 求报价表格 -->
        <el-table
          v-show="quote"
          v-if="play==false"
          :data="tableData"
          stripe
          style="width: 100%;margin-top:30px;"
        >
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="count" label="采购总量"></el-table-column>
          <el-table-column prop="num" label="采购人数"></el-table-column>
          <el-table-column fixed="right" label="竞拍结果">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="quote_select(scope.$index, tableData)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 求商品表格 -->
        <el-table
          v-show="bid"
          v-if="play==true"
          :data="tableData2"
          stripe
          style="width: 100%;margin-top:30px;"
        >
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="count" label="采购总量"></el-table-column>
          <el-table-column prop="num" label="采购预算"></el-table-column>
          <el-table-column fixed="right" label="竞拍结果">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="goods_select(scope.$index, tableData2)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 求报价 中标结果列表 -->
        <div v-show="result">
          <div class="flex justify-content align-items">
            <p>
              <i style="font-size:20px;" class="el-icon-s-flag co_1C70C5"></i>
              <span class="co_1C70C5">中交一航局钢格栅材料采购单</span>
              <span class="co_333">中标结果列表</span>
            </p>
            <button class="center_btn2">付费查看结果</button>
          </div>
          <el-table :data="tableData_chid" stripe style="width: 100%;margin-top:30px;">
            <el-table-column prop="name" label="投标人"></el-table-column>
            <el-table-column prop="count" label="联系方式"></el-table-column>
            <el-table-column prop="num" label="投标数量"></el-table-column>
            <el-table-column fixed="right" label="总报价">
              <template slot-scope="scope">
                <el-button type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 求商品 投标人列表 -->
        <div v-show="bidList">
          <div class="flex justify-content align-items">
            <p>
              <i style="font-size:20px;" class="el-icon-s-flag co_1C70C5"></i>
              <span class="co_1C70C5">中交一公局五公司保温板、防火板采购</span>
              <span class="co_333">投标人列表</span>
            </p>
            <p class="co_999">请在招标截止后3天内选择确认中标人选，逾期将自动流标</p>
          </div>
          <el-table :data="tableData2_chid" stripe style="width: 100%;margin-top:30px;">
            <el-table-column label="选择" v-if="seRadio==true">
              <template slot-scope="scope">
                <el-radio
                  v-model="radio"
                  :label="scope.$index"
                  @change.native.prevent="radio_change(scope.$index, tableData2_chid)"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="投标人"></el-table-column>
            <el-table-column prop="count" label="联系方式"></el-table-column>
            <el-table-column prop="num" label="投标图片"></el-table-column>
            <el-table-column fixed="right" label="投标留言">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click.native.prevent="bid_select(scope.$index, tableData2_chid)"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <button style="margin-top:30px;" class="center_btn2" @click="remit">确认中标人</button>
        </div>
      </div>
      <!-- 拍卖 -->
      <div v-if="thisIndex==1" class="help_notice">
        <div style="text-align: right;" v-if="!single_child && !group_child">
          <button :class="play2==true ? 'center_btn' : 'center_btn2'" @click="single">单品拍卖</button>
          <button
            :class="play2==false ? 'center_btn' : 'center_btn2'"
            style="margin-left:15px;"
            @click="group"
          >组合品拍卖</button>
        </div>
        <!-- 单品拍卖 -->
        <el-table
          v-if="!play2"
          :data="singleTableData"
          stripe
          v-show="singleList"
          style="width: 100%;margin-top:30px;"
        >
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="count" label="当前价格"></el-table-column>
          <el-table-column prop="num" label="参与人数"></el-table-column>
          <el-table-column fixed="right" label="中标结果">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="single_select(scope.$index, singleTableData)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 中标人信息 -->
        <div class="flex justify-content align-items" v-if="single_child==true">
          <p>
            <i style="font-size:20px;" class="el-icon-s-flag co_1C70C5"></i>
            <span class="co_1C70C5">中交一航局钢格栅</span>
            <span class="co_333">中标人信息</span>
          </p>
          <button class="center_btn2">付费查看中标信息</button>
        </div>
        <el-table
          v-if="single_child==true"
          :data="single_childTableData"
          stripe
          style="width: 100%;margin-top:30px;"
        >
          <el-table-column prop="name" label="投标人"></el-table-column>
          <el-table-column prop="count" label="联系方式"></el-table-column>
          <el-table-column prop="num" label="竞拍数"></el-table-column>
          <el-table-column prop="num" label="最终竞拍价"></el-table-column>
        </el-table>
        <!-- 组合品拍卖 -->
        <el-table
          v-show="groupList"
          v-if="play2"
          :data="groupTableData"
          stripe
          style="width: 100%;margin-top:30px;"
        >
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="count" label="组合品种类"></el-table-column>
          <el-table-column prop="num" label="竞标人数"></el-table-column>
          <el-table-column fixed="right" label="竞拍结果">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="group_select(scope.$index, groupTableData)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 投标人列表 -->
        <p v-if="group_child">
          <i style="font-size:20px;" class="el-icon-s-flag co_1C70C5"></i>
          <span class="co_1C70C5">飞天牌”年份茅台酒组合（15年、30年、50年各一瓶）</span>
          <span class="co_333">投标人详情</span>
        </p>
        <div class="flex justify-content align-items" v-if="group_child" style="margin-top:20px;">
          <!-- 主投标  次投标 -->
          <div>
            <button :class="play3==true ? 'center_btn' : 'center_btn2'" @click="main_select">主标投标列表</button>
            <button
              :class="play3==false ? 'center_btn' : 'center_btn2'"
              style="margin-left:15px;"
              @click="lesser_select"
            >次标投标列表</button>
          </div>
          <button class="center_btn2">付费查看投标列表</button>
        </div>
        <!-- 主标投标列表 -->
        <el-table
          v-if="group_child && main"
          :data="group_childTableData"
          stripe
          style="width: 100%;margin-top:30px;"
        >
          <el-table-column prop="name" label="投标商品"></el-table-column>
          <el-table-column prop="count" label="投标价格"></el-table-column>
          <el-table-column prop="num" label="投标人"></el-table-column>
          <el-table-column prop="num" label="联系方式"></el-table-column>
          <el-table-column prop="num" label="中标情况"></el-table-column>
        </el-table>
        <!-- 次标投标列表 -->
        <p  style="width: 100%;margin-top:30px;" v-if="group_child && lesser">商品：黄瓜味薯片 数量：50</p>
        <el-table
          v-if="group_child && lesser"
          :data="group_childTableData"
          stripe
          style="width: 100%;margin-top:10px;"
        >
          <el-table-column prop="name" label="中标人"></el-table-column>
          <el-table-column prop="count" label="投标数"></el-table-column>
          <el-table-column prop="num" label="投标单价"></el-table-column>
          <el-table-column prop="num" label="投标总价"></el-table-column>
          <el-table-column prop="num" label="中标数"></el-table-column>
          <el-table-column prop="num" label="应付余额"></el-table-column>
          <el-table-column prop="num" label="联系方式"></el-table-column>
        </el-table>
        <p  style="width: 100%;margin-top:30px;" v-if="group_child && lesser">商品：黄瓜味薯片222 数量：50</p>
        <el-table
          v-if="group_child && lesser"
          :data="group_childTableData"
          stripe
          style="width: 100%;margin-top:10px;"
        >
          <el-table-column prop="name" label="中标人"></el-table-column>
          <el-table-column prop="count" label="投标数"></el-table-column>
          <el-table-column prop="num" label="投标单价"></el-table-column>
          <el-table-column prop="num" label="投标总价"></el-table-column>
          <el-table-column prop="num" label="中标数"></el-table-column>
          <el-table-column prop="num" label="应付余额"></el-table-column>
          <el-table-column prop="num" label="联系方式"></el-table-column>
        </el-table>
      </div>
      <!-- 投标记录 -->
      <div v-if="thisIndex==2" class="help_notice"></div>
      <!-- 我的钱包 -->
      <div v-if="thisIndex==3" class="help_notice"></div>
      <div v-if="thisIndex==4" class="help_notice"></div>
    </div>
    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>
<script>
import bottoms from "../components/bottoms";
import navs from "../components/navs";
import navigationBar from "../components/navigationBar";
export default {
  name: "helpCenter",
  components: {
    bottoms,
    navigationBar,
    navs
  },
  data() {
    return {
      typeList: ["拍买", "拍卖", "投标记录", "我的钱包","会员通知"],
      typeList2: ["投标记录", "我的钱包","会员通知"],
      single_childTableData: [],
      singleTableData: [
        {
          id: 1,
          name: "笔记本",
          count: "114",
          num: "1"
        }
      ],
      groupTableData: [
        {
          id: 1,
          name: "笔记本",
          count: "114",
          num: "1"
        }
      ],
      group_childTableData: [],
      thisIndex: 0,
      play: false,
      play2: false,
      play3: false,
      result: false,
      quote: true,
      bid: true,
      bidList: false,
      singleList: true,
      groupList: true,
      single_child: false,
      group_child: false,
      main: true,
      lesser: false,
      radio: "1",
      tableData: [
        {
          id: 1,
          name: "中交一航局钢格栅材料采购",
          count: "114",
          num: "1"
        },
        {
          id: 2,
          name: "中交一航局钢格栅材料采购",
          count: "114",
          num: "1111"
        }
      ],
      tableData2: [
        {
          id: 1,
          name: "笔记本",
          count: "114",
          num: "1"
        },
        {
          id: 2,
          name: "笔记本",
          count: "114",
          num: "1111"
        }
      ],
      tableData_chid: [],
      tableData2_chid: [
        {
          id: 1,
          name: "笔记本",
          count: "114",
          num: "1"
        },
        {
          id: 2,
          name: "笔记本",
          count: "114",
          num: "1111"
        },
        {
          id: 3,
          name: "笔记本",
          count: "114",
          num: "1111"
        },
        {
          id: 4,
          name: "笔记本",
          count: "114",
          num: "1111"
        }
      ],
      seRadio: true,
      radioID: ""
    };
  },
  methods: {
    //拍买-组合品-查看
    group_select(index, rows) {
      this.groupList = false;
      this.group_child = true;
    },
    //拍买-单选中标人
    radio_change(index, rows) {
      this.radioID = rows[index].id;
    },
    //拍卖-单品-查看
    single_select(index, rows) {
      this.singleList = false;
      this.single_child = true;
    },
    //确认中标人
    remit() {
      if (this.radioID) {
        this.seRadio = false;
      } else {
        this.$message({
          message: "请先选择",
          offset: 100,
          duration: 2000,
          type: "warning"
        });
      }
    },
    bid_select(index, rows) {
      let rowsID = rows[index].id;
      console.log(rowsID);
    },
    switchTo(index) {
      this.thisIndex = index;
    },
    price() {
      this.play = false;
    },
    goods() {
      this.play = true;
    },
    single() {
      this.play2 = false;
    },
    group() {
      this.play2 = true;
    },
    main_select() {
      this.play3 = false;
      this.main = true;
      this.lesser = false;
    },
    lesser_select() {
      this.play3 = true;
      this.lesser = true;
      this.main = false;
    },
    goods_select(index, rows) {
      this.bidList = true;
      this.result = false;
      this.bid = false;
      this.quote = false;
    },
    quote_select(index, rows) {
      this.result = true;
      this.quote = false;
      let rowID = rows[index].id;
      console.log(rowID);
    }
  }
};
</script>

<style scoped>
.center_btn2 {
  background: #1c70c5;
  width: 160px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 0;
  color: #fff;
  font-size: 18px;
}
.this {
  color: #1c70c5 !important;
}
.center_btn {
  width: 160px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 0;
  color: #fff;
  font-size: 18px;
  background: #c3ddff;
}
.helpCenter_con {
  max-width: 1200px;
  margin: auto;
  padding: 50px 0;
  display: flex;
  justify-content: space-around;
}
.helpMenu {
  width: 200px;
}
.helpMenu p:first-of-type {
  background: #1c70c5;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  padding: 10px 30px;
  letter-spacing: 3px;
}
.helpMenu_ul li {
  color: #666;
  font-size: 14px;
  line-height: 28px;
  padding: 10px 20px;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  font-weight: 600;
  background: #f1f7ff;
  border-bottom: 1px solid #fff;
}
.helpMenu .helpMenu_ul li:hover {
  color: #1c70c5;
}
.helpMenu_ul2 li {
  color: #333333;
  background: #c3ddff;
  padding: 10px 30px;
}
.helpMenu .helpMenu_ul li span {
  display: inline-block;
  font-size: 14px;
  width: 8px;
  height: 8px;
  background: #ccc;
  border-radius: 50%;
  margin: 0 10px;
}

.help_notice {
  width: 812px;
}
.notice_title {
  font-weight: 600;
  color: #666666;
  font-size: 22px;
  text-align: center;
  letter-spacing: 2px;
}
.notice_time {
  color: #666666;
  font-size: 12px;
  text-align: center;
  padding: 15px 0;
  letter-spacing: 1px;
}
.notice_f {
  color: #333333;
  font-size: 14px;
  padding: 20px 0;
  letter-spacing: 1px;
}
.notice_txt {
  color: #333333;
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 25px;
  text-indent: 30px;
}
.help_notice1{
  background-color: #333333;
  width: 200px;
  height: 100px;
}
</style>



