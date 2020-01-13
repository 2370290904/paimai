<template>
  <div class="bottom">
    <div class="bottom_con flex">
      <div class>
        <ul class="flex">
          <li>关于我们</li>
          <li>四大保障</li>
          <li>消费安全</li>
          <li>隐私政策</li>
          <li>隐私政策</li>
          <li>联系我们</li>
          <li>平台公告</li>
        </ul>
        <p class="fon12" style="margin:12px 0;">Copyright © 2019深圳市拍卖行业协会 版权所有 沪ICP备11015601-3</p>
        <p class="fon12">服务时间：09:00-23:00 客服热线: 4000-888-8888</p>
      </div>
      <div style="text-align:center;">
        <img
          class="logo2"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562994050699&di=f49f01a7e7d3d35fc45c867963bebfb2&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201601%2F22%2F20160122003337_ZxyWu.jpeg"
        />
        <p class="fon12" style="padding:10px 0;">扫码关注</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "bottoms",
  data() {
    return {};
  }
};
</script>
<style scoped>
li {
  font-size: 14px;
  list-style: none;
  padding: 0 5px;
  box-sizing: border-box;
  border-right: 1px solid #fff;
}
li:first-of-type{
    padding-left: 0;
}
.bottom {
  width: 100%;
  /* background: #393939; */
  position: fixed;
  bottom: 0;
  color: rgba(255, 255, 255, 0.8);
}
.bottom_con {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 23px 0;
}
.logo {
  width: 50px;
  height: 50px;
}
.logo2 {
  width: 50px;
  height: 50px;
}
img {
  width: 100%;
}
.bottom_last {
  background: #2d2d2d;
  text-align: center;
  font-size: 12px;
  color: #999;
  padding: 15px 0;
}
</style>




