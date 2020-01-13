<template>
  <!-- 主页 -->
  <div class="auctionCompetitive">
    <navs></navs>
    <navigationBar></navigationBar>
    <!-- 拍卖-种类选择 -->
    <div class="auctionCompetitive_con">
      <!-- 当前页面位置 -->
      <present :titles="['拍卖','竞标','分类选择','竞标信息列表']"></present>
      <div class="w1200">
        <div class="Competitive_t">
          <!-- <p
            v-for="(item,index) in typeList"
            :key="index"
            @click="switchTo(index)"
            :class="index==thisIndex?'this':''"
          >{{item}}</p> -->
          <!-- 时间筛选 -->
          <ul class="time_screen">
            <li>时间筛选：</li>
            <li>全部</li>
            <li>一天前</li>
            <li>三天前</li>
            <li>一周前</li>
            <li>半个月前</li>
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
            <span>{{contentList.length}}条</span>
            <span>相关信息</span>
          </p>
          <ul class="list" v-for="(item,index) in contentList" :key="index" @click="to_goodsDetail(item.id)">
            <li>
              <div v-if="item.num==0" class="no_bid">
                <p>{{item.state}}</p>
                <p>{{item.num}}人投标</p>
              </div>
              <div v-else>
                <p>{{item.state}}</p>
                <p>{{item.connect_count}}人投标</p>
              </div>
              <div class="list_detail">
                <p class="item_title">
                  <span>{{item.title}}</span>
                  <span>{{item.seller_number}}</span>
                </p>
                <span class="code">编码：{{item.seller_number}}</span>&nbsp;
                &nbsp;<span class="star_bidtime">开标时间：{{item.begintime}}</span>
                <p>详细信息：{{item.content}}</p>
              </div>
            </li>
          </ul>
          <!-- fenye -->
          <el-pagination background layout="prev, pager, next" :total="66" :current-page.sync="currentPage" :page-size="pageSize"></el-pagination>
        </div>

        <div class="competitive_list" v-if="thisIndex==1">
          <p class="list_t">
            <span>于：</span>
            <span>A类农、林、牧、渔业>农业类>谷物种植</span>
            <span>分类下，已查询到</span>
            <span>{{contentList.length}}条</span>
            <span>相关信息</span>
          </p>
          <ul
            class="list"
            v-for="(item,index) in contentList2"
            :key="index"
            @click="to_goodsDetailGroup"
          >
            <li>
              <div v-if="item.num==0" class="no_bid">
                <p>{{item.state}}</p>
                <p>{{item.num}}人投标</p>
              </div>
              <div v-else>
                <p>{{item.state}}</p>
                <p>{{item.num}}人投标</p>
              </div>
              <div>
                <p>
                  <span>{{item.title}}</span>
                  <span>编码：{{item.coding}}</span>
                </p>
                <p>开标时间：{{item.time}}</p>
                <p>详细信息：{{item.txt}}</p>
              </div>
            </li>
          </ul>
          <!-- fenye -->
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
import qs from 'qs'
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
      typeList: ["单品竞标", "组合品竞标"],
      total:'9',
      contentList: [],
      contentList2: [],
      arrData:[],
      area:'',
      pageNum:1,
      pageSize:5,
      isloading:false,
      currentPage:1
    };
  },
  created(){
    this.getList()
    //  console.log(localStorage.getItem("token"))
  },
  watch: {
    currentPage(oldV,newV){
      console.log(oldV,newV);
      this.exchangeCurrentPage();
    }
  },
  methods: {
    getList() {
      this.$ajax
        .post(this.HOST + "api/index/auctionlist", 
        qs.stringify({
          // token:localStorage.getItem("token"),
          is_goods_type:'',
          category_id:'',
          page:1,
          num:10
        })
        , {
          headers: { token: localStorage.getItem("token") } 
        })
        .then(response => {
          this.contentList = response.data.data;
          console.log(response)
        })
        .catch((response, error) => {this.$message.error(response);});
        },
    switchTo(index) {
      this.thisIndex = index;
    },
    to_goodsDetail(data) {
      this.$router.push({ path: "/goodsDetail",query:{id:data}});
    },
    to_goodsDetailGroup() {
      this.$router.push({ path: "/goodsDetailGroup" });
    }
  }
};
  
</script>
<style>
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
.list li div:last-of-type p:first-of-type span:first-of-type {
  color: #f83e3e;
  font-size: 20px;
}
.list li div:last-of-type p:first-of-type span:last-of-type {
  color: #333333;
  font-size: 12px;
  padding: 0 15px;
}
.list li div:last-of-type p:nth-of-type(2) {
  padding: 7px 0;
}
.list li div:last-of-type p:nth-of-type(2),
.list li div:last-of-type p:last-of-type {
  color: #999999;
  font-size: 14px;
}
.star_bidtime{
  color: #999999;
  font-size: 14px;
}
.code{
  font-size: 14px;
}
.item_title{
  padding: 0 0 8px 0
}
</style>



