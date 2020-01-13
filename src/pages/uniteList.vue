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
          <p>联合推荐</p>
        </div>
        <div class="competitive_list" v-if="thisIndex==0">
          <p class="list_t">
            <span>于：</span>
            <span>A类农、林、牧、渔业>农业类>谷物种植</span>
            <span>分类下，已查询到</span>
            <span>{{this.total}}条</span>
            <span>相关信息</span>
          </p>
          <ul class="list">
            <li v-for="(item,index) in contentList" :key="index" @click="to_goodsDetail(item)">
              <div :class="!item.type==true ? 'no_bid':''">
                <p>{{!item.type?'暂未开标':'进行中'}}</p>
                <p>{{item.bid}}人投标</p>
              </div>
              <div style="width:35%">
                <p>
                  <span>{{item.title}}</span>
                </p>
                <p>
                  <span style="margin-right:20px;color:#333;">编码：{{item.order}}</span>
                  {{!item.type?'距开标':'距结束'}}：{{item.time}}
                </p>
                <p>详细信息：{{item.desc}}</p>
              </div>
              <p class="list_btn">
                <el-button :style="!item.type==true ? '':'background:#1C70C5;color:#fff'">参与联合</el-button>
              </p>
            </li>
          </ul>
          <!-- 分页 -->
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
      activeName: "first",
      thisIndex: 0,
      city: 1,
      typeList: ["单品竞标", "组合品竞标"],
      contentList: [],
      page: 1,
      rows: 10,
      total: 0,
      timeGo: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`); //分页
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
    nvCity(ev) {
      console.log(ev, "页面获取城市code");
      this.city = ev;
      this.getList();
    },
    // 列表
    getList() {
      this.$ajax
        .post(
          this.HOST + "/api/index/quotelist",
          qs.stringify({
            number: this.$route.query.number,
            goodsname: this.$route.query.goodsname,
            city: this.city,
            cate_id: this.$route.query.cate_id,
            page: this.page,
            rows: this.rows
          }),
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(response => {
          console.log(this.$route.query)
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
    switchTo(index) {
      this.thisIndex = index;
    },
    to_goodsDetail(item) {
      let id = item.id;
      console.log(item.type, "type");
      if (item.type != 1) {
        this.$message({
          message: "暂未开标",
          offset: 100,
          duration: 2000,
          type: "warning"
        });
      } else {
        this.$router.push({ path: "/uniteDetail?id=" + id });
      }
    }
  }
};
</script>
<style>
.el-pagination {
  text-align: center;
  margin: 50px 0;
}
</style>

<style scoped>
.list_btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 42%;
  color: #333;
}
.el-button {
  border: 0;
  border-radius: 0;
  background: #ebebeb;
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
.w1200 {
  max-width: 1200px;
  margin: auto;
  padding: 40px 0;
}
.Competitive_t {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.Competitive_t p {
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  color: #333333;
  border-bottom: 4px solid #1c70c5;
}
.this {
  color: #fff !important;
  background: #1c70c5 !important;
  border: 1px solid #1c70c5 !important;
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
  padding-right: 15px;
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



