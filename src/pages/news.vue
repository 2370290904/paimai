<template>
  <!-- 主页 -->
  <div class="news">
    <navs></navs>
    <navigationBar></navigationBar>
    <!-- 资讯中心 -->
    <div class="news_con">
      <!--列表 list -->
      <div class="list">
        <ul
          class="news_list"
          v-for="(item,index) in articlesList"
          :key="index"
          @click="to_newsdetail(item.id,index)"
        >
          <li>{{item.title}}</li>
          <li v-html="item.content"></li>
          <li>
            <i class="el-icon-time"></i>
            <span>{{toDate[index]}}</span>
          </li>
        </ul>
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
    <!-- fenye -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="121"
    ></el-pagination>

    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>
<script>
import bottoms from "../components/bottoms";
import navs from "../components/navs";
import navigationBar from "../components/navigationBar";
import qs from "qs";
export default {
  name: "news",
  components: {
    bottoms,
    navigationBar,
    navs
  },
  data() {
    return {
      articlesList: [],
      page: 1,
      toDate: []
    };
  },
  created() {
    this.getTypearticles();
  },
  methods: {
    to_newsdetail(id, ind) {
      // if(ind>0){
      let pre = --ind;
      if (pre < 0) {
        pre = 0;
      }
      const pre_title = this.articlesList[pre].title;
      ++ind;
      let nev = ++ind;
      if (nev > this.articlesList.length) {
        nev = this.articlesList.length;
      }
      const nev_title = this.articlesList[0].title;
      this.$router.push({
        path: "/newsdetail",
        query: { articles_id: id, pre_title: pre_title, nev_title: nev_title }
      });
      console.log(this.articlesList);
    },
    getTypearticles() {
      this.$ajax
        .post(
          this.HOST + "/type_articles",
          qs.stringify({
            type: 17,
            page: this.page,
            num: 10
          })
        )
        .then(res => {
          this.articlesList = res.data.data;
          // console.log(this.articlesList);
          // 时间戳转时间
          // let num = this.articlesList.filter(item => item.createtime)
          // 使用es6语法把所有的时间戳都放在一个数组中
          this.articlesList.forEach(item => {
            this.toDate.push(item.createtime);
          });
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
          this.toDate.forEach((item, index) => {
            var g = item; //定义一个时间戳变量
            var d = new Date(g); //创建一个指定的日期对象
            this.toDate[index] = formatDate(d);//替换掉时间戳，把转换的时间存进去
          });
          // console.log(this.toDate);
        });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      // console.log(this.page);
    }
  }
};
</script>

<style scoped>
.news_con {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  /* border:1px solid red; */
}
.news_con .news_list {
  width: 1200px;
  padding: 30px 0;
  border-bottom: 1px solid #dddddd;
}
.news_list li:first-of-type {
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 20px;
  color: #333;
}
.news_list li:nth-of-type(2) {
  width: 1200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 可以显示的行数，超出部分用...表示*/
  -webkit-box-orient: vertical;
  color: #666666;
  font-size: 14px;
  line-height: 20px;
}
.news_list li:last-of-type {
  color: #666666;
  font-size: 12px;
  padding-top: 20px;
}
.el-icon-time {
  padding: 0 5px;
}
.activity {
  display: none;
}
.activity_label {
  color: #1c70c5;
  font-weight: 600;
  padding: 10px 0;
  margin-top: 50px;
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



