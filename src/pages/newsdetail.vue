<template>
  <!-- 主页 -->
  <div class="news">
    <navs></navs>
    <navigationBar></navigationBar>
    <!-- 资讯中心详情 -->
    <div class="news_con">
      <!-- 当前页面位置 -->
      <present :titles="['资讯中心','资讯详情']"></present>
      <div class="w1200">
        <!-- article文章 -->
        <div class="article">
          <ul class="article_con">
            <li class="article_title">{{contentList.title}}</li>
            <li class="article_time">发布时间：{{toDate}}</li>
            <li v-html="contentList.content"></li>
          </ul>
          <div class="article_more">
            <p>上一篇：{{prev_title}}</p>
            <p>下一篇：{{next_title}}</p>
          </div>
        </div>
        <!-- 活动 activity  -->
        <!-- <div class="activity">
          <p class="activity_label">近期活动</p>
          <div class="activity_con">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563020833140&di=46cacd8720b0ee9d9ecfb84ca9e93263&imgtype=0&src=http%3A%2F%2Fimagecdn.chengxuan.com%2Fimages%2F2008a%2F59.jpg"
              alt
            />
            <p>XXXXXXXXXXXXXXX下半年工作会议隆重举行</p>
            <p>描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字</p>
            <p>详细内容>></p>
          </div>
          <div class="activity_con">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563020833140&di=46cacd8720b0ee9d9ecfb84ca9e93263&imgtype=0&src=http%3A%2F%2Fimagecdn.chengxuan.com%2Fimages%2F2008a%2F59.jpg"
              alt
            />
            <p>XXXXXXXXXXXXXXX下半年工作会议隆重举行</p>
            <p>描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字</p>
            <p>详细内容>></p>
          </div>
        </div>-->
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
import qs from "qs";
export default {
  name: "news",
  components: {
    bottoms,
    present,
    navigationBar,
    navs
  },
  data() {
    return {
      contentList: [],
      prev_title: "",
      next_title: "",
      toDate:''
    };
  },
  created() {
    this.getDetail();
    // console.log(this.$route)
    // if(this.$route.query.pre_title){
    this.prev_title = this.$route.query.pre_title;
    // }else{
    // this.prev_title='已经是第一个了'
    // }
    // if(this.$route.query.nev_title){
    this.next_title = this.$route.query.nev_title;
    // }else{
    // this.next_title='这是最后一条资讯'
    // }
  },
  methods: {
    getDetail() {
      this.$ajax
        .post(
          this.HOST + "/articles_detail",
          qs.stringify({
            articles_id: this.$route.query.articles_id
          })
        )
        .then(res => {
          this.contentList = res.data.data;
          console.log(this.contentList);
          //时间戳转成日期
         function formatDate(now) {
            var year = now.getFullYear(); //取得4位数的年份
            var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
            var date = now.getDate(); //返回日期月份中的天数（1到31）
            var hour = now.getHours(); //返回日期中的小时数（0到23）
            var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
            var second = now.getSeconds(); //返回日期中的秒数（0到59）
            return (
              year +
              "-" +
              month +
              "-" +
              date +
              " " +
              hour +
              ":" +
              minute +
              ":" +
              second
            );
          }
          var g = this.contentList.createtime; //定义一个时间戳变量
          var d = new Date(g); //创建一个指定的日期对象
          // console.log(d);
          // console.log(formatDate(d));
          this.toDate = formatDate(d)
          // console.log(this.toDate)
        });
    },
  }
};
</script>

<style scoped>
.activity {
  display: none;
}
.w1200 {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
.news_con .article {
  width: 1200px;
  padding-top: 50px;
}
.article_title {
  color: #333;
  font-size: 22px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 2px;
}
.article_time {
  color: #666;
  text-align: center;
  font-size: 12px;
  padding: 25px 0;
  letter-spacing: 1px;
}
.article_con {
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 50px;
}
.article_con li:last-of-type p {
  letter-spacing: 2px;
  font-size: 14px;
  color: #333;
}
.article_more {
  display: flex;
  justify-content: space-between;
  padding: 25px 0;
  font-size: 14px;
  color: #666666;
  letter-spacing: 1px;
}
.activity_label {
  color: #1c70c5;
  font-weight: 600;
  padding: 10px 0;
  margin-top: 20px;
}
.activity_con {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px dashed #8d8d8d;
  padding: 20px 0;
}
.activity_con img {
  /* width: 320px; */
  height: 243px;
  border: 1px solid #999999;
}
.activity_con p:first-of-type {
  font-size: 14px;
  color: #333333;
  font-weight: 600;
  text-align: center;
  margin: 5px 0;
}
.activity_con p:nth-of-type(2) {
  width: 320px;
  font-size: 12px;
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 可以显示的行数，超出部分用...表示*/
  -webkit-box-orient: vertical;
  margin: 10px;
}
.activity_con p:last-of-type {
  color: #1c70c5;
  font-size: 12px;
  font-weight: 600;
}
.el-pagination {
  text-align: center;
  margin: 30px 0;
}
</style>



