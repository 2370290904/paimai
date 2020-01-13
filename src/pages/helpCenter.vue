<template>
  <!-- 主页 -->
  <div class="helpCenter">
    <navs></navs>
    <navigationBar></navigationBar>
    <!-- 帮助中心 -->
    <div class="helpCenter_con">
      <div class="helpMenu">
        <p>帮助中心</p>
        <ul class="helpMenu_ul">
          <li v-for="(item,index) in typeList" :key="index" @click="switchTo(index)">
            <span></span>{{item}}
          </li>
        </ul>
        <ul class="helpMenu_ul2">
          <li>网站说明</li>
          <li>关于线下交易的风险提示</li>
          <li>拍卖基本概念</li>
          <li>拍卖基本概念</li>
          <li>拍卖基本概念</li>
        </ul>
      </div>
      <!-- 公告 notice -->
      <div class="help_notice" v-for="(item,index) in contentList" :key="index" v-if="index==thisIndex">
        <p class="notice_title">{{item.name}}</p>
        <p class="notice_time">发布时间：{{item.time}}</p>
        <p class="notice_f">{{item.title}}</p>
        <p class="notice_txt" v-html="item.content"></p>
      </div>
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
      typeList:["拍卖流程","如何拍卖","如何入住","拍卖基本概念","关于线下交易的风险提示","拍卖基本概念","拍卖基本概念"],
      thisIndex:0,
      contentList:[{name:"阳光花园二期临时配电箱招标公告",time:"2019-05-30",titie:"",content:"您好，XX拍卖网，隶属于深圳市XXXXXXXXX有限公司，是国内专业的创意服务众包平台，于2010年7月1日上线运营。截至2018年6月拥有超1600万注册用户，聚集了很多服务商人才，成功服务众多机构、单位和个人雇主，主要提供包括企业注册、财税服务、创意设计、工业设计、网站软件开发、文案策划、装修设计、商标注册等在内的创意服务。XX拍卖网，隶属于深圳市XXXXXXXXX有限公司，是国内专业的创意服务众包平台，于2010年7月1日上线运营。截至2018年6月"},      
      {name:"阳光花园二期临时配电箱招标公告2",time:"2019-05-30",titie:"",content:"您好，XX拍卖网，隶属于深圳市XXXXXXXXX有限公司，是国内专业的创意服务众包平台，于2010年7月1日上线运营。截至2018年6月拥有超1600万注册用户，聚集了很多服务商人才，成功服务众多机构、单位和个人雇主，主要提供包括企业注册、财税服务、创意设计、工业设计、网站软件开发、文案策划、装修设计、商标注册等在内的创意服务。XX拍卖网，隶属于深圳市XXXXXXXXX有限公司，是国内专业的创意服务众包平台，于2010年7月1日上线运营。截至2018年6月"},      
      {name:"阳光花园二期临时配电箱招标公告3",time:"2019-05-30",titie:"",content:"您好，XX拍卖网，隶属于深圳市XXXXXXXXX有限公司，是国内专业的创意服务众包平台，于2010年7月1日上线运营。截至2018年6月拥有超1600万注册用户，聚集了很多服务商人才，成功服务众多机构、单位和个人雇主，主要提供包括企业注册、财税服务、创意设计、工业设计、网站软件开发、文案策划、装修设计、商标注册等在内的创意服务。XX拍卖网，隶属于深圳市XXXXXXXXX有限公司，是国内专业的创意服务众包平台，于2010年7月1日上线运营。截至2018年6月"},      
      {name:"阳光花园二期临时配电箱招标公告44444",time:"2019-05-30",titie:"",content:"您好，XX拍卖网，隶属于深圳市XXXXXXXXX有限公司，是国内专业的创意服务众包平台，于2010年7月1日上线运营。截至2018年6月拥有超1600万注册用户，聚集了很多服务商人才，成功服务众多机构、单位和个人雇主，主要提供包括企业注册、财税服务、创意设计、工业设计、网站软件开发、文案策划、装修设计、商标注册等在内的创意服务。XX拍卖网，隶属于深圳市XXXXXXXXX有限公司，是国内专业的创意服务众包平台，于2010年7月1日上线运营。截至2018年6月"},      
      ]
    };
  },
  methods:{
    switchTo(index){
      this.thisIndex = index
    }
  }
};
</script>

<style scoped>
.helpCenter_con {
  max-width: 1200px;
  margin: auto;
  padding: 50px 0;
  display: flex;
  justify-content: space-between;
}
.helpMenu {
  width: 320px;
}
.helpMenu p:first-of-type {
  background: #9CBEDB;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  padding: 15px 10px;
  letter-spacing: 3px;
}
.helpMenu_ul li {
  color: #333333;
  font-size: 14px;
  line-height: 28px;
  padding: 10px 0px;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  font-weight: 600;
}
.helpMenu .helpMenu_ul li:hover{
  color: #DB422A;
}
.helpMenu .helpMenu_ul li span {
  display: inline-block;
  font-size: 14px;
  width: 8px;
  height: 8px;
  background: rgba(219, 66, 42, 1);
  border-radius: 50%;
  margin: 0 10px;
}
.helpMenu_ul2{
  background: #F6F6F6;
  padding:20px 10px;
}
.helpMenu_ul2 li:first-of-type{
  color: #3A3A3A;
  font-size: 18px;
  font-weight: 600;
}
.helpMenu_ul2 li{
 padding: 10px 0px;
 letter-spacing: 2px;
 font-size: 14px;
  font-weight: 600;
  color: #3A3A3A;
}
.help_notice{
  width: 794px;
}
.notice_title{
  font-weight: 600;
  color: #666666;
  font-size: 22px;
  text-align: center;
  letter-spacing: 2px;
}
.notice_time{
  color: #666666;
  font-size: 12px;
  text-align: center;
  padding: 15px 0;
  letter-spacing: 1px;
}
.notice_f{
  color: #333333;
  font-size: 14px;
  padding:20px 0; 
  letter-spacing: 1px;
}
.notice_txt{
  color: #333333;
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 25px;
  text-indent: 30px;
}
</style>



